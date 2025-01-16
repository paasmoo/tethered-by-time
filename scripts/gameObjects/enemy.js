import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Enemy extends BaseGameObject {
    direction = 1;
    speed = 100;
    startX;
    endX;

    update = function() {
        const moveBy = this.direction * this.speed * global.deltaTime;

        this.x += moveBy;

        if(this.x >= this.endX) {
            this.x = this.endX;
            this.directon = -1;
        } else if (this.x <= this.startX) {
            this.x = this.startX;
            this.direction = 1;
        }
    }

    draw = function() {
        global.ctx.fillStyle = "red";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reactToCollision = function (collidingObject) {
        if(collidingObject.name === "Skeleton") {
            global.isDead = true;
        }
    }

    constructor(x, y, width, height, startX, endX, speed) {
        super(x, y, width, height);
        this.startX = startX;
        this.endX = endX;
        if (speed) {
            this.speed = speed;
        }
    }
}

export { Enemy };