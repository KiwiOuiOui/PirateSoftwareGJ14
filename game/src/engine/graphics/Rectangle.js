import { Graphic } from './Graphic.js';
import { Rectangle } from '../maths/Rectangle.js';
import { Vector } from '../maths/Vector.js';

export class RectangleGraphic extends Graphic {
    constructor(node, enabled = true) {
        super(node, enabled);

        this._type = "rectangle";
        this._rectangle = new Rectangle(new Vector(0, 0), new Vector(0, 0));
        this._fill = "black";
        this._stroke = "none";
        this._border = 1;
    }


    draw(context) {
        context.beginPath();
        context.lineWidth = this._border;
        context.strokeStyle = this._stroke;
        context.fillStyle = this._fill;

        this._rectangle.draw(context);

        context.fill();
        context.stroke();
    }


    set fill(style) {
        this._fill = style;
    }

    get fill() {
        return this._fill;
    }


    set stroke(style) {
        this._stroke = style;
    }

    get stroke() {
        return this._stroke;
    }


    set border(width) {
        this._border = width;
    }

    get border() {
        return this._border;
    }

    debug() {

    }


    set rectangle(rectangle) {
        this._rectangle = rectangle;
    }
}
