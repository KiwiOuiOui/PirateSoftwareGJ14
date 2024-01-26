import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node';
import { Rectangle } from '../engine/maths/Rectangle';
import { Vector } from '../engine/maths/Vector';

export const dropletSize = 4;
const border = new Vector(10,10);

class WaterDamageMap extends Map {
    constructor() {
        super();
        for (let i = 0; i < 240/dropletSize; i++) {
            this.set(i, new Map());
        }
    }

    get(x, y = null) {
        let row = super.get(x);

        if(null == y)
            return row;
        else if(undefined != row) {
            return super.get(x).get(y);
        }
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
    }
    remove(x, y) {
        let node = this.get(x, y);
        if(node == node.parent.source) {
            node.parent.source.disable();
        }
        node.disable();
    }
    postocoord(v) {
        return v.multiply(1/dropletSize);
    }
    coordtopost(v) {
        return v.multiply(dropletSize);
    }
}

export class WaterDrop extends Node {
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

        this._collider = ServiceLocator.componentManager.create("RectangleCollider", this);
        ServiceLocator.componentManager.addCollider(this._collider);
        this._collider.hitbox = new Rectangle(new Vector(0,0), new Vector(dropletSize, dropletSize));

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
        this.layer = layer;
        this.source = null;
        this.imgSrc = null;
        this.imgData = null;
        this.dimension = new Rectangle(new Vector(0,0),new Vector(0,0));
        this.map = new WaterDamageMap();
        this.heatMap = new WaterDamageMap();
        this.spreadCD = false;
    }
    
    parseData(data){
        if(null == this._scene) {
            ServiceLocator.error("WaterDamage to be added to scene before parsing");
            return;
        }

        data.forEach(e => {
            let drop = new WaterDrop("drop", new Vector(e.x*dropletSize, e.y*dropletSize), this.layer)
            drop.x = e.x;
            drop.y = e.y;
            this.dimension.width = Math.max(this.dimension.width, e.x+1);
            this.dimension.height = Math.max(this.dimension.height, e.y+1);
            drop.prio = e.prio;
            drop._graphic.fill = "rgb("+drop.prio+" "+drop.prio+" "+255+")";
            if(e.source) {
                this.source = drop;
                drop.enable();
            }
            else {
                drop.disable();
            }
            this.addChild(drop);
            this.map.set(drop.x,drop.y,drop);
        });
        this.setNeighbours();
        this.resetHeatMap();
    }

    setNeighbours() {
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
        
        if(drop.left && -1 == this.heatMap.get(drop.left.x, drop.left.y))
        {
            if(drop.left.enabled)
            {
                prioRet = Math.max(prioRet, this.calculatePrio(drop.left));
            }
            else
            {
                prioRet = Math.max(prioRet, drop.left.prio)
                this.heatMap.set(drop.x-1, drop.y, drop.left.prio);
            }
        }
        if(drop.right && -1 == this.heatMap.get(drop.right.x, drop.right.y))
        {
            if(drop.right.enabled)
            {
                prioRet = Math.max(prioRet, this.calculatePrio(drop.right));
            }
            else
            {
                prioRet = Math.max(prioRet, drop.right.prio)
                this.heatMap.set(drop.x+1, drop.y, drop.right.prio);
            }
        }
        if(drop.up && -1 == this.heatMap.get(drop.up.x, drop.up.y))
        {
            if(drop.up.enabled)
            {
                prioRet = Math.max(prioRet, this.calculatePrio(drop.up));
            }
            else
            {
                prioRet = Math.max(prioRet, drop.up.prio)
                this.heatMap.set(drop.x, drop.y-1, drop.up.prio);
            }
        }
        if(drop.down && -1 == this.heatMap.get(drop.down.x, drop.down.y))
        {
            if(drop.down.enabled)
            {
                prioRet = Math.max(prioRet, this.calculatePrio(drop.down));
            }
            else
            {
                prioRet = Math.max(prioRet, drop.down.prio)
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

                if(tmp >= actualPrio){
                    spreadPotential.push({x:x,y:y});
                }
            }
        }

        let a = Math.floor(Math.random()*spreadPotential.length);
        let dropToSpread = spreadPotential[a];

        this.map.get(dropToSpread.x, dropToSpread.y).enable();
        this.resetHeatMap();
    }

    onUpdate() {
        if(false == this.spreadCD && this.source.enabled) {
            this.spreadCD = ServiceLocator.clockManager.addTimer(200).action = () => {
                this.spread()
                this.spreadCD = false;
            };
        }
    }
}
