import { Graphic } from './Graphic.js';

export class Text extends Graphic {
    constructor(node, enabled = true) {
        super(node, enabled);

        this._type = "text";
        this._text = null;
        this._font = "sans-serif"
        this._color = "black";
        this._size = 10;
    }


    draw(context) {
        context.textBaseline = "top";
        context.fillStyle = this._color;
        context.font = this._size + "px " + this._font;
        context.fillText(this._text, 0, 0);
    }


    debug() {

    }

    set text(value) {
        this._text = value;
    }

    get text() {
        return this._text;
    }


    set color(value) {
        this._color = value;
    }

    get color() {
        return this._color;
    }


    set font( /*ResourceManager::Resource*/ font) {
        this._font = font;
    }

    get font() {
        return this._font;
    }


    set size( /*ResourceManager::Resource*/ size) {
        this._size = size;
    }

    get size() {
        return this._size;
    }
}
