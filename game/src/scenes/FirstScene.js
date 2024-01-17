import { Scene } from '../engine/Scene.js';
import { Vector } from '../engine/maths/Vector.js';
import { Debug } from '../objects/Debug.js';
import { Platform } from '../objects/Platform.js';
import { Wind } from '../objects/Wind.js';
//import { Player } from '../objects/Player.js';
import { Player } from '../objects/Player.js';
import { ServiceLocator } from '../engine/ServiceLocator.js';

export class FirstScene extends Scene {
    initialize() {
        ServiceLocator.graphicManager.changePalette('ice');

        //let debug = new Debug("debug");
        //this.root.addChild(debug);

        let h = ServiceLocator.context.canvas.height;
        let w = ServiceLocator.context.canvas.width;

        let platform = new Platform("platform", new Vector(60, 40), new Vector(40, 40), -1) //9)
        this.root.addChild(platform);


        let player = new Player("Victor");
        player.position = new Vector(50, 140);
        this.root.addChild(player);
    }
}
