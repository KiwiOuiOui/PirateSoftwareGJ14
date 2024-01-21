import { Scene } from '../engine/Scene.js';
import { Vector } from '../engine/maths/Vector.js';
import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Debug } from '../objects/Debug';
import { Platform } from '../objects/Platform';
import { Rectangle } from '../engine/maths/Rectangle';
import { InputBox } from '../objects/InputBox';
import { Button } from '../objects/Button';

export class Menu extends Scene {
    initialize() {
        let backBtn = new Button("backBtn", new Vector(10, 20), "< RETURN TO GAME")
        this.root.addChild(backBtn);

        backBtn.hitbox = new Rectangle(new Vector(0,0), new Vector(50, 10));
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
            ServiceLocator.clockManager.addTimer(200).action = () => {
                ServiceLocator.context.canvas.style.cursor = "auto";
                ServiceLocator.game.changeScene(this._lastScene);
            };
        }

        let inputUp = new InputBox("upBindBtn", new Vector(230, 40), "Go UP : "+ ServiceLocator.game.commands.up.value)
        this.root.addChild(inputUp);
        inputUp.onInput = (v) => {
            ServiceLocator.game.commands.up = {
                code : v.code, 
                value : v.key.toUpperCase()
            };
            inputUp._txt.text = "Go UP : "+ ServiceLocator.game.commands.up.value;
        }
        inputUp.hitbox = new Rectangle(new Vector(0,0), new Vector(48, 10));

        let inputLeft = new InputBox("leftBindBtn", new Vector(230, 55), "Go LEFT : "+ ServiceLocator.game.commands.left.value)
        this.root.addChild(inputLeft);
        inputLeft.onInput = (v) => {
            ServiceLocator.game.commands.left = {
                code : v.code, 
                value : v.key.toUpperCase()
            };
            inputLeft._txt.text = "Go LEFT : "+ ServiceLocator.game.commands.left.value;
        }
        inputLeft.hitbox = new Rectangle(new Vector(0,0), new Vector(57, 10));

        let inputRight = new InputBox("rightBindBtn", new Vector(230, 70), "Go RIGHT : "+ ServiceLocator.game.commands.right.value)
        this.root.addChild(inputRight);
        inputRight.onInput = (v) => {
            ServiceLocator.game.commands.right = {
                code : v.code, 
                value : v.key.toUpperCase()
            };
            inputRight._txt.text = "Go RIGHT : "+ ServiceLocator.game.commands.right.value;
        }
        inputRight.hitbox = new Rectangle(new Vector(0,0), new Vector(64, 10));

        let inputDown = new InputBox("downBindBtn", new Vector(230, 85), "Go DOWN : "+ ServiceLocator.game.commands.down.value)
        this.root.addChild(inputDown);
        inputDown.onInput = (v) => {
            ServiceLocator.game.commands.down = {
                code : v.code, 
                value : v.key.toUpperCase()
            };
            inputDown._txt.text = "Go DOWN : "+ ServiceLocator.game.commands.down.value;
        }
        inputDown.hitbox = new Rectangle(new Vector(0,0), new Vector(64, 10));


        this.initialized = true;
    }
}
