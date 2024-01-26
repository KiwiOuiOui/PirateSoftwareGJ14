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

export class About extends Scene {
    initialize() {
        ServiceLocator.error("init Scene ", this.name);

        let backBtn = new Button("backBtn", new Vector(10, 10), "")
        this.root.addChild(backBtn);

        backBtn.hitbox = new Rectangle(new Vector(0,0), new Vector(24,24));
        backBtn.onClick = () => {
            ServiceLocator.clockManager.addTimer(1).action = () => {
                ServiceLocator.context.canvas.style.cursor = "auto";
                ServiceLocator.game.changeScene(this._lastScene);
            };
        }
        
        let sprite = new Image(320, 180);
        sprite.src = uiSpriteSrc;

        let backGraphic = ServiceLocator.graphicManager.create("sprite", backBtn, 2);
        backGraphic.image = sprite
        backGraphic.frame = new Rectangle(new Vector(144,12),new Vector(24,24));
        backGraphic.position = new Vector(0, 0);

        let h = ServiceLocator.context.canvas.height/ServiceLocator.scale;
        let w = ServiceLocator.context.canvas.width/ServiceLocator.scale;

        //border of the game
        let bordersParent = new Node("borders", new Vector(0,0));
        this.root.addChild(bordersParent);
        let borderleft = new Platform("borderleft", new Vector(0, 0), new Vector(10, h), 100) //9)
        bordersParent.addChild(borderleft);
        let borderup = new Platform("borderup", new Vector(0, 0), new Vector(w, 10), 100) //9)
        bordersParent.addChild(borderup);
        let borderdown = new Platform("borderdown", new Vector(0, 170), new Vector(w, 10), 100) //9)
        bordersParent.addChild(borderdown);
        let borderrightATH = new Platform("borderrightATH", new Vector(310, 0), new Vector(10, h), 100) //9)
        bordersParent.addChild(borderrightATH);

        //uileft
        let ui = new Node("ui", new Vector(0,0));

        this.initialized = true;
    }

    enable() {
        super.enable();
        ServiceLocator.graphicManager.changePalette('ice');
    }
}
