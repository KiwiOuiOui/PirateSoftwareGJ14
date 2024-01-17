import { Scene } from '../engine/Scene.js';
import { Vector } from '../engine/maths/Vector.js';
import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Debug } from '../objects/Debug';
import { Platform } from '../objects/Platform';
import { Ball } from '../objects/Ball';

export class Menu extends Scene {
    initialize() {
        let debug = new Debug("debug");
        //let player = new Player("player");
        let h = ServiceLocator.context.canvas.height / ServiceLocator.scale;
        let w = ServiceLocator.context.canvas.width / ServiceLocator.scale;
        let b = 10;

        let startBtn = new Platform("platform", new Vector(0, b), new Vector(w, b), -1) //9)

        h = w = 10;
        //player.move(new Vector(h - 50, 150))

        for (var i = 0; i < 1; i++) {
            let r = Math.random() * 5 + 2;

            let star = new Ball("Star" + i,
                new Vector(Math.random() * h + 2 * b + r, Math.random() * h + 2 * b + r), r
            );

            star.velocity = new Vector(
                Math.random() * 200 - 100,
                Math.random() * 200 - 100
            );
            star.move(new Vector(100, 100))

            this.root.addChild(star);
        }

        this.root.addChild(startBtn);

        //this.root.addChild(player);
        this.root.addChild(debug);
    }
}
