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
import { Water } from '../objects/Water';
import { Button } from '../objects/Button';
import { Rectangle } from '../engine/maths/Rectangle';
import spriteSrc from '/assets/sprite.png';

export class FirstScene extends Scene {
    initialize() {
        ServiceLocator.error("init Scene ", this.name);

        //FPS indicator
        //let debug = new Debug("debug");
        //this.root.addChild(debug);

        let h = ServiceLocator.context.canvas.height/ServiceLocator.scale;
        let w = ServiceLocator.context.canvas.width/ServiceLocator.scale;

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
        let water = new Water("water try", new Vector(120, 100), -1) //9)
        this.root.addChild(water);

        let stairs = new Stairs("stairs", new Vector(10, 10), new Vector(22, 36), -1) //9)
        let secondFloor = new SecondScene("second floor");
        secondFloor.initialize(this);
        stairs.leadsTo(secondFloor);
        this.root.addChild(stairs);

        let player = new Player("Victor");
        player.position = new Vector(50, 140);
        this.root.addChild(player);



        let settingsBtn = new Button("bindsBtn", new Vector(267, 125), "")
        this.root.addChild(settingsBtn);

        let sprite = new Image(320, 180);
        sprite.src = spriteSrc;

        settingsBtn.sprite = ServiceLocator.graphicManager.create("sprite", settingsBtn, 2);
        settingsBtn.sprite.image = sprite
        settingsBtn.sprite.frame = new Rectangle(new Vector(240,36),new Vector(12*3,12*3));

        settingsBtn.hitbox = new Rectangle(new Vector(0,0), new Vector(12*3,12*3));
        settingsBtn.onClick = () => {
            ServiceLocator.clockManager.addTimer(200).action = () => {
                ServiceLocator.context.canvas.style.cursor = "auto";
                ServiceLocator.game.changeScene(ServiceLocator.game._settingsScene);
            };
        }

        this.initialized = true;
    }

    enable() {
        super.enable();
        ServiceLocator.graphicManager.changePalette('ice');
    }
}
