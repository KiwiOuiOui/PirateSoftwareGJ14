import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Component } from '../engine/components/Component.js';
import { Vector } from '../engine/maths/Vector.js';

export class Velocity extends Component {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._velocity = new Vector(0, 0);
    }


    set velocity(velocity) {
        this._velocity = velocity;
    }

    get velocity() {
        return this._velocity;
    }

    update() {
        //ServiceLocator.debug("[" + this.node.name + "] in vel comp - velocity :", this.velocity);
        this.node.move(this._velocity.multiply(this.node.scene.clock.multiplier * ServiceLocator.clockManager.dtime));
    }

}
