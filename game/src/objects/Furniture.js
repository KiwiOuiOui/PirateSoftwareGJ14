import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Rectangle } from '../engine/maths/Rectangle.js';
import { Vector } from '../engine/maths/Vector';
import { Platform } from './Platform';
import { SolidObject } from './SolidObject';
import { WaterDrop, dropletSize } from './Water';

export class Furniture extends SolidObject {
    constructor(name, position, rectCollider, baseValue, layer = 0) {
        super(name, position);

        this.baseValue = baseValue;
        this.drops = [];
        
        this._collider = ServiceLocator.componentManager.create("RectangleCollider", this);
        ServiceLocator.componentManager.addCollider(this._collider);

        this._graphic = ServiceLocator.graphicManager.create("animSprite", this, layer);
        
        // this._graphicCol = ServiceLocator.graphicManager.create("rectangle", this, layer);

        // this._graphicCol.rectangle = rectCollider;
        // this._graphicCol.fill = "red";
        // this._graphicCol.stroke = "transparent";

        this._collider.hitbox = rectCollider;

        this._defaultOnCollide = this._collider.onCollide;
        this._collider.onCollide = this.onCollide;
    }

    get maxHP() {
        return this._collider.hitbox.width*this._collider.hitbox.height/(dropletSize*dropletSize)/1.2;
    }


    get value() {
        if(this.damage == 0) {
            return this.baseValue;
        }
        if(this.damage < this.maxHP/2) {
            return this.baseValue*2/3;
        }
        if(this.damage < this.maxHP) {
            return this.baseValue/3;
        }        
        return 0;
    }

    get damage() {
        return this.drops.length;
    }

    onCollide = (collider) => {
        this._defaultOnCollide(collider);

        if (collider.node instanceof WaterDrop) {
            let drop = collider.node;
            let i = this.drops.indexOf(drop);

            if (i < 0)
            {
                let lastValue = this.value;
                this.drops.push(drop);
                console.log(this.name + " hps are " + this.damage + "/" + this.maxHP)
                console.log(this.name + " value is " + this.value + "USD")
                if(this.damage > this.maxHP) {
                    console.error("Furniture dies");
                }
                ServiceLocator.game.gameValues.damageTaken += (lastValue - this.value)*100;
                console.log(ServiceLocator.game.gameValues.damageTaken, this.value-lastValue);
            }
    
            if(this.stockMax > this.stock)
            {
                let drop = collider.node;
                drop.parent.map.remove(drop.x, drop.y);
                this.stock++;    
            }
        }
    }

    onUpdate() {
        this._graphic.checkNextFrameOrNotAndProceed()
    }
}
