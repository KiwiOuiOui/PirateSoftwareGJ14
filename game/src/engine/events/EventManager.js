import { ServiceLocator } from '../ServiceLocator.js';
import { EventObserver } from './EventObserver.js';

export class EventManager {
    constructor() {
        this._events = [];
        this._notifyListKeyPressed = [];
        this._notifyListKeyReleased = [];
        this._notifyListMouseMoved = [];
        this._notifyListMouseButtonPressed = [];
        this._notifyListMouseButtonReleased = [];
    }


    defaultEventHandler = (event) => {
        event.preventDefault();
        this._events.push(event);
    }
    defaultPointerEventHandler = (event) => {
        event.preventDefault();
        if (null == EventManager.canvasBB)
            EventManager.canvasBB = ServiceLocator.context.canvas.getBoundingClientRect()

        event.canvasX = (event.clientX - EventManager.canvasBB.x) / ServiceLocator.scale;
        event.canvasY = (event.clientY - EventManager.canvasBB.y) / ServiceLocator.scale;

        this._events.push(event);
    }


    initialize() {
        document.addEventListener('keydown', this.defaultEventHandler, false);
        document.addEventListener('keyup', this.defaultEventHandler, false);

        ServiceLocator.context.canvas.addEventListener('click', this.defaultEventHandler, false);
        ServiceLocator.context.canvas.addEventListener('mousemove', this.defaultPointerEventHandler, false);
        ServiceLocator.context.canvas.addEventListener('mouseup', this.defaultPointerEventHandler, false);
        ServiceLocator.context.canvas.addEventListener('mousedown', this.defaultPointerEventHandler, false);
        ServiceLocator.context.canvas.addEventListener('touchstart', this.defaultPointerEventHandler, false);
        ServiceLocator.context.canvas.addEventListener('touchmove', this.defaultPointerEventHandler, false);

        window.addEventListener('blur', (event) => {
            //ServiceLocator.clockManager.pause();
        });
        window.addEventListener('focus', (event) => {
            //ServiceLocator.clockManager.resume();
        });
    }


    process() {
        this._events.forEach((event) => {
            switch (event.type) {
                case "keydown":
                    this._notifyListKeyPressed.forEach((observer) => {
                        if ( /*Put bool event here*/ true)
                            observer.notify(event);
                    });
                    break;
                case "keyup":
                    this._notifyListKeyReleased.forEach((observer) => {
                        if ( /*Put bool event here*/ true)
                            observer.notify(event);
                    });
                    break;
                case "mousemove":
                    this._notifyListMouseMoved.forEach((observer) => {
                        if ( /*Put bool event here*/ true)
                            observer.notify(event);
                    });

                    break;

                case "mousedown":
                    this._notifyListMouseButtonPressed.forEach((observer) => {
                        if ( /*Put bool event here*/ true)
                            observer.notify(event);
                    });

                    break;

                case "mouseup":
                    this._notifyListMouseButtonReleased.forEach((observer) => {
                        if ( /*Put bool event here*/ true)
                            observer.notify(event);
                    });

                    break;

                default:
                    break;
            }
        });
        this._events = [];
        EventManager.canvasBB = null;
    }


    subscribe(component, eventType) {
        ServiceLocator.debug("Component subscribed to \"" + eventType + "\"...", component);

        switch (eventType) {

            case "keyup":
                {
                    this._notifyListKeyReleased.push(new EventObserver(component));
                }
                break;

            case "keydown":
                {
                    this._notifyListKeyPressed.push(new EventObserver(component));
                }
                break;

            case "mousemove":
                {
                    this._notifyListMouseMoved.push(new EventObserver(component));
                }
                break;

            case "mousedown":
                {
                    this._notifyListKeyPressed.push(new EventObserver(component));
                }
                break;

            case "mouseup":
                {
                    this._notifyListMouseButtonReleased.push(new EventObserver(component));
                }
                break;

            default:
                {}
                break;
        }
    }


    removeObserverFromList(notifyList, observer) {
        let i = notifyList.indexOf(observer);

        if (i >= 0)
            notifyList.splice(i, 1);
    }

    removeObserversFromList(notifyList, component) {
        notifyList.filter(observer => observer.component == component).forEach((observer) => {
            this.removeObserverFromList(notifyList, observer);
        });
    }

    removeObservers(component) {
        this.removeObserverFromList(this._notifyListKeyPressed, component);
        this.removeObserverFromList(this._notifyListKeyReleased, component);
        this.removeObserverFromList(this._notifyListMouseMoved, component);
        this.removeObserverFromList(this._notifyListMouseButtonPressed, component);
        this.removeObserverFromList(this._notifyListMouseButtonReleased, component);
    }
}

EventManager.canvasBB = null;
