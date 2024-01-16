import { Graphic } from './Graphic.js';
import { Rectangle } from '../maths/Rectangle.js';
import { Vector } from '../maths/Vector.js';

export class Sprite extends Graphic {
    constructor(node, enabled = true) {
        super(node, enabled);

        this._type = "sprite";
        this._position = new Vector(0, 0);
        this._frame = new Rectangle(new Vector(0, 0), new Vector(0, 0));
        this._image = null;
        this._scale = 1;
    }

    set image(image) {
        this._image = image
    }

    set position(v) {
        this._position = v;
    }

    draw(context) {
        context.drawImage(
            this._image,
            this.frame.x, //getter because of animation computation
            this.frame.y, //getter because of animation computation
            this._frame.width,
            this._frame.height,
            this._position.x * this._scale,
            this._position.y * this._scale,
            this._frame.width * this._scale,
            this._frame.height * this._scale,
        );          
    }

    set frame(f) {
        this._frame.x = f.x;
        this._frame.y = f.y;
        this._frame.width = f.width;
        this._frame.height = f.height;
    }

    get frame() {
        return this._frame;
    }

    debug() {

    }
}
