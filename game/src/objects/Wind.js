import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node.js';
import { Rectangle } from '../engine/maths/Rectangle.js';
import { Vector } from '../engine/maths/Vector.js';

export class Wind extends Node {
    constructor(name, position, dimension, layer = 0) {
        super(name);

        this._graphic = ServiceLocator.graphicManager.create("rectangle", this, layer);
        this._force = ServiceLocator.componentManager.create("ForceComponent", this);
        ServiceLocator.componentManager.addCollider(this._force);

        this._graphic.rectangle = new Rectangle(position, dimension);
        this._graphic.fill = "black";
        this._graphic.stroke = "transparent";
        this._force.hitbox = new Rectangle(position, dimension);

        let defaultOnCollide = this._force.onCollide;

        this._force.onCollide = (collider) => {
            defaultOnCollide();
        };
        this._force.force = new Vector(-500,0);
    }

    move(vector) {

    }

    set color(value) {
        this._graphic.fill = value;
    }
}
