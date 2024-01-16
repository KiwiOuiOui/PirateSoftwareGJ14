import { Clock } from './Clock.js';
import { Timer } from './Timer.js';

export class ClockManager {
    constructor() {
        this._clocks = [];
        this._timers = [];
        this._globalClock = new Clock(this);
        this._pause = true;
        this._dtime = 0;
    }


    addClock(multiplier = 1) {
        let clock = new Clock(multiplier);

        this._clocks.push(clock);

        return clock;
    }


    removeClock(clock) {
        let i = this._clocks.indexOf(clock);

        if (i >= 0)
            this._clocks.splice(i, 1);
    }

    addTimer(duration, multiplier = 1) {
        let timer = new Timer(duration, multiplier);

        this._timers.push(timer);

        return timer;
    }


    removeTimer(timer) {
        let i = this._timers.indexOf(timer);

        if (i >= 0)
            this._timers.splice(i, 1);
    }


    pause() {
        this._pause = true;
    }
    get running() {
        return !this._pause;
    }
    resume () {
        this._pause = false;
    }


    update() {
        this._timers.filter((t) => t.over).forEach((t) => {
            this.removeTimer(t);
        });

        let timestamp = window.performance.now();
        this._dtime = (this._pause ? 0 : 1) * (timestamp - this._globalClock.time);
        this._globalClock.time = timestamp;

        this._clocks.forEach((c) => {
            c.time = c.time + this._dtime * c.multiplier;
        });

        this._timers.forEach((t) => {
            t.duration = t.duration - this._dtime * t.multiplier;
        });
    }

    fireTimers() {
        this._timers.filter((t) => t.over).forEach((t) => {
            t.fire();
        });

    }
    
    get dtime() {
        return this._dtime / 1000;
    }

    get time() {
        return this._globalClock.time;
    }
}
