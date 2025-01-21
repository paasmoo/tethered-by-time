import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class Star extends BaseGameObject {
    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Skeleton") {
            global.levelDone = true;
        }
    }

    update = function () {
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet(["./images/coin.png"], 7, 2);
        this.switchCurrentSprites(0,8, false, true);
        this.animationData.timePerSprite = 0.08;
    }
}

export {Star};