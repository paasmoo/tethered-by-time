import { BaseGameObject } from "../baseGameObject.js";
import { global } from "../../modules/global.js";


class PlayButton extends BaseGameObject {
    isActive = 0;

    reactToCollision = function (collidingObject)   {
    }

    update = function () {
    }

    setActive = function (active) {
        this.isActive = active;
        this.switchCurrentSprites(active, active);
    }

    draw = function () {
        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet(["./images/playButton.png"], 2, 1);
        this.animationData.timePerSprite = 0.3;

        this.switchCurrentSprites(0, 0);
    }
}

export {PlayButton};