import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Rectangle } from '../engine/maths/Rectangle.js';
import { Vector } from '../engine/maths/Vector';
import { Node } from '../engine/Node';
import { Circle } from '../engine/maths/Circle';
import { WaterDrop } from './Water';

export class Mop extends Node {
    constructor(name, position, layer = 0) {
        super(name, position);

        this.stock = 0;
        this.stockMax = 20;
        this._graphic = ServiceLocator.graphicManager.create("circle", this, layer);
        this._collider = ServiceLocator.componentManager.create("CircleCollider", this);
        ServiceLocator.componentManager.addCollider(this._collider);

        this._graphic._circle = new Circle(new Vector(0, 8), 10);
        this._graphic.fill = "yellow";
        this._graphic.stroke = "transparent";
        this._collider.hitbox = this._graphic._circle

        this._defaultOnCollide = this._collider.onCollide;
        this._collider.onCollide = this.onCollide;
    }

    set color(value) {
        this._graphic.fill = value;
    }
    calculateSprite() {
        if(0 == this.stock)
            this.scene.bucketSprite.frame = new Rectangle(new Vector(60, 0),new Vector(31, 31));
        else if(this.stockMax/2 >= this.stock)
            this.scene.bucketSprite.frame = new Rectangle(new Vector(60, 36),new Vector(31, 31));
        else if(this.stockMax > this.stock)
            this.scene.bucketSprite.frame = new Rectangle(new Vector(60, 72),new Vector(31, 31));
        else
            this.scene.bucketSprite.frame = new Rectangle(new Vector(60, 108),new Vector(31, 31));
    }
    
    onCollide = (collider) => {
        this._defaultOnCollide(collider);

        if (collider.node instanceof WaterDrop) {
            if(this.stockMax > this.stock)
            {
                let drop = collider.node;
                drop.parent.map.remove(drop.x, drop.y);
                this.stock++;
                this.calculateSprite();
            }
        }
    }
}
