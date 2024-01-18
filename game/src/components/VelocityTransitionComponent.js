import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Velocity } from './VelocityComponent.js';
import { Vector } from '../engine/maths/Vector.js';
import { Player } from '../objects/Player.js';

export class VelocityTransition extends Velocity {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._desiredVelocity = new Vector(0, 0);
        this._transitionSpeed = 3;
    }


    set desiredVelocity(v) {
        this._desiredVelocity = v;
    }

    get desiredVelocity() {
        return this._desiredVelocity;
    }

    set transitionSpeed(ts) {
        this._transitionSpeed = ts;
    }

    get transitionSpeed() {
        return this._transitionSpeed;
    }

    update() {

        let delta = this.node.scene.clock.multiplier * ServiceLocator.clockManager.dtime;
        this.velocity = this.velocity.multiply(1 - delta * this._transitionSpeed).add(this._desiredVelocity.multiply(delta * this._transitionSpeed));

        ServiceLocator.debug("[" + this.node.name + "] in vel comp - desired :", this._desiredVelocity);

        super.update();
    }

}
