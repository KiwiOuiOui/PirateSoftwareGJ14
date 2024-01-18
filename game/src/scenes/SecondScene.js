import { Scene } from '../engine/Scene.js';
import { Vector } from '../engine/maths/Vector.js';
import { Debug } from '../objects/Debug.js';
import { Platform } from '../objects/Platform.js';
import { Wind } from '../objects/Wind.js';
import { Player } from '../objects/Player.js';
import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Platform3D } from '../objects/Platform3D';
import { Stairs } from '../objects/Stairs';

export class SecondScene extends Scene {
    initialize(lastScene) {
        ServiceLocator.error("init Scene ", this.name);

        //FPS indicator
        //let debug = new Debug("debug");
        //this.root.addChild(debug);

        let h = ServiceLocator.context.canvas.height;
        let w = ServiceLocator.context.canvas.width;

        //border of the game
        let borderleft = new Platform("borderleft", new Vector(0, 0), new Vector(10, h), 100) //9)
        this.root.addChild(borderleft);
        let borderright = new Platform("borderright", new Vector(250, 0), new Vector(10, h), 100) //9)
        this.root.addChild(borderright);
        let borderup = new Platform("borderup", new Vector(0, 0), new Vector(w, 10), 100) //9)
        this.root.addChild(borderup);
        let borderdown = new Platform("borderdown", new Vector(0, 170), new Vector(w, 10), 100) //9)
        this.root.addChild(borderdown);
        let borderrightATH = new Platform("borderrightATH", new Vector(310, 0), new Vector(10, h), 100) //9)
        this.root.addChild(borderrightATH);


        let platform = new Platform3D("platform 2nd floor", new Vector(80, 60), new Vector(10, 10), -1) //9)
        this.root.addChild(platform);
        let stairs = new Stairs("stairs", new Vector(200, 60), new Vector(20, 40), -1) //9)
        stairs.leadsTo(lastScene);
        this.root.addChild(stairs);

        this.initialized = true;
    }

    enable() {
        super.enable();
        ServiceLocator.graphicManager.changePalette('icecream');
    }
}
