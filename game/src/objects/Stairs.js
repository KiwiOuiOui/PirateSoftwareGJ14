import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node.js';
import { Rectangle } from '../engine/maths/Rectangle.js';
import { Vector } from '../engine/maths/Vector';
import { Platform } from './Platform';

export class Stairs extends Platform {
    constructor(name, position, dimension, layer = 0) {
        super(name, position, dimension);

        this._graphic2 = ServiceLocator.graphicManager.create("rectangle", this, layer+1);

        let RectCollider = new Rectangle(
            new Vector(0, Math.floor(dimension.y/3)),
            new Vector(dimension.x, dimension.y-Math.floor(dimension.y/3))
        );
        this._graphic2.rectangle = new Rectangle(
            new Vector(0,0),
            new Vector(dimension.x, Math.floor(dimension.y/3))
        );
        this._graphic2.fill = "green";
        this._graphic2.stroke = "transparent";
        this._collider.hitbox = RectCollider;
        this._sceneToGoTo = null;
        //this._landingPosition = new Vector(50,50);
    }

    leadsTo(scene) {
        this._sceneToGoTo = scene;
    }

    use(player) {
        if(this._sceneToGoTo){
            ServiceLocator.error("using stairs to go to ", this._sceneToGoTo.name);
            ServiceLocator.error("where is player ", player);
            player.parent.removeChild(player);
            this._sceneToGoTo.root.addChild(player);
            ServiceLocator.game.changeScene(this._sceneToGoTo);
            ServiceLocator.error("where is player ", player);
        }
        else {
            ServiceLocator.error("no scene set in ", this.scene, this.scene.name);    
        }
    }
}
