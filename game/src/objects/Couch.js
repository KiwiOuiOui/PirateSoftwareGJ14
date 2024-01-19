import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Rectangle } from '../engine/maths/Rectangle.js';
import { Vector } from '../engine/maths/Vector';
import { Platform } from './Platform';
import spriteSrc from '/assets/sprite.png';
import { SolidObject } from './SolidObject';

export class Couch extends SolidObject {
    constructor(name, position, layer = 0) {
        super(name, position);


        this._graphic = ServiceLocator.graphicManager.create("animSprite", this, 2);
        this._collider = ServiceLocator.componentManager.create("RectangleCollider", this);
        // this._graphicCol = ServiceLocator.graphicManager.create("rectangle", this, layer);
        
        let sprite = new Image(320, 180);
        sprite.src = spriteSrc;
        this._graphic.image = sprite
        this._graphic.frame = new Rectangle(new Vector(0,23),new Vector(36,24));
        //this._graphic.position = new Vector(-12, -12);
        this._graphic.lastFrameNb = 0;


        ServiceLocator.componentManager.addCollider(this._collider);
        this._defaultOnCollide = this._collider.onCollide;
        this._collider.onCollide = this.onCollide;

        let rectCollider = new Rectangle(
            new Vector(4, 8),
            new Vector(28,10)
        );
        // this._graphicCol.rectangle = rectCollider;
        // this._graphicCol.fill = "red";
        // this._graphicCol.stroke = "transparent";

        this._collider.hitbox = rectCollider;
        this._sceneToGoTo = null;
        this._landingPosition = new Vector(50,50);
    }

    onCollide = (collider) => {
        this._defaultOnCollide(collider);
    }

    onUpdate() {
        this._graphic.checkNextFrameOrNotAndProceed()
    }
}
