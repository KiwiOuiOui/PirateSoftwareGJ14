import { ServiceLocator } from '../ServiceLocator.js';
import { ButtonComponent } from '../../components/ButtonComponent.js';
import { RectangleCollider } from '../../components/RectangleCollider.js';
import { CircleCollider } from '../../components/CircleCollider.js';
import { PauseKeyComponent } from '../../components/PauseKeyComponent.js';
import { ButtonHitBox } from '../../components/ButtonHitBox.js';
import { PlayerControls } from '../../components/PlayerControls.js';
import { PhysicsComponent } from '../../components/PhysicsComponent.js';
import { ForceComponent } from '../../components/ForceComponent.js';
import { VelocityTransition } from '../../components/VelocityTransitionComponent.js';

export class ComponentFactory {
    static initialize() {
        this.registerComponent("PauseKey", PauseKeyComponent);
        this.registerComponent("ButtonHitBox", ButtonHitBox);
        this.registerComponent("ButtonComponent", ButtonComponent);
        this.registerComponent("RectangleCollider", RectangleCollider);
        this.registerComponent("CircleCollider", CircleCollider);
        this.registerComponent("Physics", PhysicsComponent);
        this.registerComponent("ForceComponent", ForceComponent);
        this.registerComponent("PlayerControls", PlayerControls);
        this.registerComponent("VelocityTransition", VelocityTransition);
    }

    static registerComponent(type, componentClass) {
        this._creators.set(type, (node) => { return new componentClass(node); });
        console.log("ComponentFactory registration \"" + type + "\"...");
    }

    static create(type, node) {
        let component = null;

        if (this._creators.has(type)) {
            ServiceLocator.debug("Component Factory creating \"" + type + "\"...");
            component = this._creators.get(type)(node);

            ServiceLocator.componentManager.addComponent(component);
            if (node) node.addComponent(component);

            return component;
        } else {
            ServiceLocator.error("Component Factory cannot create \"" + type + "\"...");
        }

        return null;
    }
}

ComponentFactory._creators = new Map();
ComponentFactory.initialize();
