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
class WaterDamage extends Node {
    constructor(name, position, layer = -10) {
        this.source = null;
        this.imgSrc = null;
        this.imgData = null;
        this.frame = null;
        this.map = new WaterDamageMap();
    }
    
    parseImage(src, frame){
        let img = new Image(); 
        this.imgSrc = img.src = src;

        let canvas = document.createElement('canvas');
        canvas.width = frame.dimension.x;
        canvas.height = frame.dimension.y;

        // var body = document.getElementsByTagName("body")[0];
        // body.appendChild(canvas);

        let ctx = canvas.getContext("2d");
        this.frame = frame;
        ctx.drawImage(img, frame.position.x, frame.position.y, frame.dimension.x, frame.dimension.y);
        this.imgData = ctx.getImageData(0,0,frame.dimension.x, frame.dimension.y).data;

        this.source = new Vector(0,0);

        for (let x = 0; x < frame.dimension.x; x++) {
            for (let y = 0; y < frame.dimension.y; y++) {
                let coord = x*frame.dimension.x + frame.dimension.y;
                let drop = new WaterDrop("drop", new Vector(x*dropletSize, y*dropletSize), this.layer)
                if(null == this.source &&
                    255 == this.imgData[coord*4] &&
                    0 == this.imgData[coord*4 +1] &&
                    0 == this.imgData[coord*4 +2])
                {
                    this.source = drop;
                }
                drop.x = x;
                drop.y = y;
                drop.prio = Math.min(this.imgData[coord*4], this.imgData[coord*4+3]);
            }                
        }

        this.setNeighbours();
    }

    setNeighbours() {
        for (let x = 0; x < frame.dimension.x; x++) {
            for (let y = 0; y < frame.dimension.y; y++) {
                let drop = this.map.get(x,y);
                if(0 < x)
                    drop.up = this.map.get(x-1,y);
                if(0 < y)
                    drop.left = this.map.get(x,y-1);
                if(frame.dimension.x > x)
                    drop.down = this.map.get(x+1,y);
                if(frame.dimension.y > y)
                    drop.right = this.map.get(x,y+1);
            }                
        }
    }

    calculatePrio(drop) {
        let prioRet = drop.prio;
        if(this.left)
            prioRet = Math.min(prioRet, this.left.prio)
        if(this.right)
            prioRet = Math.min(prioRet, this.right.prio)
        if(this.up)
            prioRet = Math.min(prioRet, this.up.prio)
        if(this.down)
            prioRet = Math.min(prioRet, this.down.prio)
        return prioRet;
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

        ServiceLocator.error("WaterSystem create WaterDroplet... ", this)

        this._collider = ServiceLocator.componentManager.create("RectangleCollider", this);
        ServiceLocator.componentManager.addCollider(this._collider);
        this._collider.hitbox = new Rectangle(new Vector(0,0), new Vector(dropletSize, dropletSize));

        this._graphic = ServiceLocator.graphicManager.create("rectangle", this, layer);
        
        this._graphic.rectangle = new Rectangle(
            new Vector(0,0),
            new Vector(dropletSize,dropletSize)
        );
        this._graphic.fill = "red";
        this._graphic.stroke = "transparent";    

    }
}

export class Water extends Node {
    constructor(name, position, layer = -10) {
        ServiceLocator.error("vectoradgf Water source create", position)

        //remove border :
        position = position.substract(border)
        position.x = Math.min(Math.max(Math.floor(position.x/dropletSize)*dropletSize, 10), 240);
        position.y = Math.min(Math.max(Math.floor(position.y/dropletSize)*dropletSize, 10), 160);

        super(name, border);

        this._pressure = 20;//20
        this._pressureSpeed = 30;//3
        this._CD = 1/10;
        this._onCD = false;

        this._waterMap = new WaterMap();

        this.dropletSrc = new WaterDroplet("waterDroplet", position, true, layer);
        this.addChild(this.dropletSrc);

        let coord = this._waterMap.postocoord(position);
        this._waterMap.add(coord.x,coord.y, this.dropletSrc);
        ServiceLocator.error("vectoradgf Water source coord",coord)
        this._graphic = ServiceLocator.graphicManager.create("rectangle", this, layer+1);
        
        this._graphic.rectangle = new Rectangle(
            new Vector(0, 0),
            new Vector(dropletSize,dropletSize)
        );
        this._graphic.fill = "white";
        this._graphic.stroke = "transparent";
    }

    spread(luck) {
        this._onCD = true;
        ServiceLocator.clockManager.addTimer(this._CD*1000).action = () => {
            this._onCD = false;
        };
        if(Math.random() < luck){
            let coord = new Vector(
                this.dropletSrc.position.x/dropletSize,
                this.dropletSrc.position.y/dropletSize
            );
            //console.error("spread from", x,y);
            while(undefined != this._waterMap.get(coord.x,coord.y)) {
                    let a = Math.floor(Math.random() * 4);
                    switch (a) {
                        case 0:
                            ++coord.x
                            break;
                    
                        case 1:
                            --coord.x
                            break;
                    
                        case 2:
                            ++coord.y
                            break;
                    
                        case 3:
                            --coord.y
                            break;
                    
                        default:
                            break;
                    }
            }
            
            if(undefined == this._waterMap.get(coord.x) ||
                coord.y*dropletSize < 0 ||
                coord.y*dropletSize >= 160)
            {
                return false;
            }
            ServiceLocator.error("vectoradgf Water drop coord",coord, coord.multiply(dropletSize))

            //new Vector(
                // (x-this.dropletSrc._x)*this._dropletSize,
                // (y-this.dropletSrc._y)*this._dropletSize);

            let drop = new WaterDroplet("waterDroplet", coord.multiply(dropletSize), false, this._graphic.layer);
            this.addChild(drop);
            this._waterMap.add(coord.x, coord.y, drop);

            return true;
        }
        return false;
    }

    onUpdate = () => {
        if(undefined == this.dropletSrc)
        {
            return;
        }
        this._pressure += ServiceLocator.clockManager.dtime * this._pressureSpeed;
        if(false == this._onCD){
            let luck = this._pressure / this._waterMap.count;
            while (luck > 1) {
                ServiceLocator.error("vectoradgf Water check pressure",this._pressure, this._waterMap.count)

                this.spread(luck);
                luck = this._pressure / this._waterMap.count;
            }
        }
    }
}
