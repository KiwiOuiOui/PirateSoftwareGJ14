import { ComponentFactory } from './ComponentFactory.js';
import { ServiceLocator } from '../ServiceLocator.js';

export class ComponentManager {
    constructor(node, enabled = true) {
        this._components = [];
        this._colliders = [];
        //todo : _physicMgr;
    }

    create(type, node) {
        return ComponentFactory.create(type, node);
    }


    update() {
        for (let i = 0; i < this._components.length; i++) {
            let component = this._components[i];
            if (component._node._scene._updatable &&
                component._node._enabled &&
                component._enabled) {
                //ServiceLocator.error("update", component, component.node.name)
                component.update();
            }
        }

        if (this._colliders.length > 1)
            this.checkCollisions();

        //ComponentFactory.physicManager.update();
    }


    addComponent(component) {
        this._components.push(component);
    }


    addCollider(colliderComponent) {
        this._colliders.push(colliderComponent);
        ServiceLocator.debug("Registering Collider....", colliderComponent);
    }


    removeComponent(component) {
        let i = this._components.indexOf(component);

        if (i >= 0)
            this._components.splice(i, 1);

        i = this._colliders.indexOf(component);

        if (i >= 0)
            this._colliders.splice(i, 1);
    }

    checkCollisions() {
        if (this._colliders.length < 2)
            return;
        for (let i = 0; i < this._colliders.length; i++) {
            let collider1 = this._colliders[i];
            if(!collider1._node._scene._updatable ||
                !collider1._node._enabled &&
                collider1._enabled){
                continue;
            }
            for (let j = i+1; j < this._colliders.length; j++) {
                let collider2 = this._colliders[j];
                if (collider1._node._scene == collider2._node._scene &&
                    collider2._node._enabled &&
                    collider2._enabled) {
                    if (collider1.checkCollision(collider2)) {
                        collider1.onCollide(collider2);
                        collider2.onCollide(collider1);
                        
                    }
                }
            }
            collider1.computeCollision()
        }
        // this._colliders.forEach((collider1) => {
        //     this._colliders.forEach((collider2) => {
        //         else {
        //             // ServiceLocator.debug(collider1, "Ignore Collision....", collider2);
        //             // ServiceLocator.clockManager.pause();
        //         }
        //     })
        // })
    }
}
