import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Spike extends BaseGameObject {
    blockGravityForces = false;

    getBoxBounds = function () {
        let bounds = {
            left: this.x + global.backgroundShift + 10,
            right: this.x + this.width + global.backgroundShift - 10,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    };

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Skeleton") {
            global.isDead = true;
        }
    }

    constructor (x, y, width, height, position = 0) {
        super(x, y, width, height);

        this.loadImagesFromSpritesheet(["./images/gameObjects/spike.png"], 4, 1);
        this.switchCurrentSprites(position, position);
    }
}

export {Spike};