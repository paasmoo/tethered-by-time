import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class Coin extends BaseGameObject {
    active;

    reactToCollision = function (collidingObject)   {
        if(collidingObject.name === "Skeleton") {
            global.coinsCollected++;
            this.active = false;
        }
    }

    update = function () {
    }

    draw = function () {
        if(this.active) {
            const adjustedX = this.x + global.backgroundShift;
            let sprite = this.getNextSprite();
            if(adjustedX + this.width > 0 && adjustedX < global.canvas.width) {
                global.ctx.drawImage(sprite, adjustedX, this.y, this.width, this.height);
            }
        }
    };

    constructor (x, y, width, height, isActive = true) {
        super(x, y, width, height);
        this.active = isActive;

        this.loadImagesFromSpritesheet(["./images/gameObjects/coin.png"], 7, 2);
        this.switchCurrentSprites(0,8, false, true);
        this.animationData.timePerSprite = 0.08;
    }
}

export {Coin};