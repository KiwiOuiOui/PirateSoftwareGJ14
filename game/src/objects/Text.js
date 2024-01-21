import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Node } from '../engine/Node.js';
import { Rectangle } from '../engine/maths/Rectangle';
import { Vector } from '../engine/maths/Vector';

export class Text extends Node {
    constructor(name, position, text, layer = 1) {
        super(name, position);

        this._txt = ServiceLocator.graphicManager.create("text", this, layer+1);
        this._txt.text = text;
        this._txt.color = "red";
        this._txt.size = 10;
    }
}