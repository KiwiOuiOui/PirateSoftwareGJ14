/*

16 : Xbox button 
*/

export class GamePad {
    controller(gamePad, name) {
        this._gamePad = gamePad;
        this._name = name;
    }

    get A() {
        return gamePad.buttons[1];
    }
    get B() {
        return gamePad.buttons[0];
    }
    get up() {
        return gamePad.buttons[12];
    }
    get down() {
        return gamePad.buttons[13];
    }
    get left() {
        return gamePad.buttons[14];
    }
    get right() {
        return gamePad.buttons[15];
    }
    get tleft() {
        return gamePad.buttons[4];
    }
    get tright() {
        return gamePad.buttons[5];
    }
    get select() {
        return gamePad.buttons[8];
    }
    get start() {
        return gamePad.buttons[9];
    }
}