import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Enemy extends BaseGameObject {
    blockGravityForces = false;
    start;
    end;
    direction = 1;
    speed = 1;
    type;
    facing;

    getBoxBounds = function () {
        let bounds = {
            left: this.x + global.backgroundShift + 20,
            right: this.x + this.width + global.backgroundShift - 20,
            top: this.y + 10,
            bottom: this.y + this.height - 10
        }
        return bounds;
    }

    changeSpriteDirection = function(direction) {
        if(direction === "left") {
            this.switchCurrentSprites(9, 17);
        } else {
            this.switchCurrentSprites(0, 8);
        }
    }

    update = function () {
        if (this.type == 0) {
            if (this.x > this.end) {
                this.x = this.end;
                this.direction = -1;
                this.changeSpriteDirection("left");
            } else if (this.x < this.start) {
                this.x = this.start;
                this.direction = 1;
                this.changeSpriteDirection("right");
            }

            this.x += this.direction * this.speed;
        } else if(this.type == 1) {
            if (this.y > this.end) {
                this.y = this.end;
                this.direction = -1;
                this.changeSpriteDirection(this.facing);
            } else if (this.y < this.start) {
                this.y = this.start;
                this.direction = 1;
                this.changeSpriteDirection(this.facing);
            }

            this.y += this.direction * this.speed;
        }
    }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Skeleton") {
            if(this.type != 2) {
                global.isDead = true;
            }
        }
    }

    constructor(x, y, width, height, start, end, speed, type, facing) {
        super(x, y, width, height);
        this.start = start;
        this.end = end;
        this.type = type;
        this.facing = facing;

        if (speed) {
            this.speed = speed;
        }

        this.loadImagesFromSpritesheet(["./images/gameObjects/ghost.png"], 9, 2);
        this.changeSpriteDirection(facing);
    }
}

export { Enemy };