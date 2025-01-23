import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Spike extends BaseGameObject {
    blockGravityForces = false;

    update = function () {
    }

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