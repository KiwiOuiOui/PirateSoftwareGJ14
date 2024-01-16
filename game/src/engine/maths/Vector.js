export class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }
    substract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    multiply(multiplier) {
        return new Vector(this.x * multiplier, this.y * multiplier);
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        if(this.equals(new Vector()))
            return this;
        return this.multiply(1 / this.magnitude);
    }

    dot(vector) {
        return (this.x * vector.x + this.y * vector.y);
    }

    mean(vector) {
        let coef = (this.magnitude + vector.magnitude) / 2;
        return this.add(vector).normalize().multiply(coef);
    }

    reflection(normal) { //r = v−2(v⋅n)n
        if (this.x == 0 && this.y == 0)
            return new Vector();

        if (this.dot(normal) > 0)
            normal = normal.multiply(-1);

        return this.substract(normal.multiply(this.dot(normal) * 2));
    }

    equals(vector) {
        return (this.x == vector.x && this.y == vector.y);
    }
}
