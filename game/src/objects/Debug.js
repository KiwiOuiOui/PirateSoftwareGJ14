import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node.js';

export class Debug extends Node {
    constructor(name, position) {
        super(name, position);

        let pauseKey = ServiceLocator.componentManager.create("PauseKey", this);
        this._txt = ServiceLocator.graphicManager.create("text", this, 'a');

        this._txt.color = "red";
        this._txt.size = 10;

        pauseKey.initialize()
    }

    update() {
        this._txt.text = ServiceLocator.FPSCounter.FPS.toString();
        super.update();
    }
}