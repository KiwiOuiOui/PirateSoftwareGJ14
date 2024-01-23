import { Vector } from '../engine/maths/Vector.js';
import { Collider } from '../engine/components/Collider';

export class ForceComponent extends Collider {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._force = new Vector();
    }


    set force(force) {
        this._force = force;
    }


    get force() {
        return this._force;
    }
}
