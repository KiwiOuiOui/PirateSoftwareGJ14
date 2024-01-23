import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Velocity } from './VelocityComponent.js';
import { Vector } from '../engine/maths/Vector.js';
import { Player } from '../objects/Player.js';

export class VelocityTransition extends Velocity {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._endVelocity = new Vector(0, 0);
        this._startVelocity = new Vector(0, 0);
        //transitionspeed is the % reduced in a second
        this._transitionSpeed = 1;
        this._precision = 0.1;
        this._duration = 1;
        this._elapsed = 0;
    }


    launch(obj) {
        this._startVelocity = this._velocity;
        this._endVelocity = obj.endVelocity;
        if(undefined != obj.precision)
        {
            this._precision = obj.precision;
        }
        if(undefined != obj.duration)
        {
            this._duration = obj.duration;
        }
        if(undefined != obj.transitionSpeed)
        {
            this._transitionSpeed = obj.transitionSpeed;
        }
        this._elapsed = 0;
        if(0 >= this._duration) {
            this._velocity.x = this._endVelocity.x;
            this._velocity.y = this._endVelocity.y;    
        }
    }

    easeOutPow(x, pow) {
        return 1 - Math.pow(1 - x, pow);
    }

    update() {
        if(this._elapsed < this._duration)
        {
            let delta = this.node.scene.clock.multiplier * ServiceLocator.clockManager.dtime;
            this._elapsed += delta;

            //if anim finishes this frame
            if(this._elapsed >= this._duration)
            {
                this._elapsed == this._duration
                this._velocity.x = this._endVelocity.x;
                this._velocity.y = this._endVelocity.y;    
            }
            else
            {
                let tweenstep = this.easeOutPow(this._elapsed/this._duration,this._transitionSpeed);
                this._velocity.x = this._startVelocity.x * (1-tweenstep) + tweenstep*this._endVelocity.x;
                this._velocity.y = this._startVelocity.y * (1-tweenstep) + tweenstep*this._endVelocity.y;    
            }
        }

        super.update();
    }

}
