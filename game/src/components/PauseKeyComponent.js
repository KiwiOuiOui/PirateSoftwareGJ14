import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Component } from '../engine/components/Component.js';

export class PauseKeyComponent extends Component {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._hover = false;
        this._onClick = () => {}; //void function
        this._onEnter = () => {}; //void function
        this._onLeave = () => {}; //void function
        this._hitbox = null;
    }


    initialize() {
        ServiceLocator.eventManager.subscribe(this, "keyup");
    }


    set key(key) {
        this._key = key;
    }
    get key() {
        return this._key;
    }


    onEvent(event) {
        if (event.type == "keyup") {
            if (event.keyCode == 80){
                console.log("paused frame #" + ServiceLocator.FPSCounter.frameNb)
                ServiceLocator.clockManager.pause();
            }
            if (event.keyCode == 82)
                ServiceLocator.clockManager.resume();
        }
    }
}
