import { ServiceLocator } from '../ServiceLocator.js';
import { Text } from './Text.js';
import { RectangleGraphic } from './Rectangle.js';
import { CircleGraphic } from './Circle.js';
import { Sprite } from './Sprite.js';
import { AnimatedSprite } from './AnimatedSprite.js';


export class GraphicFactory {
    static initialize() {
        this.registerGraphic("text", Text);
        this.registerGraphic("rectangle", RectangleGraphic);
        this.registerGraphic("circle", CircleGraphic);
        this.registerGraphic("sprite", Sprite);
        this.registerGraphic("animSprite", AnimatedSprite);
    }


    static registerGraphic(type, graphicClass) {
        this._creators.set(type, (node) => { return new graphicClass(node); });
        //console.log("GraphicFactory registration \"" + type + "\"...");
    }


    static create(type, node, layer) {
        let graphic = null;

        if (this._creators.has(type)) {
            ServiceLocator.debug("Component Factory Creating \"" + type + "\"...");
            graphic = this._creators.get(type)(node);

            ServiceLocator.graphicManager.addGraphic(graphic, layer);

            if (node) node.addGraphic(graphic);

            return graphic;
        }

        return null;
    }
}


GraphicFactory._creators = new Map();
GraphicFactory.initialize();
