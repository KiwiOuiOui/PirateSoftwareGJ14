import { Scene } from '../engine/Scene.js';
import { Vector } from '../engine/maths/Vector.js';
import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Debug } from '../objects/Debug';
import { Platform } from '../objects/Platform';
import { Rectangle } from '../engine/maths/Rectangle';
import { InputBox } from '../objects/InputBox';
import { Button } from '../objects/Button';
import spriteSrc from '/assets/sprite.png';

export class Menu extends Scene {
    initialize() {
        let backBtn = new Button("backBtn", new Vector(10, 20), "< RETURN TO GAME")
        this.root.addChild(backBtn);

        backBtn.hitbox = new Rectangle(new Vector(0,0), new Vector(100, 10));
        backBtn.onClick = () => {
            ServiceLocator.clockManager.addTimer(200).action = () => {
                ServiceLocator.context.canvas.style.cursor = "auto";
                ServiceLocator.game.changeScene(this._lastScene);
            };
        }
        let bindtext = new Button("bindtext", new Vector(240, 20), "COMMANDS")
        this.root.addChild(bindtext);

        bindtext.hitbox = new Rectangle(new Vector(0,0), new Vector(50, 10));
        bindtext.onClick = () => {
        }

        let inputUp = new InputBox("upBindBtn", new Vector(68,54 - 15), ServiceLocator.game.commands.up.value)
        this.root.addChild(inputUp);
        inputUp.onInput = (v) => {
            ServiceLocator.game.commands.up = {
                code : v.code, 
                value : v.key.toUpperCase()
            };
            inputUp._txt.text = ServiceLocator.game.commands.up.value;
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
        }
        inputB.hitbox = new Rectangle(new Vector(12,-10), new Vector(16,16));

        inputA._button._onEnter = inputB._button._onEnter = inputLeft._button._onEnter = inputRight._button._onEnter = inputUp._button._onEnter = inputDown._button._onEnter = () => {
            ServiceLocator.context.canvas.style.cursor = "pointer";
        }

        // let rectGr = ServiceLocator.graphicManager.create("rectangle", this.root, 3);

        // rectGr.rectangle = new Rectangle(new Vector(54,136), new Vector(16,16));
        // rectGr.fill = "red";
        // rectGr.stroke = "transparent";


        let sprite = new Image(320, 180);
        sprite.src = spriteSrc;

        let DPadGraphic = ServiceLocator.graphicManager.create("animSprite", this.root, 2);
        DPadGraphic.image = sprite
        DPadGraphic.frame = new Rectangle(new Vector(192,0),new Vector(12*4,12*4));
        DPadGraphic.position = new Vector(50, 50);
        DPadGraphic.lastFrameNb = 5

        let buttonsGraphic = ServiceLocator.graphicManager.create("animSprite", this.root, 2);
        buttonsGraphic.image = sprite
        buttonsGraphic.frame = new Rectangle(new Vector(240,0),new Vector(12*4,12*3));
        buttonsGraphic.position = new Vector(50, 120);
        buttonsGraphic.lastFrameNb = 5


        this.initialized = true;
    }
}
