import { ServiceLocator } from '../ServiceLocator.js';

export class FPSCounter {
    constructor(delta = 1000) {
        this._frames = [];
        this._delta = delta;
        this._frameNb = 0;
    }

    get frameNb() {
        return this._frameNb;
    }

    update() {
        ++this._frameNb;
        this._frames.push(ServiceLocator.clockManager.time);
        this.clearFrame();
    }


    clearFrame() {
        this._frames.forEach((f) => {
            if (f + this._delta < ServiceLocator.clockManager.time) {
                this._frames.splice(this._frames.indexOf(f), 1);
            }
        });
    }


    get FPS() {
        return this._frames.length / (this._delta / 1000)
    }
}
