import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class BossEnemy extends BaseGameObject {
    blockGravityForces = false;
    end;
    direction = 1;
    speed = 1;
    facing;
    startTime;

    changeSpriteDirection = function (direction) {
        if (direction === "left") {
            this.switchCurrentSprites(9, 17);
        } else {
            this.switchCurrentSprites(0, 8);
        }
    }

    update = function () {
        if(this.facing === "right") {
            this.direction = 1;
            if (this.x > this.end) {
                this.speed = 0;
            }
        } else {
            this.direction = -1;
            if(this.x < this.end) {
                this.speed = 0;
            }
        }

        if(global.timerRemaining <= this.startTime) {
            this.x += this.direction * this.speed * global.enemyModifier;
        }
    }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Skeleton") {
            global.isDead = true;
        }
    }

    constructor(x, y, width, height, end, speed, facing, startTime) {
        super(x, y, width, height);
        this.end = end;
        this.facing = facing;
        this.startTime = startTime;

        if (speed) {
            this.speed = speed;
        }

        this.loadImagesFromSpritesheet(["./images/gameObjects/ghost.png"], 9, 2);
        this.changeSpriteDirection(facing);
    }
}
export { BossEnemy };