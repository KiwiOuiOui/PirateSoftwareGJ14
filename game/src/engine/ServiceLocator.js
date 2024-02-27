import { ClockManager } from './time/ClockManager.js';
import { EventManager } from './events/EventManager.js';
import { ComponentManager } from './components/ComponentManager.js';
import { GraphicManager } from './graphics/GraphicManager.js';
import { FPSCounter } from './time/FPSCounter.js';
import { GamePad } from './events/GamePad';

class ServiceLocator {
    constructor() {
        // float _gravity = 400;
        // FontManager * _fontManager;
        // TextureManager * _textureManager;
        // SceneManager * _sceneManager;
        this._game = null;
        this._running = null;
        this._clockManager = null;
        this._graphicManager = null;
        this._animationFrameCode = null;
        this._context = null;
        this._scale = 1;
        this._pause = null;
        this._debugMode = null;
        this._eventManager = null;
        this._componentManager = null;
        this._FPSCounter = null;
        console.log("search for gamepads", navigator.getGamepads())
        //TODO : les gamepad sont return lorsqu'il y a eu un input depuis le chargement de la page
        // on check toutes les X secondes si navigator.getGamepads retourne qqch 
        // si on connecte une nouvelle manette avec l'eventlistener 
        // ds les deux cas on ouvre la setting scene et on propose de remplacer la manette actuelle (si pas de manette actuelle go dans les settings pour bind)
        let defaultGamePad = navigator.getGamepads()[0];
        this._gamePad = defaultGamePad ? new GamePad(defaultGamePad, defaultGamePad.id) : null;
    }


    initialize(game) {
        this._game = game;
        this._running = true;
        this._pause = false;
        this._debug = 0;

        this._clockManager = new ClockManager();
        this._graphicManager = new GraphicManager();
        this._eventManager = new EventManager();
        this._eventManager.initialize()
        this._componentManager = new ComponentManager();
        this._FPSCounter = new FPSCounter();

        this.error("waiting for gamepad connection ");
        window.addEventListener("gamepadconnected", this.gamePadConnect);
        window.addEventListener("gamepaddisconnected", this.gamePadDisconnect);
    }

    get context() {
        return this._context;
    }
    get scale() {
        return this._scale;
    }
    set running(flag) {
        this._running = flag;
    }
    get running() {
        return this._running;
    }
    set debugMode(flag) {
        this._debugMode = flag;
    }
    get debugMode() {
        return this._debugMode;
    }
    get clockManager() {
        return this._clockManager;
    }
    get graphicManager() {
        return this._graphicManager;
    }
    get eventManager() {
        return this._eventManager;
    }
    get componentManager() {
        return this._componentManager;
    }
    get FPSCounter() {
        return this._FPSCounter;
    }

    set animationFrameCode(code) {
        this._animationFrameCode = code;
    }
    get animationFrameCode() {
        return this._animationFrameCode;
    }

    debug(...args) {
        if (this._debugMode >= 2) {
            console.debug(/*"frame #" + this._FPSCounter.frameNb, */...args);
        }
    }
    error(...args) {
        if (this._debugMode >= 1) {
            console.error("frame #" + this._FPSCounter.frameNb, ...args);
        }
    }
    breakpoint(){
        if (this._debugMode >= 1) {
            this._clockManager.pause();
            debugger;
            this._clockManager.resume();
        }
    }

    // static auto sceneManager() - > SceneManager * { return _instance._sceneManager; }
    // static auto fontManager() - > FontManager * { return _instance._fontManager; }
    // static auto textureManager() - > TextureManager * { return _instance._textureManager; }


    createCanvas(width = 640, height = 480, scale = 1) {
        let canvas = document.createElement('canvas');
        var body = document.getElementsByTagName("body")[0];

        this._scale = scale;

        canvas.id = "game";
        canvas.width = width * this._scale;
        canvas.height = height * this._scale;

        body.appendChild(canvas);
        this._context = canvas.getContext("2d");
        this._context.webkitImageSmoothingEnabled = false;
        this._context.mozImageSmoothingEnabled = false;
        this._context.imageSmoothingEnabled = false;
    }


    canvasClear(color = "black") {
        this._context.resetTransform();

        this._context.fillStyle = color;
        this._context.beginPath();
        this._context.rect(0, 0, this._context.canvas.width, this._context.canvas.height);
        this._context.fill();
    }


    // static auto windowDisplay() - > void { _instance._game - > getWindow() - > display(); }
    // static auto gravity() - > float { return _instance._gravity; }


    // static auto setClockManager(ClockManager * cm) - > void { _instance._clockManager = cm; }
    // static auto setFontManager(FontManager * fm) - > void { _instance._fontManager = fm; }
    // static auto setTextureManager(TextureManager * tm) - > void { _instance._textureManager = tm; }
    // static auto setSceneManager(SceneManager * sm) - > void { _instance._sceneManager = sm; }
    // static auto setComponentManager(ComponentManager * cm) - > void { _instance._componentManager = cm; }
    // static auto setColliderManager(ColliderManager * cm) - > void { _instance._colliderManager = cm; }
    // static auto setInputManager(InputManager * im) - > void { _instance._eventManager = im; }


    set game(game) {
        this._game = game;
    }
    get game() {
        return this._game;
    }
    set gamePad(gp) {
        this._gamePad = gp;
    }
    get gamePad() {
        return this._gamePad;
    }

    gamePadConnect(e) {
        console.log("gamePadConnect",e);
        this.gamePad = new GamePad(e.gamepad, e.gamepad.id);
    }
    gamePadDisconnect(e) {
        console.log("gamePadDisconnect",e);
        this.gamePad = null;
    }

};

let instance = new ServiceLocator();
export { instance as ServiceLocator };
