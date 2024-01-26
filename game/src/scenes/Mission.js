import { Scene } from '../engine/Scene.js';
import { Vector } from '../engine/maths/Vector.js';
import { Debug } from '../objects/Debug.js';
import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Button } from '../objects/Button';
import { Rectangle } from '../engine/maths/Rectangle';
import uiSpriteSrc from '/assets/uisprite.png';
import uiSplashArt from '/assets/145x160.png';
import { Node } from '../engine/Node';
import { Platform } from '../objects/Platform';
import { GroundFloor } from './GroundFloor';

export class Mission extends Scene {
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
        let borderright = new Platform("borderright", new Vector(155, 0), new Vector(10, h), 100) //9)
        bordersParent.addChild(borderright);
        let borderup = new Platform("borderup", new Vector(0, 0), new Vector(w, 10), 100) //9)
        bordersParent.addChild(borderup);
        let borderdown = new Platform("borderdown", new Vector(0, 170), new Vector(w, 10), 100) //9)
        bordersParent.addChild(borderdown);
        let borderrightATH = new Platform("borderrightATH", new Vector(310, 0), new Vector(10, h), 100) //9)
        bordersParent.addChild(borderrightATH);

        let sprite = new Image(320, 180);
        sprite.src = uiSpriteSrc;
        let splash = new Image(130,160);
        splash.src = uiSplashArt;

        //image mission
        let missionSplash = ServiceLocator.graphicManager.create("sprite", this.root, 2);
        missionSplash.image = splash;
        missionSplash.frame = new Rectangle(new Vector(0,0),new Vector(145,160));
        missionSplash.position = new Vector(10, 10);

        //go home
        let backBtn = new Button("backBtn", new Vector(165, 10), "")
        this.root.addChild(backBtn);

        backBtn.hitbox = new Rectangle(new Vector(0,0), new Vector(24,24));
        backBtn.onClick = () => {
            ServiceLocator.clockManager.addTimer(1).action = () => {
                ServiceLocator.context.canvas.style.cursor = "auto";
                ServiceLocator.game.changeScene(ServiceLocator.game._homeScene);
            };
        }

        let backGraphic = ServiceLocator.graphicManager.create("sprite", backBtn, 2);
        backGraphic.image = sprite
        backGraphic.frame = new Rectangle(new Vector(144,12),new Vector(24,24));
        backGraphic.position = new Vector(0, 0);

        //refresh mission
        let newMissionBtn = new Button("backBtn", new Vector(286, 10), "")
        this.root.addChild(newMissionBtn);

        newMissionBtn.hitbox = new Rectangle(new Vector(0,0), new Vector(24,24));
        newMissionBtn.onClick = () => {
            ServiceLocator.clockManager.addTimer(1).action = () => {
                ServiceLocator.context.canvas.style.cursor = "auto";
                ServiceLocator.game.changeScene(new Mission("mission"));
            };
        }
        
        let newMissionGraphic = ServiceLocator.graphicManager.create("sprite", newMissionBtn, 2);
        newMissionGraphic.image = sprite
        newMissionGraphic.frame = new Rectangle(new Vector(120,12),new Vector(24,24));
        newMissionGraphic.position = new Vector(0, 0);
        
        //mission infos
        let insurance = 2500+Math.floor(50*Math.random())*100
        let insuranceNode = new Node("ui right", new Vector(170,50));
        this.root.addChild(insuranceNode);
        let insuranceInfo = ServiceLocator.graphicManager.create("text", insuranceNode, 2);
        insuranceInfo.text = "INSURANCE COVERAGE :\n" + insurance + "$";
        insuranceInfo.color = "red";
        insuranceInfo.size = 10;

        let objToSaveNode = new Node("ui right", new Vector(170,80));
        this.root.addChild(objToSaveNode);
        let objToSaveInfo = ServiceLocator.graphicManager.create("text", objToSaveNode, 2);
        objToSaveInfo.text = "YOU NEED TO ESPECIALLY\nSAVE THOSE FURNITURES :\n X         X         X";
        objToSaveInfo.color = "red";
        objToSaveInfo.size = 10;


        //launch game
        let launchGameBtn = new Button("launchGameBtn", new Vector(180, 130), "")
        this.root.addChild(launchGameBtn);

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

        //settings
        let settingsBtn = new Button("settingsBtn", new Vector(267, 125), "")
        this.root.addChild(settingsBtn);

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
