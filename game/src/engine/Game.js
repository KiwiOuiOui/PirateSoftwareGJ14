import { ServiceLocator } from './ServiceLocator.js';
import { FirstScene } from '../scenes/FirstScene.js';

export class Game {
	constructor() {
		this.scene = null;
	}
	
	
	initialize() {
		ServiceLocator.createCanvas(320, 180, 3);
		ServiceLocator.initialize(this);
		ServiceLocator.debugMode = 1;
		
		this._scene = new FirstScene("coucou");
		this._scene.initialize();
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
			ServiceLocator.graphicManager.applyShaders(ServiceLocator.context);
			ServiceLocator.debug("Frame #" + ServiceLocator._FPSCounter.frameNb);
		}
		ServiceLocator.clockManager.update();
		//ServiceLocator.FPSCounter.update(); //now in drawing because it counted updates not frames
		ServiceLocator.clockManager.fireTimers();
		ServiceLocator.eventManager.process();
		
		if (ServiceLocator.clockManager.running) {
			ServiceLocator.componentManager.update();
			this._scene.updateNodes();
		}
		
		ServiceLocator.animationFrameCode = window.requestAnimationFrame((timestamp) => {
			this.loop(timestamp);
		});
	}
	
	
	end() {
		ServiceLocator.running = false;
	}
}
