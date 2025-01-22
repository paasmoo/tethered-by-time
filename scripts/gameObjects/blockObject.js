import { BaseGameObject } from "./baseGameObject.js";


class BlockObject extends BaseGameObject {
    blockGravityForces = true;

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Skeleton") {
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
        }
    }

    constructor (x, y, width, height, type) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet(["./images/platforms/grass.png"], 4, 4);
        this.switchCurrentSprites(type, type);
    }
}

export {BlockObject};