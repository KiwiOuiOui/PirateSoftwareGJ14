import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Component } from '../engine/components/Component.js';
import { Vector } from '../engine/maths/Vector';
import { WaterDamage } from '../objects/Water';
import { Rectangle } from '../engine/maths/Rectangle';
import waterMapsData from '/assets/waterMaps.json';

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
                if(0 == this.direction.up)
                {
                    this.direction.up = 1;
                    this.computeSpeed();
                } else
                    this.direction.up = 1;
            }
            if (event.code == ServiceLocator.game.commands.left.code) {
                if(0 == this.direction.left)
                {
                    this.direction.left = 1;
                    this.computeSpeed();
                }
                else
                    this.direction.left = 1;
            }
            if (event.code == ServiceLocator.game.commands.down.code) {
                if(0 == this.direction.down)
                {
                    this.direction.down = 1
                    this.computeSpeed();
                } else
                    this.direction.down = 1;
            }
            if (event.code == ServiceLocator.game.commands.right.code) {
                if(0 == this.direction.right)
                {
                    this.direction.right = 1;
                    this.computeSpeed();
                } else
                    this.direction.right = 1;
            }
            if (event.code == ServiceLocator.game.commands.a.code) {
                let waterDamage = new WaterDamage("water try", new Vector(10, 10), -1) //9)
                waterDamage.parseData(waterMapsData[0]);
                this.node.scene.root.addChild(waterDamage);
        
                // let facing = this.node.facing();
                // let distance = 50;
                // let water = new WaterMap("water try", this.node.globalPosition.add(facing.multiply(distance)), -1) //9)
                // this.node.scene.root.addChild(water);
            }
        }
        if (event.type == "keyup") {
            if (event.code == ServiceLocator.game.commands.up.code) {
                if(1 == this.direction.up)
                {
                    this.direction.up = 0;
                    this.computeSpeed();
                } else
                    this.direction.up = 0;
            }
            if (event.code == ServiceLocator.game.commands.left.code) {
                if(1 == this.direction.left)
                {
                    this.direction.left = 0;
                    this.computeSpeed();
                } else
                    this.direction.left = 0;
            }
            if (event.code == ServiceLocator.game.commands.down.code) {
                if(1 == this.direction.down)
                {
                    this.direction.down = 0;
                    this.computeSpeed();
                } else
                    this.direction.down = 0;
            }
            if (event.code == ServiceLocator.game.commands.right.code) {
                if(1 == this.direction.right)
                {
                    this.direction.right = 0;
                    this.computeSpeed();
                } else
                    this.direction.right = 0;
            }
        }
    }
    computeSpeed() {
        let v = new Vector(0,0);
        v.x += this.node._maxWalkingSpeed*(this.direction.right-this.direction.left);
        v.y += this.node._maxWalkingSpeed*(this.direction.down-this.direction.up);

        if(0 == v.x && 0 == v.y){
            this.node._velocity.launch({
                endVelocity : v,
                duration : .1
            });     
        }
        else {
            this.node._velocity.launch({
                endVelocity : v,
                duration : .3
            });     
        }
    }
    update() {
        super.update();
    }
}
