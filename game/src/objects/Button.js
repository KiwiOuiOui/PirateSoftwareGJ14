import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node.js';
import { Rectangle } from '../engine/maths/Rectangle';
import { Vector } from '../engine/maths/Vector';

export class Button extends Node {
    constructor(name, position, text, layer = 1) {
        super(name, position);

        this._button = ServiceLocator.componentManager.create("ButtonComponent", this);
        this._button.initialize();
        this._hitbox = this._button._hitbox;

        this._txt = ServiceLocator.graphicManager.create("text", this, layer+1);
        this._txt.text = text;
        this._txt.color = "red";
        this._txt.size = 10;

        this._bg = ServiceLocator.graphicManager.create("rectangle", this, layer);
        this._bg.rectangle = new Rectangle(new Vector(0,0), new Vector(0,0));
        this._bg.fill = "transparent";
        this._bg.stroke = "transparent";

        this._button._onEnter = () => {
            ServiceLocator.context.canvas.style.cursor = "pointer";
        }
        this._button._onLeave =() => {
            ServiceLocator.context.canvas.style.cursor = "auto";
        }
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