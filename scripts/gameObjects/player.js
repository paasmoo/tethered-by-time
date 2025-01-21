import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Player extends BaseGameObject {
    name = "Skeleton";
    xVelocity = 0;
    yVelocity = 0;
    useGravityForces = true;

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
        }
        return bounds;
    }

    update = function() {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        if (this.xVelocity == 0) {
            global.playerObject.switchCurrentSprites(8,9, true);
        }

        if(this.y > global.canvas.height) {
            global.isDead = true;
        }
    }

    /*draw = function () {
        global.ctx.fillStyle = "#000000";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }*/

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.loadImagesFromSpritesheet("./images/playerCharacter.png", 4, 3);

        this.switchCurrentSprites(8,9);
    }
}

export {Player}