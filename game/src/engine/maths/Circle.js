import { Vector } from './Vector.js'
import { Rectangle } from './Rectangle.js'
import { ServiceLocator } from '../ServiceLocator.js';

export class Circle {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
    }

    contains(x, y) {}

    draw(context) {
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    }

    move(vector) {
        return new Circle(this.position.add(vector), this.radius);
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

    collideToRectangle(rectangle) {
        let circleDistance = new Vector(
            Math.abs(this.x - rectangle.center.x),
            Math.abs(this.y - rectangle.center.y)
        );

        if (circleDistance.x > (rectangle.width / 2 + this.radius)) { return false; }
        if (circleDistance.y > (rectangle.height / 2 + this.radius)) { return false; }

        if (circleDistance.x <= (rectangle.width / 2)) { return true; }
        if (circleDistance.y <= (rectangle.height / 2)) { return true; }

        let cornerDistance_sq = (circleDistance.x - rectangle.width / 2) ** 2 +
            (circleDistance.y - rectangle.height / 2) ** 2;

        return (cornerDistance_sq <= (this.radius ** 2));
    }

    // f() {
    //     circleDistance.x = abs(circle.x - rect.x);
    //     circleDistance.y = abs(circle.y - rect.y);

    //     if (circleDistance.x > (rect.width / 2 + circle.r)) { return false; }
    //     if (circleDistance.y > (rect.height / 2 + circle.r)) { return false; }

    //     if (circleDistance.x <= (rect.width / 2)) { return true; }
    //     if (circleDistance.y <= (rect.height / 2)) { return true; }

    //     cornerDistance_sq = (circleDistance.x - rect.width / 2) ^ 2 +
    //         (circleDistance.y - rect.height / 2) ^ 2;

    //     return (cornerDistance_sq <= (circle.r ^ 2));
    // }
    
    
    collideToCircle(circle) {
        return (circle.position.substract(this.position).magnitude < circle.radius + this.radius);
    }


    get boundingBox() {
        return new Rectangle(this.position.substract(new Vector(this.radius, this.radius)),
            new Vector(
                this.radius * 2,
                this.radius * 2)
        );
    }

}
