import { Scene } from '../engine/Scene.js';
import { Vector } from '../engine/maths/Vector.js';
import { Debug } from '../objects/Debug.js';
import { Platform } from '../objects/Platform.js';
import { Wind } from '../objects/Wind.js';
//import { Player } from '../objects/Player.js';
import { Ball } from '../objects/Ball.js';
import { ServiceLocator } from '../engine/ServiceLocator.js';

export class FirstScene extends Scene {
    initialize() {
        ServiceLocator.graphicManager.changePalette('ice');

        let debug = new Debug("debug");
        //let player = new Player("player");
        let h = ServiceLocator.context.canvas.height / ServiceLocator.scale;
        let w = ServiceLocator.context.canvas.width / ServiceLocator.scale;
        let b = 10;

        let platform = new Platform("platform", new Vector(0, b), new Vector(w, b), -1) //9)
        let platform2 = new Platform("platform2", new Vector(0, h - 2 * b), new Vector(w, b))
        let platform3 = new Platform("platform3", new Vector(w - 2 * b, 0), new Vector(b, h), -1) //9)
        let platform4 = new Platform("platform4", new Vector(b, 0), new Vector(b, h), -1) //9)
        let platform5 = new Platform("platform5", new Vector((w - h / 2) / 2, (h - b) / 2), new Vector(h / 2, b), -1) //9)

        this.root.addChild(platform);
        this.root.addChild(platform2);
        this.root.addChild(platform3);
        this.root.addChild(platform4);
        this.root.addChild(platform5);


        let wind = new Wind("wind", new Vector(200, b*2), new Vector(50, 50));
        wind.color = "blue";
        this.root.addChild(wind);


        let statball = new Ball("StatBall",
            new Vector(50, 140), 15
        );
        this.root.addChild(statball);

        let ball = new Ball("MovBall",
            new Vector(50, 50), 15
        );
        //ball.velocity = new Vector(100, 25);
        this.root.addChild(ball);


        //this.root.addChild(player);
        this.root.addChild(debug);
    }
}
