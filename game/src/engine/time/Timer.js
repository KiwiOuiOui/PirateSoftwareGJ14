export class Timer {
    constructor(duration, multiplier = 1, action = () => {}) {
        this._duration = duration;
        this._action = action;
        this._multiplier = multiplier;
    }

    set action(action) {
        this._action = action;
    }

    get action() {
        return this._action;
    }
    
    
    set duration(duration) {
        this._duration = duration;
    }

    get duration() {
        return this._duration;
    }


    get over() {
        return (this._duration <= 0);
    }


    fire() {
        this._action();
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
