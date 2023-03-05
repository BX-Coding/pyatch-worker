
class PyatchPrims {

    static opcodeMap = {
        move: "motion_movesteps",
        goToXY: "motion_gotoxy",
        goTo: "motion_goto",
        turnRight: "motion_turnright",
        turnLeft: "motion_turnleft",
        pointInDirection: "motion_pointindirection",
        pointTowards: "motion_pointtowards",
        glide: "motion_glidesecstoxy",
        glideTo: "motion_glideto",
        ifOnEdgeBounce: "motion_ifonedgebounce",
        setRotationStyle: "motion_setrotationstyle",
        changeX: "motion_changexby",
        setX: "motion_setx",
        changeY: "motion_changeyby",
        setY: "motion_sety",
        getX: "motion_xposition",
        getY: "motion_yposition",
        getDirection: "motion_direction",
    };
    constructor(targetId, postFunction) {
        this.targetId = targetId;
        this.post = function (op_code, args) {
            postFunction(this.targetId, op_code, args);
        }
    }

    static getPrimNames() {
        return Object.keys(this.opcodeMap);
    }

    move(steps) {
        this.post(this.opcodeMap['move'], { STEPS: steps });
    }

    goToXY(x, y) {
        this.post(this.opcodeMap['goToXY'], { X: x, Y: y });
    }

    goTo(targetName) {
        this.post(this.opcodeMap['goTo'], { TO: targetName });
    }

    turnRight(degrees) {
        this.post(this.opcodeMap['turnRight'], { DEGREES: degrees });
    }

    turnLeft(degrees) {
        this.post(this.opcodeMap['turnLeft'], { DEGREES: degrees });
    }

    pointInDirection(degrees) {
        this.post(this.opcodeMap['pointInDirection'], { DIRECTION: degrees });
    }

    pointTowards(targetName) {
        this.post(this.opcodeMap['pointTowards'], { TOWARDS: targetName });
    }

    glide(seconds, x, y) {
        this.post(this.opcodeMap['glide'], { SECS: seconds, X: x, Y: y });
    }

    glideTo(seconds, targetName) {
        this.post(this.opcodeMap['glideTo'], { SECS: seconds, TO: targetName });
    }

    ifOnEdgeBounce() {
        this.post(this.opcodeMap['ifOnEdgeBounce'], {});
    }

    setRotationStyle(style) {
        this.post(this.opcodeMap['setRotationStyle'], { STYLE: style });
    }

    changeX(deltaX) {
        this.post(this.opcodeMap['changeX'], { DX: deltaX });
    }

    setX(x) {
        this.post(this.opcodeMap['setX'], { X: x });
    }

    changeY(deltaY) {
        this.post(this.opcodeMap['changeY'], { DY: deltaY });
    }

    setY(y) {
        this.post(this.opcodeMap['setY'], { Y: y });
    }

    async getX() {
        let x = await this.post(this.opcodeMap['getX'], {});
        return x;
    }

    async getY() {
        let y =this.post(this.opcodeMap['getY'], {});
        return y;
    }

    async getDirection() {
        let direction = this.post(this.opcodeMap['getDirection'], {});
        return direction;
    }
}

module.exports = PyatchPrims;