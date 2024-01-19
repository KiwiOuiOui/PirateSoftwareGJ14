import { Scene } from '../engine/Scene.js';
import { Vector } from '../engine/maths/Vector.js';
import { Debug } from '../objects/Debug.js';
import { Platform } from '../objects/Platform.js';
import { Player } from '../objects/Player.js';
import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Platform3D } from '../objects/Platform3D';
import { Stairs } from '../objects/Stairs';
import { SecondScene } from './SecondScene';
import { Couch } from '../objects/Couch';

export class FirstScene extends Scene {
    initialize() {
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


        let couch = new Couch("couch on 1st floor", new Vector(120, 40), -1) //9)
        this.root.addChild(couch);

        let stairs = new Stairs("stairs", new Vector(10, 10), new Vector(22, 36), -1) //9)
        let secondFloor = new SecondScene("second floor");
        secondFloor.initialize(this);
        stairs.leadsTo(secondFloor);
        this.root.addChild(stairs);

        let player = new Player("Victor");
        player.position = new Vector(50, 140);
        this.root.addChild(player);

        this.initialized = true;
    }

    enable() {
        super.enable();
        ServiceLocator.graphicManager.changePalette('ice');
    }
}
