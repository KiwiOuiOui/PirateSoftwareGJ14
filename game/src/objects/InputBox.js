import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Rectangle } from '../engine/maths/Rectangle';
import { Vector } from '../engine/maths/Vector';
import { Button } from './Button';

export class InputBox extends Button {
    constructor(name, position, text, layer = 1) {
        super(name, position, text, layer = 1);
        this._baseColor = this._txt.color;
        this._capturing = false;
        this._button._baseEvent = this._button.onEvent;

        this._button._onEnter = () => {
            ServiceLocator.context.canvas.style.cursor = "text";
        }
        this._button._onClick = () => {
            this._capturing = true;
            this._txt.color = "white";
            this._button.onEvent = (event) => {
                this._button._baseEvent(event);

                if(!this._capturing) {
                    return;
                }
                if (event.type == "keydown") {
                    this._txt.color = this._baseColor;
                    ServiceLocator.context.canvas.style.cursor = "auto";
                    this._capturing = false
            
                    this._onInput(event);
                    this._button.onEvent = this._button._baseEvent;
                }
            }
        }
        ServiceLocator.eventManager.subscribe(this._button, "keydown");
    }

    set onInput(action) {
        this._onInput = action;
    }

    set onInput(action) {
        this._onInput = action;
    }

    set onClick(action) {
        this._button._onClick = action;
    }

    set onEnter(action) {
        this._button._onEnter = action;
    }

    set onLeave(action) {
        this._button._onLeave = action;
    }

    set hitbox(rectangle) {
        this._button._hitbox.hitbox = rectangle;
        this._bg.rectangle = rectangle;
    }

    get hitbox() {
        return this._button._hitbox.hitbox;
    }

}