import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Collider } from './Collider.js';
import { Rectangle } from '../engine/maths/Rectangle.js';
import { Vector } from '../engine/maths/Vector.js';
import { Water } from '../objects/Water';

export class MopComponent extends RectangleCollider {
    constructor(node, enabled = true) {
        super(node, enabled);
    }

    onCollide(collider) {
        super.onCollide(collider)
        if (collider.node instanceof Water)
            let drop = collider.node;
            drop.map.remove(drop.coords.x, drop.coords.x);
        }
    }
}
