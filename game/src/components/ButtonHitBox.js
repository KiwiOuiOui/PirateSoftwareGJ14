import { Component } from '../engine/components/Component.js';
import { Rectangle } from '../engine/maths/Rectangle.js';
import { Vector } from '../engine/maths/Vector.js';

export class ButtonHitBox extends Component {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._rect = new Rectangle(new Vector(), new Vector());
        this._showHitBox = false;
    }


    set hitbox(rectangle) {
        this._rect = rectangle;
    }
    get hitbox() {
        return this._rect;
    }


    checkMouseHover(x, y) {
        return this._rect.move(this.node.globalPosition).contains(x, y);
    }
}
