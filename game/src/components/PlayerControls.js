import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Component } from '../engine/components/Component.js';

export class PlayerControls extends Component {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._hover = false;
    }


    initialize() {
        ServiceLocator.eventManager.subscribe(this, "keydown");
        ServiceLocator.eventManager.subscribe(this, "keyup");
    }
}
