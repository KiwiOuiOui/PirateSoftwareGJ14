import { ServiceLocator } from './ServiceLocator.js';
import { Settings } from '../scenes/Settings';
import { Home } from '../scenes/Home';
import { About } from '../scenes/About';
import * as Cookies from '../engine/utils/Cookies';

export class Game {
	constructor() {
		this._scene = null;
		this._homeScene = null;
		this._settingsScene = null;
		this._aboutScene = null;
		this._gameValues = {
			timer: null,
			insuranceLimit : null,
			damageTaken : null
		}

		let cookie = Cookies.get("WDSoptions");
		if(cookie) {
			this.commands = JSON.parse(cookie)
		}
		else {
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
	}
	
	
	initialize() {
		ServiceLocator.createCanvas(320, 180, 2);
		ServiceLocator.initialize(this);
		ServiceLocator.debugMode = 1;
		
		this._settingsScene = new Settings("Settings scene");
		this._homeScene = new Home("Settings scene");
		this._aboutScene = new About("Settings scene");

		this.changeScene(this._homeScene);
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
	get gameValues() {
		return this._gameValues;
	}
	set gameValues(v) {
		this._gameValues = v;
	}
}
