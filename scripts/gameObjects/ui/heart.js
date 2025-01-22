import { BaseGameObject } from "../baseGameObject.js";
import { global } from "../../modules/global.js";


class Heart extends BaseGameObject {
    reactToCollision = function (collidingObject)   {
    }

    update = function () {
    }

    draw = function () {
        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    constructor (x, y, width, height, isDead = false) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet(["./images/ui/heart.png"], 3, 2);
        this.animationData.timePerSprite = 0.3;

        if(isDead) {
            this.switchCurrentSprites(5,5, false, true);
        } else {
            this.switchCurrentSprites(0,4, false, true);
        }
    }
}

export {Heart};