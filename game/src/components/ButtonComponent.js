import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Component } from '../engine/components/Component.js';
import { ComponentFactory } from '../engine/components/ComponentFactory.js';

export class Button extends Component {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._hover = false;
        this._onClick = () => {}; //void function
        this._onEnter = () => {}; //void function
        this._onLeave = () => {}; //void function
        this._hitbox = null;
    }


    initialize() {
        this._hitbox = ComponentFactory.create("ButtonHitBox", this.node);
        ServiceLocator.eventManager.subscribe(this, "mousemove");
        ServiceLocator.eventManager.subscribe(this, "mouseup");
    }


    set hitbox(rectangle) {
        this._hitbox.hitbox = rectangle;
    }
    get hitbox() {
        return this._hitbox.hitbox;
    }

    set onClick(action) {
        this._onClick = action;
    }

    set onEnter(action) {
        this._onEnter = action;
    }

    set onLeave(action) {
        this._onLeave = action;
    }


    update() {}


    checkMouseHover(x, y) {
        return this._hitbox.checkMouseHover(x, y);
    }


    onEvent(event) {
        if (event.type == "mousemove") {
            let flag = this._hover;
            this._hover = this.checkMouseHover(event.canvasX, event.canvasY);

            if (flag === false && this._hover === true) {
                this._onEnter();
            }
            else if (flag === true && this._hover === false) {
                this._onLeave();
            }
        }
        else if (event.type == "mouseup") {
            if (this._hover)
                this._onClick();
        }
    }


    _onEnable() {}
    _onDisable() {}


    debug() {

    }
}
