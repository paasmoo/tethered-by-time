import { BaseGameObject } from "./baseGameObject.js";


class BlockObject extends BaseGameObject {
    blockGravityForces = true;
    name = "Block";

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Skeleton") {
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
        }
    }

    constructor (x, y, width, height, sprite, type) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet([`./images/platforms/${type}.png`], 4, 4);
        this.switchCurrentSprites(sprite, sprite);
    }
}

export {BlockObject};