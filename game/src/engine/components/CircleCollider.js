import { ServiceLocator } from '../ServiceLocator.js';
import { Collider } from './Collider.js';
import { Circle } from '../maths/Circle.js';
import { Vector } from '../maths/Vector.js';

export class CircleCollider extends Collider {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._hitbox = new Circle(new Vector(), 1);
        this._type = "circle"
    }

    set hitbox(circle) {
        this._hitbox = circle;
    }

    get hitbox() {
        return this._hitbox;
    }

    move(vector) {
        this._hitbox = this._hitbox.move(vector);
    }
}
