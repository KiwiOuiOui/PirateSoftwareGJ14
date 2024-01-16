import { Vector } from "./Vector.js";
import { ServiceLocator } from "../ServiceLocator.js";

export class Rectangle {
    constructor(position, dimension) {
        this.position = position;
        this.dimension = dimension;
    }

    contains(x, y) {
        return this.position.x <= x && x <= this.position.x + this.dimension.x &&
            this.position.y <= y && y <= this.position.y + this.dimension.y;
    }

    draw(context) {
        context.rect(this.position.x, this.position.y, this.dimension.x, this.dimension.y)
    }

    move(vector) {
        return new Rectangle(this.position.add(vector), this.dimension);
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

    get width() {
        return this.dimension.x;
    }

    get height() {
        return this.dimension.y;
    }
    set x(v) {
        this.position.x = v;
    }

    set y(v) {
        this.position.y = v;
    }

    set width(v) {
        this.dimension.x = v;
    }

    set height(v) {
        this.dimension.y = v;
    }

    get center() {
        return this.position.add(this.dimension.multiply(.5))
    }

    collideToRectangle(rectangle) {
        return (this.x < rectangle.x + rectangle.width &&
            this.x + this.width > rectangle.x &&
            this.y < rectangle.y + rectangle.height &&
            this.height + this.y > rectangle.y);
    }

    intersect(rectangle) {
        let position = new Vector(
            Math.max(this.x, rectangle.x),
            Math.max(this.y, rectangle.y)
        );
        let opposite = new Vector(
            Math.min(this.x + this.width, rectangle.x + rectangle.width),
            Math.min(this.y + this.height, rectangle.y + rectangle.height)
        );

        return new Rectangle(
            position,
            opposite.substract(position)).withPositiveDimensions();
    }

    withPositiveDimensions() {
        return new Rectangle(
            new Vector(this.x, this.y),
            new Vector(Math.abs(this.width), Math.abs(this.height))
        );
    }

    collideToCircle(circle) {
        return circle.collideToRectangle(this);
    }
}
