import { Graphic } from './Graphic.js';
import { Rectangle } from '../maths/Rectangle.js';
import { Vector } from '../maths/Vector.js';
import { ServiceLocator } from '../ServiceLocator.js';
import { Sprite } from './Sprite.js';

export class AnimatedSprite extends Sprite {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._type = "animSprite";
        this.lastFrameNb = 1; // default 1 to see that it is animated even if not overwritten
        this.curentFrameNb = 0;
        this.frameDuration = 1; // en frame ou en ms;
        this.miliDuration = 200;
        this._frameOrMili = 'mili';
        this.elapsed = 0;
        this.direction = 'horizontal'; // or vertical
        this._animFrame = new Rectangle(new Vector(0, 0), new Vector(0, 0));
    }

    checkNextFrameOrNotAndProceed() {
        if('mili' == this._frameOrMili) {
            this.elapsed += ServiceLocator._clockManager._dtime;
            if(this.elapsed >= this.miliDuration) {
                if(++this.curentFrameNb > this.lastFrameNb)
                    this.curentFrameNb = 0
                this.computeFrame();
                this.elapsed %= this.miliDuration;
            }
        }
        if('frame' == this._frameOrMili) {
            this.elapsed++;
            if(this.elapsed >= this.frameDuration) {
                if(++this.curentFrameNb > this.lastFrameNb)
                    this.curentFrameNb = 0
                this.computeFrame();
                this.elapsed = 0;
            }
        }
    }

    resetAnim() {
        this._animFrame.x = this._frame.x;
        this._animFrame.y = this._frame.y;
        this._animFrame.width = this._frame.width;
        this._animFrame.height = this._frame.height;    
        this.curentFrameNb = 0;
        this.elapsed = 0;
    }
    computeFrame() {
        if(0 == this.curentFrameNb)
        {
            this._animFrame.x = this._frame.x;
            this._animFrame.y = this._frame.y;
            this._animFrame.width = this._frame.width;
            this._animFrame.height = this._frame.height;    
        }
        if('horizontal' == this.direction) {
            this._animFrame.x = this._frame.x+this.curentFrameNb*this._frame.width;
        }
        if('vertical' == this.direction) {
            this._animFrame.y = this._frame.y+this.curentFrameNb*this._frame.height;
        }
    }

    set frame(f) {
        this._frame.x = f.x;
        this._frame.y = f.y;
        this._frame.width = f.width;
        this._frame.height = f.height;
        this._animFrame.x = f.x;
        this._animFrame.y = f.y;
        this._animFrame.width = f.width;
        this._animFrame.height = f.height;
    }

    get frame() {
        return this._animFrame;
    }

    debug() {

    }
}
