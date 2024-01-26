import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Rectangle } from '../engine/maths/Rectangle.js';
import { Vector } from '../engine/maths/Vector';
import { Platform } from './Platform';
import gameSpriteSrc from '/assets/gamesprite.png';
import { Furniture } from './Furniture';

export class Sink extends Furniture {
    constructor(name, position, layer = 0) {
        let baseValue = 50+Math.floor(15*Math.random())*10
        super(name, position, new Rectangle(new Vector(4, 8), new Vector(28,10)), baseValue, layer);

        
        let sprite = new Image(320, 180);
        sprite.src = gameSpriteSrc;
        this._graphic.image = sprite
        this._graphic.frame = new Rectangle(new Vector(0,48),new Vector(24,24));
        this._graphic.position = new Vector(0,-10);
        this._graphic.lastFrameNb = 0;


        ServiceLocator.componentManager.addCollider(this._collider);
        let rectCollider = new Rectangle(
            new Vector(4, 0),
            new Vector(16,12)
        );

        // this._graphicCol = ServiceLocator.graphicManager.create("rectangle", this, 100);
        // this._graphicCol.rectangle = rectCollider;
        // this._graphicCol.fill = "red";
        // this._graphicCol.stroke = "transparent";

        this._collider.hitbox = rectCollider;
        this._sceneToGoTo = null;
        this._landingPosition = new Vector(50,50);
    }
}
