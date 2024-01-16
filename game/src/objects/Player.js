import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node.js';
import { Vector } from '../engine/maths/Vector.js';
import { Rectangle } from '../engine/maths/Rectangle.js';
import { Platform } from './Platform.js';

export class Player extends Node {
    constructor(name) {
        super(name);

        this._jumpSpeed = 300;
        this._fallSpeed = 200;
        this._maxWalkingSpeed = 200;

        this._controls = ServiceLocator.componentManager.create("PlayerControls", this);
        this._velocity = ServiceLocator.componentManager.create("VelocityTransition", this);
        this._graphic = ServiceLocator.graphicManager.create("rectangle", this, 0);
        this._collider = ServiceLocator.componentManager.create("RectangleCollider", this);
        this._grounded = false;
        this._djump = false;
        ServiceLocator.componentManager.addCollider(this._collider);

        this._graphic.rectangle = new Rectangle(new Vector(), new Vector(20, 20));
        this._graphic.fill = "black";
        this._graphic.stroke = "transparent";
        this._collider.hitbox = new Rectangle(new Vector(), new Vector(20, 20));
        //this._collider.cooldown = 50;

        this._debug = false;
        this.defaultOnCollide = this._collider.onCollide;

        this._collider.onCollide = this.onCollide;

        this._controls.initialize();
        this._velocity.desiredVelocity.y = this._fallSpeed;

        let left = 0,
            right = 0;

        this._controls.onEvent = (event) => {
            //console.log(event.type, event.code);

            if (event.type == "keydown") {
                if (event.code == "KeyW" && (this._grounded || this._djump)) {
                    this._velocity.velocity.y = -this._jumpSpeed;
                    this._velocity.desiredVelocity.y = this._fallSpeed;
                    this._djump = this._grounded;
                    this._grounded = false;
                }
                if (event.code == "KeyA") {
                    left = 1;
                }
                if (event.code == "KeyS") {
                    //     this._velocity.desiredVelocity = new Vector(0, 20);
                    this._debug = true;
                }
                if (event.code == "KeyD") {
                    right = 1;
                }
            }
            if (event.type == "keyup") {
                // if (event.code == "KeyW") {
                //     this._velocity.velocity = new Vector(0, -20);
                //     this._velocity.desiredVelocity = new Vector(0, 20);
                // }
                if (event.code == "KeyA") {
                    left = 0;
                }
                // if (event.code == "KeyS") {
                //     this._velocity.desiredVelocity = new Vector(0, 20);
                // }
                if (event.code == "KeyD") {
                    right = 0;
                }
            }
            this._velocity.desiredVelocity.x = this._maxWalkingSpeed * (right - left);
        }
    }

    onCollide = (collider) => {
        // ServiceLocator.debug("[" + this.name + "] ONCOLLIDE  : [" + collider.node.name + "]");
        // ServiceLocator.debug("[" + this.name + "] collider  : ", this._collider);
        // ServiceLocator.debug("[" + collider.node.name + "] collider  : ", collider);

        if (!this._velocity.velocity.equals(new Vector())) {
            this.defaultOnCollide(collider);

            let ownHitbox = this._collider.hitbox.move(this.globalPosition);
            let colHitbox = collider.hitbox.move(collider.node.globalPosition);
            let normal = new Vector();
            let mag = this._velocity.velocity.magnitude;
            let newVel = this._velocity.velocity;
            let newDesVel = this._velocity.desiredVelocity;
            let posCorrect = new Vector();
            let inter = null;

            if (collider.type == "circle") {
                inter = colHitbox.boundingBox.intersect(ownHitbox);
            }
            else if (collider.type == "rectangle") {
                inter = ownHitbox.intersect(colHitbox);
            }

            normal = ownHitbox.center.substract(inter.center).normalize();

            newVel = this._velocity.velocity.reflection(normal);
            newVel = newVel.normalize().multiply(mag); // so we dont lose speed

            if (collider.node instanceof Platform) {
                this._djump = true;

                if (false == this._grounded &&
                    Math.abs(newVel.y) < 50 &&
                    Math.abs(normal.x) < Math.abs(normal.y)) {
                    this._grounded = true;
                }

                if (this._grounded) {
                    newVel.y = 0;
                    newDesVel.y = 0;
                }
                else {
                    newVel.y *= .5;
                }

            }

            posCorrect = new Vector(inter.width * normal.x, inter.height * normal.y);

            // ServiceLocator.debug("[" + this.name + "] inter : ", inter);
            // ServiceLocator.debug("[" + this.name + "] normal : ", normal);

            this._collider.computeCollision = () => {
                if (null != newVel) {
                    ServiceLocator.debug("[" + this.name + "] change velocity : ", this._velocity.velocity, " to ", newVel);

                    this._velocity.velocity = newVel;
                }
                if (null != newDesVel) {
                    // ServiceLocator.debug("[" + this.name + "] change desiredVelocity : ", this._velocity.desiredVelocity, " to ", newDesVel);

                    this._velocity.desiredVelocity = newDesVel;
                }
                if (null != posCorrect) {
                    ServiceLocator.debug("[" + this.name + "] change position  : ", this._collider.hitbox.move(this.globalPosition).position, " to ", posCorrect);

                    this.move(posCorrect);
                }
            };

        }
    };
    onUpdate() {

        // ServiceLocator.debug("[" + this.name + "] UPDATE START vvvvvvvvvv");
        // ServiceLocator.debug("[" + this.name + "] position  : ", this._collider.hitbox.position, " at ", this.globalPosition);
        // ServiceLocator.debug("[" + this.name + "] desiredVelocity  : ", this._velocity.desiredVelocity);
        // ServiceLocator.debug("[" + this.name + "] velocity  : ", this._velocity.velocity);
        // ServiceLocator.debug("[" + this.name + "] UPDATE START ^^^^^^^^^^");
    }
}
