import { Scene } from '../engine/Scene.js';
import { Vector } from '../engine/maths/Vector.js';
import { Debug } from '../objects/Debug.js';
import { Platform } from '../objects/Platform.js';
import { Player } from '../objects/Player.js';
import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Platform3D } from '../objects/Platform3D';
import { Stairs } from '../objects/Stairs';
import { SecondFloor } from './SecondFloor';
import { Couch } from '../objects/Couch';
import { WaterDamage } from '../objects/Water';
import { Button } from '../objects/Button';
import { Rectangle } from '../engine/maths/Rectangle';
import uiSpriteSrc from '/assets/uisprite.png';
import waterMapsData from '/assets/waterMaps.json';
import { Node } from '../engine/Node';
import { Sink } from '../objects/Sink';
import { FishTank } from '../objects/FishTank';
import { TV } from '../objects/TV';

const wallLayer = 2;

export class GroundFloor extends Scene {
    initialize() {
        ServiceLocator.error("init Scene ", this.name);

        //FPS indicator
        //let debug = new Debug("debug");
        //this.root.addChild(debug);

        let bg = ServiceLocator.graphicManager.create("rectangle", this.root, 0);
        bg.rectangle = new Rectangle(
            new Vector(10,10),
            new Vector(240, 160)
        );
        bg.fill = "#4f3f3d";
        bg.stroke = "transparent";

        let h = ServiceLocator.context.canvas.height/ServiceLocator.scale;
        let w = ServiceLocator.context.canvas.width/ServiceLocator.scale;

        //border of the game
        let bordersParent = new Node("borders", new Vector(0,0));
        this.root.addChild(bordersParent);

        let borderleft = new Platform("borderleft", new Vector(0, 0), new Vector(10, h), wallLayer) //9)
        bordersParent.addChild(borderleft);
        let borderright = new Platform("borderright", new Vector(250, 0), new Vector(10, h), wallLayer) //9)
        bordersParent.addChild(borderright);
        let borderup = new Platform("borderup", new Vector(0, 0), new Vector(w, 10), wallLayer) //9)
        bordersParent.addChild(borderup);
        let borderdown = new Platform("borderdown", new Vector(0, 170), new Vector(w, 10), wallLayer) //9)
        bordersParent.addChild(borderdown);
        let borderrightATH = new Platform("borderrightATH", new Vector(310, 0), new Vector(10, h), wallLayer) //9)
        bordersParent.addChild(borderrightATH);

        //game
        let gameParent = new Node("game node", new Vector(0,0));
        this.root.addChild(gameParent);

        //room 1
        let room1wall1 = new Platform("room1wall1", new Vector(0, 100), new Vector(80, 10), wallLayer) //9)
        gameParent.addChild(room1wall1);
        let room1wall2 = new Platform("room1wall2", new Vector(80, 100), new Vector(10, 20), wallLayer) //9)
        gameParent.addChild(room1wall2);
        let room1wall3 = new Platform("room1wall3", new Vector(80, 140), new Vector(10, 40), wallLayer) //9)
        gameParent.addChild(room1wall3);

        //room 2
        let room2wall1 = new Platform("room2wall1", new Vector(150, 100), new Vector(50, 10), wallLayer) //9)
        gameParent.addChild(room2wall1);
        let room2wall2 = new Platform("room2wall2", new Vector(150, 100), new Vector(10, 80), wallLayer) //9)
        gameParent.addChild(room2wall2);
        let room2wall3 = new Platform("room2wall3", new Vector(220, 100), new Vector(40, 10), wallLayer) //9)
        gameParent.addChild(room2wall3);
        let tv = new TV("TV on 1st floor", new Vector(170, 110), 3) //9)
        gameParent.addChild(tv);

        //room 3
        let room3wall1 = new Platform("room3wall1", new Vector(150, 70), new Vector(50, 10), wallLayer) //9)
        gameParent.addChild(room3wall1);
        let room3wall2 = new Platform("room3wall2", new Vector(150, 10), new Vector(10, 70), wallLayer) //9)
        gameParent.addChild(room3wall2);
        let room3wall3 = new Platform("room3wall3", new Vector(220, 70), new Vector(40, 10), wallLayer) //9)
        gameParent.addChild(room3wall3);
        let sink = new Sink("sink on 1st floor", new Vector(180, 10), 3) //9)
        gameParent.addChild(sink);


        let couch = new Couch("couch on 1st floor", new Vector(60, 10), 3) //9)
        gameParent.addChild(couch);
        let fishtank = new FishTank("FishTank on 1st floor", new Vector(120, 10), 3) //9)
        gameParent.addChild(fishtank);

        let stairs = new Stairs("stairs", new Vector(10, 10), new Vector(22, 36), 3) //9)
        let secondFloor = new SecondFloor("second floor");
        secondFloor.initialize(this);
        stairs.leadsTo(secondFloor);
        gameParent.addChild(stairs);

        let player = new Player("Victor");
        player.position = new Vector(50, 140);
        gameParent.addChild(player);

        this.waterDamage = new WaterDamage("water try", new Vector(10, 10), 1) //9)
        gameParent.addChild(this.waterDamage);
        this.waterDamage.parseData(waterMapsData[0]);

        //ui
        let ui = new Node("ui", new Vector(0,0));
        this.root.addChild(ui);
        let sprite = new Image(320, 180);
        sprite.src = uiSpriteSrc;

        let commandsNode = new Node("commandes hud");
        this.root.addChild(commandsNode);

        this.bucketSprite = commandsNode.spritea = ServiceLocator.graphicManager.create("sprite", commandsNode, 3);
        commandsNode.spritea.image = sprite
        commandsNode.spritea.frame = new Rectangle(new Vector(60, 0),new Vector(31, 31));
        commandsNode.spritea.position = new Vector(278, 12);
        commandsNode.spriteb = ServiceLocator.graphicManager.create("sprite", commandsNode, 2);
        commandsNode.spriteb.image = sprite
        commandsNode.spriteb.frame = new Rectangle(new Vector(192, 48),new Vector(31, 31));
        commandsNode.spriteb.position = new Vector(262, 27);


        let settingsBtn = new Button("settingsBtn", new Vector(267, 125), "")
        ui.addChild(settingsBtn);


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
