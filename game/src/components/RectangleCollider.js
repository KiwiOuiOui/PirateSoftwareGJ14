import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Collider } from '../engine/Collider.js';
import { Rectangle } from '../engine/maths/Rectangle.js';
import { Vector } from '../engine/maths/Vector.js';

export class RectangleCollider extends Collider {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._hitbox = new Rectangle(new Vector(), new Vector());
        this._type = "rectangle"
    }

    set hitbox(rectangle) {
        this._hitbox = rectangle;
    }
    
    get hitbox() {
        return this._hitbox;
    }

    move(vector) {
        this._hitbox = this._hitbox.move(vector);
    }

    onCollide(collider) {
        super.onCollide(collider)
    }
}
