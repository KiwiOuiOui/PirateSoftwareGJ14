export class Graphic {
    constructor(node, enabled = true) {
        this._type; //set when extending
        this._layer;
        this._node = node;
        this._enabled = enabled;
    }


    draw(context) {

    }


    debug() {

    }


    enable() {
        this._enabled = true;
    }

    disable() {
        this._enabled = false;
    }

    get enabled() {
        return this._enabled;
    }


    get node() {
        return this._node;
    }


    get type() {
        return this._type;
    }


    set layer(value) {
        this._layer = value;
    }

    get Layer() {
        return this._layer;
    }
}
