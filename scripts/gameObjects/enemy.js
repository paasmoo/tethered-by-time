import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Enemy extends BaseGameObject {
    blockGravityForces = true;
    startX;
    endX;
    direction = 1;
    speed = 1;
    type;

    update = function () {
        if(this.x > this.endX) {
            this.x = this.endX;
            this.direction = -1;
        } else if(this.x < this.startX) {
            this.x = this.startX;
            this.direction = 1;
        }
        
        this.x += this.direction * this.speed;
    }

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Skeleton") {
            global.isDead = true;
        }
    }

    constructor (x, y, width, height, startX, endX, speed) {
        super(x, y, width, height);
        this.startX = startX;
        this.endX = endX;
        if(speed) {
            this.speed = speed;
        }
        this.loadImages(["./images/wall.jpg"]);
    }
}

export {Enemy};