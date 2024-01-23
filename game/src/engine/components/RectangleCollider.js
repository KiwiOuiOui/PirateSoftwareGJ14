import { ServiceLocator } from '../ServiceLocator.js';
import { Collider } from './Collider.js';
import { Rectangle } from '../maths/Rectangle.js';
import { Vector } from '../maths/Vector.js';

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
