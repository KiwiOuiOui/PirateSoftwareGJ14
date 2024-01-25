import { Scene } from '../engine/Scene.js';
import { Vector } from '../engine/maths/Vector.js';
import { Debug } from '../objects/Debug.js';
import { Platform } from '../objects/Platform.js';
import { Player } from '../objects/Player.js';
import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Platform3D } from '../objects/Platform3D';
import { Stairs } from '../objects/Stairs';
import { Node } from '../engine/Node';
import { Button } from '../objects/Button';
import uiSpriteSrc from '/assets/uisprite.png';
import { Rectangle } from '../engine/maths/Rectangle';

export class SecondFloor extends Scene {
    initialize(lastScene) {
        ServiceLocator.error("init Scene ", this.name);

        //FPS indicator
        //let debug = new Debug("debug");
        //this.root.addChild(debug);

        let h = ServiceLocator.context.canvas.height;
        let w = ServiceLocator.context.canvas.width;

        //border of the game
        let bordersParent = new Node("borders", new Vector(0,0));
        this.root.addChild(bordersParent);

        let borderleft = new Platform("borderleft", new Vector(0, 0), new Vector(10, h), 100) //9)
        bordersParent.addChild(borderleft);
        let borderright = new Platform("borderright", new Vector(250, 0), new Vector(10, h), 100) //9)
        bordersParent.addChild(borderright);
        let borderup = new Platform("borderup", new Vector(0, 0), new Vector(w, 10), 100) //9)
        bordersParent.addChild(borderup);
        let borderdown = new Platform("borderdown", new Vector(0, 170), new Vector(w, 10), 100) //9)
        bordersParent.addChild(borderdown);
        let borderrightATH = new Platform("borderrightATH", new Vector(310, 0), new Vector(10, h), 100) //9)
        bordersParent.addChild(borderrightATH);

        //game
        let gameParent = new Node("game node", new Vector(0,0));
        this.root.addChild(gameParent);

        let platform = new Platform3D("platform 2nd floor", new Vector(80, 60), new Vector(10, 10), -1) //9)
        gameParent.addChild(platform);
        let stairs = new Stairs("stairs", new Vector(10, 10), new Vector(22, 36), -1) //9)
        stairs.leadsTo(lastScene);
        gameParent.addChild(stairs);
        
        //ui
        let ui = new Node("ui", new Vector(0,0));
        this.root.addChild(ui);

        let settingsBtn = new Button("bindsBtn", new Vector(267, 125), "")
        ui.addChild(settingsBtn);

        let sprite = new Image(320, 180);
        sprite.src = uiSpriteSrc;

        settingsBtn.sprite = ServiceLocator.graphicManager.create("sprite", settingsBtn, 2);
        settingsBtn.sprite.image = sprite
        settingsBtn.sprite.frame = new Rectangle(new Vector(240,36),new Vector(12*3,12*3));

        settingsBtn.hitbox = new Rectangle(new Vector(0,0), new Vector(12*3,12*3));
        
        settingsBtn.onClick = () => {
            ServiceLocator.clockManager.addTimer(1).action = () => {
                ServiceLocator.context.canvas.style.cursor = "auto";
                ServiceLocator.game.changeScene(ServiceLocator.game._settingsScene);
            };
        }

        this.initialized = true;
    }

    enable() {
        super.enable();
        ServiceLocator.graphicManager.changePalette('icecream');
    }
}
