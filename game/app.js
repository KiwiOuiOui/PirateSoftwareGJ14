import "./style.css";
import { Game } from "./src/engine/Game.js";


;
(function() {
	let game = new Game();
	game.initialize();
	game.run();
})();
