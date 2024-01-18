import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node.js';
import { Rectangle } from '../engine/maths/Rectangle.js';

export class Platform extends Node {
    constructor(name, position, dimension, layer = 0) {
        super(name);

        this._graphic = ServiceLocator.graphicManager.create("rectangle", this, layer);
        this._collider = ServiceLocator.componentManager.create("RectangleCollider", this);
        ServiceLocator.componentManager.addCollider(this._collider);

        this._graphic.rectangle = new Rectangle(position, dimension);
        this._graphic.fill = "red";
        this._graphic.stroke = "transparent";
        this._collider.hitbox = new Rectangle(position, dimension);

        this._defaultOnCollide = this._collider.onCollide;
        this._collider.onCollide = this.onCollide;
    }
    
    set color(value) {
        this._graphic.fill = value;
    }

    onCollide = (collider) => {
        this._defaultOnCollide(collider);
    }
}
