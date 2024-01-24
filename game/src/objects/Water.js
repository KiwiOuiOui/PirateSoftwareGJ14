import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node';
import { Rectangle } from '../engine/maths/Rectangle';
import { Vector } from '../engine/maths/Vector';

const dropletSize = 4;
const border = new Vector(10,10);

class WaterDamageMap extends Map {
    constructor() {
        super();
        for (let i = 0; i < 240/dropletSize; i++) {
            this.set(i, new Map());
        }
        this.count = 0;
    }

    get(x, y = null) {
        if(null == y)
            return super.get(x);
        else 
            return super.get(x)?.get(y);
    }
    set(x, y, v = null) {
        if(null == v)
            super.set(x, y);
        else 
            super.get(x).set(y, v);
    }
    add(x, y, v) {
        v.coords = {x:x, y:y};
        v.map = this;
        this.set(x, y, v);
        this.count++;
    }
    remove(x, y) {
        let node = this.get(x, y);
        if(node == node.parent.dropletSrc) {
            node.parent.dropletSrc = undefined;
        }
        this.set(x, y, undefined);
        this.count--;
    }
    postocoord(v) {
        return v.multiply(1/dropletSize);
    }
    coordtopost(v) {
        return v.multiply(dropletSize);
    }
}

class WaterDrop extends Node {
    constructor(name, position, layer = -10) {
        super(name, position);

        this.x = null;
        this.y = null;

        this.up = null;
        this.left = null;
        this.right = null;
        this.down = null;

        this.prio = null;

        //ServiceLocator.error("WaterSystem create WaterDroplet... ", this)

        // this._collider = ServiceLocator.componentManager.create("RectangleCollider", this);
        // ServiceLocator.componentManager.addCollider(this._collider);
        // this._collider.hitbox = new Rectangle(new Vector(0,0), new Vector(dropletSize, dropletSize));

        this._graphic = ServiceLocator.graphicManager.create("rectangle", this, layer);
        
        this._graphic.rectangle = new Rectangle(
            new Vector(0,0),
            new Vector(dropletSize,dropletSize)
        );
        this._graphic.fill = "blue";
        this._graphic.stroke = "transparent";
    }
    onUpdate() {
    }
}

export class WaterDamage extends Node {
    constructor(name, position, layer = -10) {
        super(name, position);

        this.source = null;
        this.imgSrc = null;
        this.imgData = null;
        this.dimension = new Rectangle(new Vector(0,0),new Vector(0,0));
        this.map = new WaterDamageMap();
        this.heatMap = new WaterDamageMap();
        this.spreadTimer = false;
    }
    
    parseData(data){
        //console.error("parsing ", data)

        data.forEach(e => {
            let drop = new WaterDrop("drop", new Vector(e.x*dropletSize, e.y*dropletSize), this.layer)
            drop.x = e.x;
            drop.y = e.y;
            this.dimension.width = Math.max(this.dimension.width, e.x+1);
            this.dimension.height = Math.max(this.dimension.height, e.y+1);
            drop.prio = e.prio;
            drop._graphic.fill = "white";//"rgb("+drop.prio+" "+drop.prio+" "+drop.prio+")";
            if(e.source) {
                this.source = drop;
                //console.error("source", drop);
                drop.enable();
            }
            else {
                drop.disable();
            }
            this.addChild(drop);
            //console.error("setting drop in map ["+drop.x+"]["+drop.y+"]",drop, e)
            this.map.set(drop.x,drop.y,drop);
        });
        //console.error(this.dimension);
        this.setNeighbours();
        this.resetHeatMap();
    }

    setNeighbours() {
        console.log("setNeighbours map",this.map)

        for (let x = 0; x < this.dimension.width; x++) {
            for (let y = 0; y < this.dimension.height; y++) {
                let drop = this.map.get(x,y);

                if(0 < x)
                    drop.left = this.map.get(x-1,y);
                if(0 < y)
                    drop.up = this.map.get(x,y-1);
                if(this.dimension.width > x)
                    drop.right = this.map.get(x+1,y);
                if(this.dimension.height > y)
                    drop.down = this.map.get(x,y+1);
            }                
        }
    }

    resetHeatMap() {
        for (let x = 0; x < this.dimension.width; x++)
            for (let y = 0; y < this.dimension.height; y++)
                this.heatMap.set(x,y,-1);
    }

    calculatePrio(drop) {
        let prioRet = -1; // unrealistic value so it will always be overwritten
        this.heatMap.set(drop.x, drop.y, 1);
        ServiceLocator.error("calculatePrio of ", drop.x, drop.y, drop, this.heatMap);
        
        if(drop.left && -1 == this.heatMap.get(drop.left.x, drop.left.y))
        {
            if(drop.left.enabled)
            {
                ServiceLocator.error("calculatePrio of left", drop.x, drop.y);
                prioRet = Math.max(prioRet, this.calculatePrio(drop.left));
            }
            else
            {
                prioRet = Math.max(prioRet, drop.left.prio)
                ServiceLocator.error("register left in heatmap", drop.x, drop.y);
                this.heatMap.set(drop.x-1, drop.y, drop.left.prio);
            }
        }
        if(drop.right && -1 == this.heatMap.get(drop.right.x, drop.right.y))
        {
            if(drop.right.enabled)
            {
                ServiceLocator.error("calculatePrio of right", drop.x, drop.y);
                prioRet = Math.max(prioRet, this.calculatePrio(drop.right));
            }
            else
            {
                prioRet = Math.max(prioRet, drop.right.prio)
                ServiceLocator.error("register right in heatmap", drop.x, drop.y);
                this.heatMap.set(drop.x+1, drop.y, drop.right.prio);
            }
        }
        if(drop.up && -1 == this.heatMap.get(drop.up.x, drop.up.y))
        {
            if(drop.up.enabled)
            {
                ServiceLocator.error("calculatePrio of up", drop.x, drop.y);
                prioRet = Math.max(prioRet, this.calculatePrio(drop.up));
            }
            else
            {
                prioRet = Math.max(prioRet, drop.up.prio)
                ServiceLocator.error("register up in heatmap", drop.x, drop.y);
                this.heatMap.set(drop.x, drop.y-1, drop.up.prio);
            }
        }
        if(drop.down && -1 == this.heatMap.get(drop.down.x, drop.down.y))
        {
            if(drop.down.enabled)
            {
                ServiceLocator.error("calculatePrio of down", drop.x, drop.y);
                prioRet = Math.max(prioRet, this.calculatePrio(drop.down));
            }
            else
            {
                prioRet = Math.max(prioRet, drop.down.prio)
                ServiceLocator.error("register down in heatmap", drop.x, drop.y);
                this.heatMap.set(drop.x, drop.y+1, drop.down.prio);
            }
        }
        return prioRet;
    }

    spread(){
        
        let spreadPotential = [];

        let actualPrio = this.calculatePrio(this.source);
        for (let x = 0; x < this.dimension.width; x++)
        {
            for (let y = 0; y < this.dimension.height; y++)
            {
                let tmp = this.heatMap.get(x,y);

                if(tmp == actualPrio){
                    spreadPotential.push({x:x,y:y});
                }
            }
        }

        let a = Math.floor(Math.random()*spreadPotential.length);
        let dropToSpread = spreadPotential[a];
        ServiceLocator.error("spreadPotential", spreadPotential, actualPrio);
        //ServiceLocator.error("calculatePrio spread to", dropToSpread.x, dropToSpread.y);

        this.map.get(dropToSpread.x, dropToSpread.y).enable();
        this.resetHeatMap();
        //ServiceLocator.error("\n");
    }

    onUpdate() {
        if(false == this.spreadTimer) {
            this.spreadTimer = ServiceLocator.clockManager.addTimer(100).action = () => {
                this.spread()
                this.spreadTimer = false;
            };
        }
    }
}
