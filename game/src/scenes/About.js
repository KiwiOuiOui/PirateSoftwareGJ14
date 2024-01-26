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

        backBtn.sprite = ServiceLocator.graphicManager.create("sprite", backBtn, 2);
        backBtn.sprite.image = sprite
        backBtn.sprite.frame = new Rectangle(new Vector(144,12),new Vector(24,24));
        backBtn.sprite.position = new Vector(0, 0);

        let h = ServiceLocator.context.canvas.height/ServiceLocator.scale;
        let w = ServiceLocator.context.canvas.width/ServiceLocator.scale;

        //border of the game
        let bordersParent = new Node("borders", new Vector(0,0));
        this.root.addChild(bordersParent);
        let borderleft = new Platform("borderleft", new Vector(0, 0), new Vector(10, h), 3) //9)
        bordersParent.addChild(borderleft);
        let borderright = new Platform("borderright", new Vector(155, 0), new Vector(10, h), 3) //9)
        bordersParent.addChild(borderright);
        let borderup = new Platform("borderup", new Vector(0, 0), new Vector(w, 10), 3) //9)
        bordersParent.addChild(borderup);
        let borderdown = new Platform("borderdown", new Vector(0, 170), new Vector(w, 10), 3) //9)
        bordersParent.addChild(borderdown);
        let borderrightATH = new Platform("borderrightATH", new Vector(310, 0), new Vector(10, h), 3) //9)
        bordersParent.addChild(borderrightATH);

        //uileft
        let uileft = new Node("ui left", new Vector(0,0));
        this.root.addChild(uileft);

        //about title
        let aboutTitle = ServiceLocator.graphicManager.create("sprite", uileft, 0);
        aboutTitle.image = sprite;
        aboutTitle.frame = new Rectangle(new Vector(240,96),new Vector(48,12));
        aboutTitle.position = new Vector(70, 20);

        let aboutTextNode = new Node("aboutTextNode", new Vector(14,52));
        uileft.addChild(aboutTextNode);
        let aboutTextComp = ServiceLocator.graphicManager.create("text", aboutTextNode, 2);
        aboutTextComp.text = "This game was made in 14 days during \nthe 14th PirateSoftware Game Jam \naround the theme \"This is Spreading\".\n\n\nYou are somewhere between \na firefighter and a plumber, you have  \nto blot the floor quickly to save \nfurnitures, then find the cause of \nthis disaster.\n\nYou might need to go to the setting \npage to setup your key binds for now... \n\n\nTHANKS FOR PLAYING, HAVE FUN!!".toUpperCase();
        aboutTextComp.color = "#c2303a";
        aboutTextComp.size = 6;

        //uiright
        let uiright = new Node("ui right", new Vector(0,0));
        this.root.addChild(uiright);

        //credit title
        let creditTitle = ServiceLocator.graphicManager.create("sprite", uiright, 0);
        creditTitle.image = sprite;
        creditTitle.frame = new Rectangle(new Vector(240,108),new Vector(64,12));
        creditTitle.position = new Vector(200, 20);

        let asepritePicto = ServiceLocator.graphicManager.create("sprite", uiright, 0);
        asepritePicto.image = sprite;
        asepritePicto.frame = new Rectangle(new Vector(108,36),new Vector(36, 36));
        asepritePicto.position = new Vector(170, 45);

        let asepriteTextNode = new Node("asepriteTextNode", new Vector(210,52));
        uiright.addChild(asepriteTextNode);
        let asepriteTextComp = ServiceLocator.graphicManager.create("text", asepriteTextNode, 2);
        asepriteTextComp.text = "as im learning pixel art,\nAseprite was a great \nsoftware to use, try it.".toUpperCase();
        asepriteTextComp.color = "#c2303a";
        asepriteTextComp.size = 6;

        let deepnightPicto = ServiceLocator.graphicManager.create("sprite", uiright, 0);
        deepnightPicto.image = sprite;
        deepnightPicto.frame = new Rectangle(new Vector(108,72),new Vector(36, 36));
        deepnightPicto.position = new Vector(170, 85);

        let deepnightTextNode = new Node("deepnightTextNode", new Vector(210,88));
        uiright.addChild(deepnightTextNode);
        let deepnightTextComp = ServiceLocator.graphicManager.create("text", deepnightTextNode, 2);
        deepnightTextComp.text = "i learned to make games\nthanks to Sebastien\n'Deepnight' BENARD,\ngo check out his work!".toUpperCase();
        deepnightTextComp.color = "#c2303a";
        deepnightTextComp.size = 6;

        let friendshipPicto = ServiceLocator.graphicManager.create("sprite", uiright, 0);
        friendshipPicto.image = sprite;
        friendshipPicto.frame = new Rectangle(new Vector(108,108),new Vector(36, 36));
        friendshipPicto.position = new Vector(170, 125);

        let friendshipTextNode = new Node("friendshipTextNode", new Vector(210,128));
        uiright.addChild(friendshipTextNode);
        let friendshipTextComp = ServiceLocator.graphicManager.create("text", friendshipTextNode, 2);
        friendshipTextComp.text = "Special thanks to my friends \nwho tested this game when \nit wa sabsolutely\nunplayable.".toUpperCase();
        friendshipTextComp.color = "#c2303a";
        friendshipTextComp.size = 6;

        this.initialized = true;
    }

    enable() {
        super.enable();
        ServiceLocator.graphicManager.changePalette('ice');
    }
}
