import { Graphic } from './Graphic.js';
import { Circle } from '../maths/Circle.js';
import { Vector } from '../maths/Vector.js';

export class CircleGraphic extends Graphic {
    constructor(node, enabled = true) {
        super(node, enabled);

        this._type = "circle";
        this._circle = new Circle(new Vector(0, 0), 1);
        this._fill = "black";
        this._stroke = "none";
        this._border = 1;
        this._alpha = 1;
    }


    draw(context) {
        let alphaBuffer = context.globalAlpha;
        
        context.globalAlpha = this._alpha;
        context.beginPath();
        context.lineWidth = this._border;
        context.strokeStyle = this._stroke;
        context.fillStyle = this._fill;

        this._circle.draw(context);

        context.fill();
        context.stroke();
        context.globalAlpha = alphaBuffer;
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
    
    set alpha(value) {
        this._alpha = value;
    }

    get alpha() {
        return this._alpha;
    }


    debug() {

    }

    set circle(circle) {
        this._circle = circle;
    }
}
