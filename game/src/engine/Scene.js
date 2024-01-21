import { ServiceLocator } from './ServiceLocator.js';
import { Node } from './Node.js';

export class Scene {
    constructor(name) {
        this._view; //sf::View

        this._name = name;
        this._active = true;
        this._initialized = false;

        this._drawable = false;
        this._updatable = false;
        this._inputable = false;

        this._root = new Node("root de "+ name);
        this._root._scene = this;

        this._clock = ServiceLocator.clockManager.addClock();

        this._lastScene = null;

        ServiceLocator.debug("Scene \"" + name + "\" created...", this);

        //this._destroyNodeList = [];
    }

    initialize() {
        console.log("Override initialize in ", this.constructor.name);
    };

    get clock() {
        return this._clock;
    }
    get root() {
        return this._root;
    }
    get view() {
        return this._view;
    }
    get name() {
        return this._name;
    }
    
    // get destroyNodeList() {
    //     return this._destroyNodeList;
    // }
    enable() {
        console.log("Scene \""+this.name+"\" enabled...")
        this.drawable = true;
        this.updatable = true;
        this.inputable = true;
        this._enable = true;
    }

    disable() {
        console.log("Scene \""+this.name+"\" disabled...")
        this.drawable = false;
        this.updatable = false;
        this.inputable = false;
        this._enable = false;
    }

    get enabled() {
        return this._enable;
    }

    get initialized() {
        return this._initialized;
    }
    
    get active() {
        return this._active;
    }

    get drawable() {
        return this._drawable;
    }

    set drawable(drawable) {
        this._drawable = drawable;
    }


    get updatable() {
        return this._updatable;
    }

    set updatable(updatable) {
        this._updatable = updatable;
    }


    get inputable() {
        return this._inputable;
    }

    set inputable(inputable) {
        this._inputable = inputable;
    }


    set view(view) {
        this._view = view;
    }
    get root() {
        return this._root;
    }
    set root(root) {
        this._root = root;
    }
    set initialized(value) {
        this._initialized = value;
    }

    findNode(name) {
        if (this._root.name == name)
            return this._root;
        else return this._root.findChildren(name)
    }

    removeNode(node) {
        //todo
    }

    updateNodes() {
        if (this.enabled && this._root.enabled)
            this._root.update();
    }

    debug() {

    }
}
