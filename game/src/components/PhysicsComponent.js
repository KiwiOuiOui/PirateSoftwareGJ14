import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Velocity } from './VelocityComponent.js';
import { Vector } from '../engine/maths/Vector.js';

export class PhysicsComponent extends Velocity {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._forces = new Vector(0, 0);
    }


    addForce(force) {
        this._forces = this._forces.add(force);
    }

    get forces() {
        return this._forces;
    }

    update() {
        //ServiceLocator.debug(this.node.name, " forces aplied : ", this._forces.multiply(ServiceLocator.clockManager.dtime));
        this.velocity = this.velocity.add(this._forces.multiply(ServiceLocator.clockManager.dtime));
        this._forces = new Vector(0, 0);
        super.update();
    }

}
