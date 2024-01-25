import { Scene } from '../engine/Scene.js';
import { Vector } from '../engine/maths/Vector.js';
import { Debug } from '../objects/Debug.js';
import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Button } from '../objects/Button';
import { Rectangle } from '../engine/maths/Rectangle';
import uiSpriteSrc from '/assets/uisprite.png';
import { Node } from '../engine/Node';
import { Platform } from '../objects/Platform';
import { GroundFloor } from './GroundFloor';

export class Home extends Scene {
    initialize() {
        ServiceLocator.error("init Scene ", this.name);

        //FPS indicator
        //let debug = new Debug("debug");
        //this.root.addChild(debug);

        let h = ServiceLocator.context.canvas.height/ServiceLocator.scale;
        let w = ServiceLocator.context.canvas.width/ServiceLocator.scale;

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

        //uileft
        let uileft = new Node("ui left", new Vector(0,0));
        this.root.addChild(uileft);

        let launchGameBtn = new Button("launchGameBtn", new Vector(94, 78), "")
        uileft.addChild(launchGameBtn);

        let sprite = new Image(320, 180);
        sprite.src = uiSpriteSrc;

        launchGameBtn.sprite = ServiceLocator.graphicManager.create("sprite", launchGameBtn, 2);
        launchGameBtn.sprite.image = sprite
        launchGameBtn.sprite.frame = new Rectangle(new Vector(240, 72),new Vector(72,24));

        launchGameBtn.hitbox = new Rectangle(new Vector(0,0), new Vector(72,24));
        
        launchGameBtn.onClick = () => {
            ServiceLocator.clockManager.addTimer(1).action = () => {
                ServiceLocator.context.canvas.style.cursor = "auto";
                ServiceLocator.game.changeScene(new GroundFloor("first floor"));
            };
        }

        //uiright
        let uiright = new Node("ui right", new Vector(0,0));
        this.root.addChild(uiright);

        let aboutBtn = new Button("aboutBtn", new Vector(263, 35), "")
        uiright.addChild(aboutBtn);

        aboutBtn.sprite = ServiceLocator.graphicManager.create("sprite", aboutBtn, 2);
        aboutBtn.sprite.image = sprite
        aboutBtn.sprite.frame = new Rectangle(new Vector(240,96),new Vector(48,12));

        aboutBtn.hitbox = new Rectangle(new Vector(-3,0), new Vector(48,12));
        
        aboutBtn.onClick = () => {
            ServiceLocator.clockManager.addTimer(1).action = () => {
                ServiceLocator.context.canvas.style.cursor = "auto";
                ServiceLocator.game.changeScene(ServiceLocator.game._aboutScene);
            };
        }

        let settingsBtn = new Button("settingsBtn", new Vector(267, 125), "")
        uiright.addChild(settingsBtn);

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
        ServiceLocator.graphicManager.changePalette('ice');
    }
}
