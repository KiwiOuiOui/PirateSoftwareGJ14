import { ServiceLocator } from '../engine/ServiceLocator.js';
import { Vector } from './maths/Vector.js';

export class Node {
    constructor(name) {
        this._enabled = true;

        this._name = name;
        this._position = new Vector(0, 0);

        this._children = [];
        this._components = [];
        this._graphics = [];

        this._scene = null;
        this._parent = null;
    }

    get enabled() {
        if (this._parent)
            return this._enabled && this._parent._enabled;
        return this._enabled;
    }

    enable() {
        this._enabled = true;
    }

    disable() {
        this._enabled = false;
    }


    get scene() {
        return this._scene;
    }

    set scene(scene) {
        this._scene = scene;
    }


    get parent() {
        return this._parent;
    }


    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get position() {
        return this._position;
    }

    set position(position) {
        this._position = position;
    }

    get globalPosition() {
        if (this._parent)
            return this._position.add(this._parent.globalPosition);
        return this._position;
    }

    destroy() {
        this._scene.removeNode(this);
    }


    createChild(name) {
        let child = new Node(name);
        this.addChild(child);
        return child;
    }

    addChild(child) {
        this._children.push(child);
        child._parent = this;
        child.scene = this._scene;
    }

    removeChild(node) {
        let i = this._children.indexOf(node);

        if (i >= 0)
            this._children.splice(i, 1);
    }

    findChildren(name) {
        let node = this._children.find(child => child.name == name);
        if (undefined === node) {
            node = this._children.find(child => undefined !== child.findChildren(name)).findChildren(name);
        }
        return node;
    }


    addComponent(component) {
        this._components.push(component);
    }

    removeComponent(component) {
        let i = this._components.indexOf(component);

        if (i >= 0)
            this._components.splice(i, 1);
    }


    createGraphic(type, layer) {
        let graphic = ServiceLocator.graphicManager.create(type, this, layer);
        return graphic;
    }

    addGraphic(graphic) {
        this._graphics.push(graphic);
    }

    removeGraphic(graphic) {
        let i = this._graphics.indexOf(graphic);

        if (i >= 0)
            this._graphics.splice(i, 1);
    }


    move(vector) {
        this._position = this._position.add(vector);
    }

    onUpdate(){}
    
    update() {
        this.onUpdate();
        this._children.forEach((child) => child.update())
    }

    debug() {

    }

    awake() {

    }
}
