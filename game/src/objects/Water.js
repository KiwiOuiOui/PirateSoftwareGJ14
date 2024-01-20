import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node';
import { Rectangle } from '../engine/maths/Rectangle';
import { Vector } from '../engine/maths/Vector';

class WaterDroplet {
    constructor(x, y, source = null) {
        this._x = x;
        this._y = y;
        this._source = source;
    }
}

class WaterMap extends Map {
    constructor(dimX) {
        super();
        this._source = null;

        for (let i = 0; i < dimX; i++) {
            this.set(i, new Map());
        }
    }
    setSource(s) {
        this._source = s;
    }
    get(x, y = null) {
        if(null == y)
            return super.get(x);
        else 
            return super.get(x).get(y);
    }
    set(x, y, v) {
        if(null == v)
        return super.set(x, y);
    else 
        return super.get(x).set(y, v);

    }
}

export class Water extends Node {
    constructor(name, position, layer = -10) {
        super(name, position);

        this._pressure = 20;
        this._pressureSpeed = 10;
        this._dropletSize = 4;
        this._CD = 1/10;
        this._onCD = false;

        this._waterMap = new WaterMap(240/this._dropletSize);

        let x = Math.floor((position.x-10)/this._dropletSize);
        let y = Math.floor((position.y-10)/this._dropletSize);

        this.dropletSrc = new WaterDroplet(x,y);
        this.dropletSrc._source = this.dropletSrc;
        this._waterMap.set(x,y, this.dropletSrc);

        this.position = new Vector(x * this._dropletSize, y * this._dropletSize);

        this._graphic = ServiceLocator.graphicManager.create("rectangle", this, layer);
        
        this._graphic.rectangle = new Rectangle(
            new Vector(10, 10),
            new Vector(this._dropletSize,this._dropletSize)
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
            let x = this.dropletSrc._x;
            let y = this.dropletSrc._y;
            while(undefined != this._waterMap.get(x) &&
                undefined != this._waterMap.get(x).get(y)) {
                    let a = Math.floor(Math.random() * 4);
                    switch (a) {
                        case 0:
                            ++x
                            break;
                    
                        case 1:
                            --x
                            break;
                    
                        case 2:
                            ++y
                            break;
                    
                        case 3:
                            --y
                            break;
                    
                        default:
                            break;
                    }
            }

            if(x < 0 || y < 0 || x >= 240/this._dropletSize || y >= 160/this._dropletSize )
                return false;
            
                ServiceLocator.error("yeha spread pos", x, y, Math.round(luck*1000)/10+"%", this._pressure);
            //if(undefined == this._waterMap.get(x))
            let drop = new WaterDroplet(x,y);
            drop._source = this.dropletSrc;
            this._waterMap.get(x).set(y, drop);
            let dropletGraphic = ServiceLocator.graphicManager.create("rectangle", this, this._graphic.layer);
        
            dropletGraphic.rectangle = new Rectangle(
                new Vector((x-this.dropletSrc._x)*this._dropletSize +10, (y-this.dropletSrc._y)*this._dropletSize +10),
                new Vector(this._dropletSize,this._dropletSize)
            );
            dropletGraphic.fill = "white";
            dropletGraphic.stroke = "transparent";    
            return true;
        }
        return false;
    }

    onUpdate = () => {
        this._pressure += ServiceLocator.clockManager.dtime * this._pressureSpeed;
        let count = 0;
        for (let k1 of this._waterMap.keys()) {
            for (let k2 of this._waterMap.get(k1).keys()) {
                if (undefined != this._waterMap.get(k1).get(k2)) {
                    count++;
                }
            }
        }
        if(false == this._onCD){
            while (this._pressure > count) {
                if(this.spread(this._pressure / count))
                    count++;
            }
        }
    }
}
