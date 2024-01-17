import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node.js';
import { Vector } from '../engine/maths/Vector.js';
import { Rectangle } from '../engine/maths/Rectangle.js';
import { Platform } from './Platform.js';
import persoSprite from '/assets/spritePerso.png';

export class Player extends Node {
    constructor(name) {
        super(name);

        this._maxWalkingSpeed = 200;

        this._controls = ServiceLocator.componentManager.create("PlayerControls", this);
        //this._velocity = ServiceLocator.componentManager.create("VelocityTransition", this);
        this._graphic = ServiceLocator.graphicManager.create("animSprite", this, 2);
        //this._collider = ServiceLocator.componentManager.create("RectangleCollider", this);
        //ServiceLocator.componentManager.addCollider(this._collider);

        let sprite = new Image(320, 180);
        sprite.src = persoSprite;

        this._graphic.image = sprite
        this._graphic.frame = new Rectangle(new Vector(0,0),new Vector(24,24));
        this._graphic.position = new Vector(-12, -12);
        this._graphic.lastFrameNb = 1
        //this._collider.hitbox = new Rectangle(new Vector(), new Vector(20, 20));
        //this._collider.cooldown = 50;

        this._debug = false;
        //this.defaultOnCollide = this._collider.onCollide;

        //this._collider.onCollide = this.onCollide;

        this._controls.initialize();

        this._controls.direction = {
            left : 0,
            right : 0,
            up : 0,
            down : 0
        };

        this._controls.onEvent = (event) => {
            //console.log(event.type, event.code);

            if (event.type == "keydown") {
                if (event.code == "KeyW") {
                    this._controls.direction.up = 1;
                }
                if (event.code == "KeyA") {
                    this._controls.direction.left = 1;
                }
                if (event.code == "KeyS") {
                    this._controls.direction.down = 1;
                }
                if (event.code == "KeyD") {
                    this._controls.direction.right = 1;
                }
            }
            if (event.type == "keyup") {
                if (event.code == "KeyW") {
                //     this._velocity.velocity = new Vector(0, -20);
                //     this._velocity.desiredVelocity = new Vector(0, 20);
                this._controls.direction.up = 0;
                }
                if (event.code == "KeyA") {
                    this._controls.direction.left = 0;
                }
                if (event.code == "KeyS") {
                //     this._velocity.desiredVelocity = new Vector(0, 20);
                    this._controls.direction.down = 0;
                }
                if (event.code == "KeyD") {
                    this._controls.direction.right = 0;
                }
            }
            //this._velocity.desiredVelocity.x = this._maxWalkingSpeed * (right - left);
        }
        this._controls.update = () => {
            this.position.x += this._maxWalkingSpeed*this._controls.direction.right*ServiceLocator.clockManager.dtime;
            this.position.x -= this._maxWalkingSpeed*this._controls.direction.left*ServiceLocator.clockManager.dtime;
            this.position.y += this._maxWalkingSpeed*this._controls.direction.down*ServiceLocator.clockManager.dtime;
            this.position.y -= this._maxWalkingSpeed*this._controls.direction.up*ServiceLocator.clockManager.dtime;    
        }
    }

    onCollide = (collider) => {
        // ServiceLocator.debug("[" + this.name + "] ONCOLLIDE  : [" + collider.node.name + "]");
        // ServiceLocator.debug("[" + this.name + "] collider  : ", this._collider);
        // ServiceLocator.debug("[" + collider.node.name + "] collider  : ", collider);

        /*if (!this._velocity.velocity.equals(new Vector())) {
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
        */
    };
    onUpdate() {
        this._graphic.checkNextFrameOrNotAndProceed()
        //ServiceLocator.error(this.globalPosition);
        // ServiceLocator.debug("[" + this.name + "] UPDATE START vvvvvvvvvv");
        // ServiceLocator.debug("[" + this.name + "] position  : ", this._collider.hitbox.position, " at ", this.globalPosition);
        // ServiceLocator.debug("[" + this.name + "] desiredVelocity  : ", this._velocity.desiredVelocity);
        // ServiceLocator.debug("[" + this.name + "] velocity  : ", this._velocity.velocity);
        // ServiceLocator.debug("[" + this.name + "] UPDATE START ^^^^^^^^^^");
    }
}
