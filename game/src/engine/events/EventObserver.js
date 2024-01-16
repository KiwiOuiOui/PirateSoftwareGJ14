export class EventObserver {
    constructor(component) {
        this._component = component;
    }


    notify(event) {
        if (this._component.enabled &&
            this._component.node.enabled &&
            this._component.node.scene.inputable) {
            this._component.onEvent(event);
        }
    }


    get component() {
        return this._component;
    }
}
