export class Clock {
    constructor(multiplier) {
        this._multiplier = multiplier;
        this._time = 0;
    }

    set time(time) {
        this._time = time;
    }
    get time() {
        return this._time;
    }

    set multiplier(multiplier) {
        this._multiplier = multiplier;
    }
    get multiplier() {
        return this._multiplier;
    }

    pause() {
        this._multiplier = 0;
    }
    resume(multiplier = 1) {
        this._multiplier = multiplier;
    }
    play() {
        this.setMultiplier(1);
    }
    reset() {
        this.setTime(0);
    }
    restart() {
        this.play();
        this.reset();
    }
    stop() {
        this.pause();
        this.reset();
    }
}
