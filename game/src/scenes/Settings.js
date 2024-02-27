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
import { Node } from '../engine/Node';
import { PauseKeyComponent } from '../components/PauseKeyComponent';

export class Settings extends Scene {
    constructor(name)
    {
        super(name);
    }

    initialize() {
        ServiceLocator.error("init Scene ", this.name);

        //TODO : faire un switch pour controller 2 etats de binds en fonction de si on choissix de jouer au clavier ou a la manette
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

        //controls title
        let controlsTitle = ServiceLocator.graphicManager.create("sprite", this.root, 0);
        controlsTitle.image = sprite;
        controlsTitle.frame = new Rectangle(new Vector(240,120),new Vector(72,12));
        controlsTitle.position = new Vector(50, 20);
        
        //dpad
        let dpad = new Node("dpad", new Vector(8,0));
        this.root.addChild(dpad);
        
        let inputUp = new InputBox("upBindBtn", new Vector(68,54 - 15), ServiceLocator.game.commands.up.value)
        dpad.addChild(inputUp);
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
        dpad.addChild(inputLeft);
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
        dpad.addChild(inputRight);
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
        dpad.addChild(inputDown);
        inputDown.onInput = (v) => {
            ServiceLocator.game.commands.down = {
                code : v.code, 
                value : v.key.toUpperCase()
            };
            inputDown._txt.text = ServiceLocator.game.commands.down.value;
            this.savePrefsInCookies()
        }
        inputDown.hitbox = new Rectangle(new Vector(0,-20), new Vector(12,14));
        
        let DPadGraphic = ServiceLocator.graphicManager.create("sprite", dpad, 2);
        DPadGraphic.image = sprite
        DPadGraphic.frame = new Rectangle(new Vector(192,0),new Vector(12*4,12*4));
        DPadGraphic.position = new Vector(50, 50);

        //abButtons
        let abButtons = new Node("dabButtonspad", new Vector(10,0));
        this.root.addChild(abButtons);
        
        let inputA = new InputBox("downBindBtn", new Vector(77 + 20,124 - 5), ServiceLocator.game.commands.a.value)
        abButtons.addChild(inputA);
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
        abButtons.addChild(inputB);
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

        let buttonsGraphic = ServiceLocator.graphicManager.create("sprite", abButtons, 2);
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

    enable() {
        super.enable();
    }

    disable() {
        super.disable();
    }
}
