import { ServiceLocator } from './ServiceLocator.js';
import { FirstScene } from '../scenes/FirstScene.js';
import { Menu } from '../scenes/menu';

export class Game {
	constructor() {
		this._scene = null;
		this._settingsScene = null;
		this.commands = {
			up : {
                code : 'KeyW', 
                value : 'W'
            },
			down : {
                code : 'KeyS', 
                value : 'S'
            },
			left : {
                code : 'KeyA', 
                value : 'A'
            },
			right : {
                code : 'KeyD', 
                value : 'D'
            },
			a : {
                code : 'KeyO', 
                value : 'O'
            },
			b : {
                code : 'KeyK', 
                value : 'K'
            }
		};
	}
	
	
	initialize() {
		ServiceLocator.createCanvas(320, 180, 2);
		ServiceLocator.initialize(this);
		ServiceLocator.debugMode = 1;
		
		this._settingsScene = new Menu("menu");

		this.changeScene(new FirstScene("first floor"));
	}
	
	
	run() {
		ServiceLocator.animationFrameCode = window.requestAnimationFrame((timestamp) => {
			ServiceLocator.clockManager.update();
			ServiceLocator.FPSCounter.update();
			ServiceLocator.clockManager.fireTimers();
			ServiceLocator.eventManager.process();
			
			this.loop(timestamp);
			ServiceLocator.clockManager.resume();
		});
	}
	
	
	loop(time) {
		if (ServiceLocator.running == false) {
			return;
		}
		
		if (ServiceLocator.clockManager.running) {
			//DRAW
			ServiceLocator.canvasClear("#1c0d18");
			ServiceLocator.graphicManager.draw(ServiceLocator.context);
			//ServiceLocator.graphicManager.applyShaders(ServiceLocator.context);
			ServiceLocator.debug("Frame #" + ServiceLocator._FPSCounter.frameNb);
		}
		ServiceLocator.clockManager.update();
		//ServiceLocator.FPSCounter.update(); //now in drawing because it counted updates not frames
		ServiceLocator.clockManager.fireTimers();
		ServiceLocator.eventManager.process();
		
		if (ServiceLocator.clockManager.running) {
			this._scene.updateNodes();
			ServiceLocator.componentManager.update();
		}
		
		ServiceLocator.animationFrameCode = window.requestAnimationFrame((timestamp) => this.loop(timestamp));
	}
	
	changeScene(scene) {
		if(!scene.initialized) {
            scene.initialize(scene);
			console.log("Scene initialization \""+scene.name+"\"...")
			scene._initialized = true;
        }

		if(this._scene){
			this._scene.disable();
		}
        scene.enable();
        
		scene._lastScene = this._scene;
        this._scene = scene;
	}

	end() {
		ServiceLocator.running = false;
	}

	get scene() {
		return this._scene;
	}
	set scene(s) {
		this._scene = s;
	}
}
