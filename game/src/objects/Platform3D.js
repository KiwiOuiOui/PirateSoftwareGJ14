import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node.js';
import { Rectangle } from '../engine/maths/Rectangle.js';
import { Vector } from '../engine/maths/Vector';
import { Platform } from './Platform';

export class Platform3D extends Platform {
    constructor(name, position, dimension, layer = 0) {
        super(name, position, dimension)

        this._graphic2 = ServiceLocator.graphicManager.create("rectangle", this, layer+1);

        let rectCollider = new Rectangle(
            new Vector(0, Math.floor(dimension.y/3)),
            new Vector(dimension.x, dimension.y-Math.floor(dimension.y/3))
        );
        this._graphic.rectangle = rectCollider;
        this._graphic.fill = "red";
        this._graphic.stroke = "transparent";
        this._graphic2.rectangle = new Rectangle(
            new Vector(0,0),
            new Vector(dimension.x, Math.floor(dimension.y/3))
        );
        this._graphic2.fill = "white";
        this._graphic2.stroke = "transparent";
        this._collider.hitbox = rectCollider;
    }
}
