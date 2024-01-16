import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node.js';
import { Circle } from '../engine/maths/Circle.js';
import { ForceComponent } from '../components/ForceComponent.js';
import { Platform } from './Platform.js';
import { Vector } from '../engine/maths/Vector.js';
import { CircleCollider } from '../components/CircleCollider.js';
import persoSprite from '/assets/spritePerso.png';
import { Rectangle } from '../engine/maths/Rectangle.js';

export class Ball extends Node {
    constructor(name, position, radius, layer = 0) {
        super(name);
        this._graphic2 = ServiceLocator.graphicManager.create("circle", this, layer);

        this._graphic = ServiceLocator.graphicManager.create("animSprite", this, layer);
        this._physics = ServiceLocator.componentManager.create("Physics", this);
        this._collider = ServiceLocator.componentManager.create("CircleCollider", this);

        ServiceLocator.componentManager.addCollider(this._collider);
        this._graphic2.circle = new Circle(new Vector(0,0), radius);
        this._graphic2.fill = "yellow";
        this._graphic2.stroke = "transparent";

        this.position = position;

        let sprite = new Image(320, 180);
        sprite.src = persoSprite;

        this._graphic.image = sprite
        this._graphic.frame = new Rectangle(new Vector(0,0),new Vector(24,24));
        this._graphic.position = new Vector(-12, -12);
        this._graphic.lastFrameNb = 2

        this._collider.hitbox = new Circle(new Vector(0,0), radius);

        this._defaultOnCollide = this._collider.onCollide;

        this._collider.onCollide = this.onCollide;
    }

    set velocity(v) {
        this._physics.velocity = v;
    }

    set color(value) {
        this._graphic.fill = value;
    }

    onCollide = (collider) => {
        this._defaultOnCollide(collider);

        if (collider instanceof ForceComponent) {
            ServiceLocator.debug("\n\n\n\n[" + this.name + "] collide ForceComponent ", collider);
            this._collider.computeCollision = () => {}
            this._physics.addForce(collider.force)
        }
        if (collider.node instanceof Platform) {
            ServiceLocator.debug("\n\n\n\n[" + this.name + "] collide node Platform ", collider.node);

            let inter = null;
            let dist = null;
            let posCorrect = null;
            let normal = new Vector();
            let ownHitbox = this._collider.hitbox.move(this.globalPosition);
            let colHitbox = collider.hitbox.move(collider.node.globalPosition);
            let newVel = null;
            let mag = this._physics.velocity.magnitude;

            inter = ownHitbox.boundingBox.intersect(colHitbox);
            dist = ownHitbox.position.substract(inter.center);
            normal = dist.normalize();
            //ServiceLocator.debug("[" + this.name + "] normal : ", normal);
            //ServiceLocator.debug("[" + this.name + "] intersection : ", inter);
            //ServiceLocator.debug("[" + this.name + "] dist : ", dist);

            posCorrect = new Vector(inter.width * normal.x, inter.height * normal.y); //normal.multiply(magnCorrect) //.multiply(.5);
            posCorrect = new Vector(
                Math.ceil(Math.abs(posCorrect.x)) * Math.sign(posCorrect.x),
                Math.ceil(Math.abs(posCorrect.y)) * Math.sign(posCorrect.y)
            );

            newVel = this._physics.velocity.reflection(normal);
            newVel = newVel.normalize().multiply(mag);

            this._collider.computeCollision = () => {
                if (null != newVel) {
                    //ServiceLocator.debug("[" + this.name + "] change velocity : ", this._physics.velocity, " to ", newVel);

                    this._physics.velocity = newVel;
                }
                if (null != posCorrect) {
                    let np = this._collider.hitbox.move(this.globalPosition).position.add(posCorrect);
                    if (np.x < 10 || np.y < 10 || isNaN(np.x) || isNaN(np.y)) {
                        //ServiceLocator.clockManager.pause();
                        //ServiceLocator.debug("[" + this.name + "] LOOK HERE ");

                        let debugV = posCorrect;
                        let debugF = 1;

                        ServiceLocator.context.resetTransform();
                        ServiceLocator.context.scale(ServiceLocator.scale, ServiceLocator.scale);

                        ServiceLocator.context.strokeStyle = "green"
                        ServiceLocator.context.beginPath();
                        ServiceLocator.context.moveTo(ownHitbox.position.x, ownHitbox.position.y);
                        ServiceLocator.context.lineTo(ownHitbox.position.x + posCorrect.x * debugF, ownHitbox.position.y + posCorrect.y * debugF);
                        ServiceLocator.context.stroke();

                    }
                    //ServiceLocator.debug("[" + this.name + "] change position  : ", this._collider.hitbox.move(this.globalPosition).position, " to ", posCorrect);
                    //ServiceLocator.debug("[" + this.name + "] new position  : ", np);
                    this.move(posCorrect);
                }
            };
        }
        else if(collider instanceof CircleCollider) {
            // VERIFY
            let ownHitbox = this._collider.hitbox.move(this.globalPosition);
            let colHitbox = collider.hitbox.move(collider.node.globalPosition);
            let dist = ownHitbox.position.substract(colHitbox.position);
            let normal = dist.normalize();
            //console.log("normal", (this._collider.hitbox.radius + collider.hitbox.radius), dist.magnitude);
            ServiceLocator.clockManager.pause();


            //ServiceLocator.debug("CORRECTION MAGNITUDE : ", (this._collider.hitbox.radius + collider.hitbox.radius) - dist.magnitude)
            let posCorrect = normal.multiply(Math.ceil((this._collider.hitbox.radius + collider.hitbox.radius) - dist.magnitude) / 2);
        }
    }
    onUpdate = () => {
        this._graphic.checkNextFrameOrNotAndProceed()
    }
}
