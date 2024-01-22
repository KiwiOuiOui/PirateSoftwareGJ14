import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Component } from '../engine/components/Component.js';
import { Vector } from '../engine/maths/Vector';
import { Water } from '../objects/Water';

export class PlayerControls extends Component {
    constructor(node, enabled = true) {
        super(node, enabled);
        this._hover = false;
        this.direction = {
            left : 0,
            right : 0,
            up : 0,
            down : 0
        };
    }


    initialize() {
        ServiceLocator.eventManager.subscribe(this, "keydown");
        ServiceLocator.eventManager.subscribe(this, "keyup");
    }
    onEvent(event) {
        super.onEvent(event)
        if (event.type == "keydown") {
            if (event.code == ServiceLocator.game.commands.up.code) {
                this.direction.up = 1;
            }
            if (event.code == ServiceLocator.game.commands.left.code) {
                this.direction.left = 1;
            }
            if (event.code == ServiceLocator.game.commands.down.code) {
                this.direction.down = 1;
            }
            if (event.code == ServiceLocator.game.commands.right.code) {
                this.direction.right = 1;
            }
            if (event.code == ServiceLocator.game.commands.a.code) {
                let facing = this.node.facing();
                let distance = 50;
                let water = new Water("water try", this.node.globalPosition.add(facing.multiply(distance)), -1) //9)
                this.node.scene.root.addChild(water);
            }
        }
        if (event.type == "keyup") {
            if (event.code == ServiceLocator.game.commands.up.code) {
                this.direction.up = 0;
            }
            if (event.code == ServiceLocator.game.commands.left.code) {
                this.direction.left = 0;
            }
            if (event.code == ServiceLocator.game.commands.down.code) {
                this.direction.down = 0;
            }
            if (event.code == ServiceLocator.game.commands.right.code) {
                this.direction.right = 0;
            }
        }
    }
    
    update() {
        super.update();
        let v = new Vector(0,0);
        v.x += this.node._maxWalkingSpeed*(this.direction.right-this.direction.left);
        v.y += this.node._maxWalkingSpeed*(this.direction.down-this.direction.up);

        this.node._velocity.desiredVelocity = v; 
    }
}
