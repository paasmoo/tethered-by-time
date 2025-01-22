import { BaseGameObject } from "../baseGameObject.js";
import { global } from "../../modules/global.js";


class CoinUI extends BaseGameObject {
    reactToCollision = function (collidingObject)   {
    }

    update = function () {
    }

    draw = function () {
        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet(["./images/gameObjects/coin.png"], 7, 2);
        this.switchCurrentSprites(0,0);
    }
}

export {CoinUI};