import { Scene } from '../engine/Scene.js';
import { Vector } from '../engine/maths/Vector.js';
import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Debug } from '../objects/Debug';
import { Platform } from '../objects/Platform';
import { Rectangle } from '../engine/maths/Rectangle';
import { InputBox } from '../objects/InputBox';
import { Button } from '../objects/Button';
import uiSpriteSrc from '/assets/uisprite.png';
import * as Cookies from '../engine/utils/Cookies';

export class Settings extends Scene {
    initialize() {
        ServiceLocator.error("init Scene ", this.name);

        let sprite = new Image(320, 180);
        sprite.src = uiSpriteSrc;

        //back to game
        let backBtn = new Button("backBtn", new Vector(10, 10), "")
        this.root.addChild(backBtn);

        backBtn.hitbox = new Rectangle(new Vector(0,0), new Vector(24,24));
        backBtn.onClick = () => {
            ServiceLocator.clockManager.addTimer(1).action = () => {
                ServiceLocator.context.canvas.style.cursor = "auto";
                ServiceLocator.game.changeScene(this._lastScene);
            };
        }
        
        backBtn.sprite = ServiceLocator.graphicManager.create("sprite", backBtn, 2);
        backBtn.sprite.image = sprite
        backBtn.sprite.frame = new Rectangle(new Vector(168,12),new Vector(24,24));
        backBtn.sprite.position = new Vector(0, 0);

        let inputUp = new InputBox("upBindBtn", new Vector(68,54 - 15), ServiceLocator.game.commands.up.value)
        this.root.addChild(inputUp);
        inputUp.onInput = (v) => {
            ServiceLocator.game.commands.up = {
                code : v.code, 
                value : v.key.toUpperCase()
            };
            inputUp._txt.text = ServiceLocator.game.commands.up.value;
            this.savePrefsInCookies()
        }
        inputUp.hitbox = new Rectangle(new Vector(0,15), new Vector(48, 10));

        let inputLeft = new InputBox("leftBindBtn", new Vector(55 - 15,68),ServiceLocator.game.commands.left.value)
        this.root.addChild(inputLeft);
        inputLeft.onInput = (v) => {
            ServiceLocator.game.commands.left = {
                code : v.code, 
                value : v.key.toUpperCase()
            };
            inputLeft._txt.text = ServiceLocator.game.commands.left.value;
            this.savePrefsInCookies()
        }
        inputLeft.hitbox = new Rectangle(new Vector(15,0), new Vector(12,14));

        let inputRight = new InputBox("rightBindBtn", new Vector(80 + 20,68), ServiceLocator.game.commands.right.value)
        this.root.addChild(inputRight);
        inputRight.onInput = (v) => {
            ServiceLocator.game.commands.right = {
                code : v.code, 
                value : v.key.toUpperCase()
            };
            inputRight._txt.text = ServiceLocator.game.commands.right.value;
            this.savePrefsInCookies()
        }
        inputRight.hitbox = new Rectangle(new Vector(-20,0), new Vector(13, 13));

        let inputDown = new InputBox("downBindBtn", new Vector(68, 81 + 20), ServiceLocator.game.commands.down.value)
        this.root.addChild(inputDown);
        inputDown.onInput = (v) => {
            ServiceLocator.game.commands.down = {
                code : v.code, 
                value : v.key.toUpperCase()
            };
            inputDown._txt.text = ServiceLocator.game.commands.down.value;
            this.savePrefsInCookies()
        }
        inputDown.hitbox = new Rectangle(new Vector(0,-20), new Vector(12,14));

        let inputA = new InputBox("downBindBtn", new Vector(77 + 20,124 - 5), ServiceLocator.game.commands.a.value)
        this.root.addChild(inputA);
        inputA.onInput = (v) => {
            ServiceLocator.game.commands.a = {
                code : v.code, 
                value : v.key.toUpperCase()
            };
            inputA._txt.text = ServiceLocator.game.commands.a.value;
            this.savePrefsInCookies()
        }
        inputA.hitbox = new Rectangle(new Vector(-20,5), new Vector(16,16));

        let inputB = new InputBox("downBindBtn", new Vector(54 - 12,136 + 10), ServiceLocator.game.commands.b.value)
        this.root.addChild(inputB);
        inputB.onInput = (v) => {
            ServiceLocator.game.commands.b = {
                code : v.code, 
                value : v.key.toUpperCase()
            };
            inputB._txt.text = ServiceLocator.game.commands.b.value;
            this.savePrefsInCookies()
        }
        inputB.hitbox = new Rectangle(new Vector(12,-10), new Vector(16,16));

        inputA._button._onEnter = inputB._button._onEnter = inputLeft._button._onEnter = inputRight._button._onEnter = inputUp._button._onEnter = inputDown._button._onEnter = () => {
            ServiceLocator.context.canvas.style.cursor = "pointer";
        }

        // let rectGr = ServiceLocator.graphicManager.create("rectangle", this.root, 3);

        // rectGr.rectangle = new Rectangle(new Vector(54,136), new Vector(16,16));
        // rectGr.fill = "red";
        // rectGr.stroke = "transparent";


        let DPadGraphic = ServiceLocator.graphicManager.create("sprite", this.root, 2);
        DPadGraphic.image = sprite
        DPadGraphic.frame = new Rectangle(new Vector(192,0),new Vector(12*4,12*4));
        DPadGraphic.position = new Vector(50, 50);

        let buttonsGraphic = ServiceLocator.graphicManager.create("sprite", this.root, 2);
        buttonsGraphic.image = sprite
        buttonsGraphic.frame = new Rectangle(new Vector(240,0),new Vector(12*4,12*3));
        buttonsGraphic.position = new Vector(50, 120);


        this.initialized = true;
    }

    savePrefsInCookies(){
        //Cookies.set("WDSoptions", value, Date.now());
        let date = new Date(Date.now())
        date.setDate(date.getDate() + 2);
        Cookies.set("WDSoptions", JSON.stringify(ServiceLocator.game.commands), date);
    }
}
