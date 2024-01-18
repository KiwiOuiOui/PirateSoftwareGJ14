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
        this._components.forEach((component) => {
            if (component.enabled &&
                component.node.enabled &&
                component.node.scene.updatable) {
                component.update();
            }
        });

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
        this._colliders.forEach((collider1) => {
            this._colliders.forEach((collider2) => {
                if (collider1.node.scene._updatable &&
                    collider1.node.scene == collider2.node.scene &&
                    collider1.node != collider2.node &&
                    collider1.enabled &&
                    collider2.enabled) {
                    if (collider1.checkCollision(collider2)) {
                        ServiceLocator.debug(collider1, "collide", collider2)
                        collider1.onCollide(collider2);
                        collider2.onCollide(collider1);
                        
                        collider1.computeCollision()
                        collider2.computeCollision()
                    }
                }
                else {
                    // ServiceLocator.debug(collider1, "Ignore Collision....", collider2);
                    // ServiceLocator.clockManager.pause();
                }
            })
        })
    }
}
