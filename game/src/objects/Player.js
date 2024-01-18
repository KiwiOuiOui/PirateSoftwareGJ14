import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node.js';
import { Vector } from '../engine/maths/Vector.js';
import { Rectangle } from '../engine/maths/Rectangle.js';
import { Platform } from './Platform.js';
import persoSprite from '/assets/spritePerso.png';
import { ForceComponent } from '../components/ForceComponent';
import { Stairs } from './Stairs';
import { Game } from '../engine/Game';
import { Scene } from '../engine/Scene';

export class Player extends Node {
    constructor(name, position) {
        super(name, position);

        this._graphic = ServiceLocator.graphicManager.create("animSprite", this, 2);
        let sprite = new Image(320, 180);
        sprite.src = persoSprite;
        this._graphic.image = sprite
        this._graphic.frame = new Rectangle(new Vector(0,0),new Vector(24,24));
        this._graphic.position = new Vector(-12, -12);
        this._graphic.lastFrameNb = 1

        this._velocity = ServiceLocator.componentManager.create("VelocityTransition", this);
        this._maxWalkingSpeed = 100;
        this._velocity.transitionSpeed = 10;

        this._pauseBtn = ServiceLocator.componentManager.create("PauseKey", this);
        this._pauseBtn.initialize();

        this._controls = ServiceLocator.componentManager.create("PlayerControls", this);
        this._controls.initialize();
        this._controls.direction = {
            left : 0,
            right : 0,
            up : 0,
            down : 0
        };
        this._controls.onEvent = (event) => {
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
                    this._controls.direction.up = 0;
                }
                if (event.code == "KeyA") {
                    this._controls.direction.left = 0;
                }
                if (event.code == "KeyS") {
                    this._controls.direction.down = 0;
                }
                if (event.code == "KeyD") {
                    this._controls.direction.right = 0;
                }
            }
            //this._velocity.desiredVelocity.x = this._maxWalkingSpeed * (right - left);
        }
        this._controls.update = () => {
            let v = new Vector(0,0);
            v.x += this._maxWalkingSpeed*(this._controls.direction.right-this._controls.direction.left);
            v.y += this._maxWalkingSpeed*(this._controls.direction.down-this._controls.direction.up);

            this._velocity.desiredVelocity = v; 
        }


        this._collider = ServiceLocator.componentManager.create("RectangleCollider", this);
        ServiceLocator.componentManager.addCollider(this._collider);
        this._collider.hitbox = new Rectangle(new Vector(-5,2), new Vector(10, 8));
        //this._collider.cooldown = 50;
        this._debug = false;
        this._defaultOnCollide = this._collider.onCollide;
        this._collider.onCollide = this.onCollide;

        this._stairsAvailable = true;
    }

    onUpdate() {
        this._graphic.checkNextFrameOrNotAndProceed()
    }

    onCollide = (collider) => {
        this._defaultOnCollide(collider);

        if (collider instanceof ForceComponent) {
            ServiceLocator.debug("\n\n\n\n[" + this.name + "] collide ForceComponent ", collider);
            this._collider.computeCollision = () => {}
            this._physics.addForce(collider.force)
            return;
        }
        if (collider.node instanceof Stairs &&
            0 < this._stairsAvailable) {
            //this.position = collider.node._landingPosition;
            collider.node.use(this);

            this._stairsAvailable = false;
            ServiceLocator.clockManager.addTimer(1000).action = () => {
                this._stairsAvailable = true;
            };
    
            return;
        }
        if (collider.node instanceof Platform) {
            let ownHitbox = this._collider.hitbox.move(this.globalPosition);
            let ownCenter = ownHitbox.center;
            let colHitbox = collider.hitbox.move(collider.node.globalPosition);
            let intersect = ownHitbox.intersect(colHitbox);
            let intersectCenter = intersect.center;


            if(ownCenter.y < colHitbox.y) {
                this._velocity._velocity.y = 0;
                this._velocity._desiredVelocity.y = 0;
                this.move(new Vector(0,-1*intersect.height));
            }
            if(ownCenter.y > colHitbox.y+colHitbox.height) {
                this._velocity._velocity.y = 0;
                this._velocity._desiredVelocity.y = 0;
                this.move(new Vector(0,intersect.height));
            }
            if(ownCenter.x < colHitbox.x) {
                this._velocity._velocity.x = 0;
                this._velocity._desiredVelocity.x = 0;
                this.move(new Vector(-1*intersect.width,0));
            }
            if(ownCenter.x > colHitbox.x+colHitbox.width) {
                this._velocity._velocity.x = 0;
                this._velocity._desiredVelocity.x = 0;
                this.move(new Vector(intersect.width,0));
            }
            return;
        }
    }
}
