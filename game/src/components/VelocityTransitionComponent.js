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
        let a = 1 - delta * this._transitionSpeed;
        if(a < 1)
            a = 0;
        this.velocity = this.velocity.multiply(1 - delta * this._transitionSpeed);

        if(0 == a && (0 == this._desiredVelocity.x && 0 == this._desiredVelocity.y))
        {
            if(this.velocity.magnitude < 0.01) {
                this.velocity = new Vector(0, 0);
                ServiceLocator.debug("[" + this.node.name + "] in vel comp - at rest :", this.velocity);    
            }
            else
                ServiceLocator.debug("[" + this.node.name + "] in vel comp - slowing :", this.velocity);    
        }
        else {
            this.velocity = this.velocity.add(this._desiredVelocity.multiply(delta * this._transitionSpeed));
            ServiceLocator.debug("[" + this.node.name + "] in vel comp - desired :", this._desiredVelocity);    
        }

        super.update();
    }

}
