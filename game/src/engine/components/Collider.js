import { ServiceLocator } from '../ServiceLocator.js';
import { Component } from './Component.js';

export class Collider extends Component {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._type = null; // set when extending class
        this._enabled = true;
        this._cooldown = 0;
    }

    get enabled() {
        return this._enabled;
    }

    enable() {
        this._enabled = true;
    }

    disable() {
        this._enabled = false;
    }

    set cooldown(value) {
        this._cooldown = value;
    }

    get cooldown() {
        return this._cooldown;
    }

    get type() {
        return this._type;
    }

    checkCollision(collider) {
        if (false == this._enabled || false == collider._enabled)
            return false;

        let collide;

        if (collider.type == "rectangle") {
            collide = this.hitbox.move(this.node.globalPosition).collideToRectangle(collider.hitbox.move(collider.node.globalPosition));
        }
        else if (collider.type == "circle") {
            collide = this.hitbox.move(this.node.globalPosition).collideToCircle(collider.hitbox.move(collider.node.globalPosition));
        }

        if (collide && 0 < this.cooldown) {
            this.disable();
            ServiceLocator.clockManager.addTimer(this.cooldown).action = () => {
                this.enable();
            };
        }
        if (collide && 0 < collider.cooldown) {
            collider.disable();
            ServiceLocator.clockManager.addTimer(collider.cooldown).action = () => {
                collider.enable();
            };
        }
        return collide;
    }

    onCollide(collider) {}

    computeCollision = () => {}
}
