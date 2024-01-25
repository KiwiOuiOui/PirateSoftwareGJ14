export class Component {
    constructor(node, enabled = true) {
        this._node = node;
        this._enabled = enabled;
    }


    initialize() {}
    update() {}

    enable() {
        this._enabled = true;
        this._onEnable();
    }


    disable() {
        this._enabled = false;
        this._onDisable();
    }


    enabled() {
        return this._enabled;
    }


    get node() {
        return this._node;
    }


    onEvent(event) {}
    _onEnable() {}
    _onDisable() {}

    debug() {

    }
}
