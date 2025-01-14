import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class Star extends BaseGameObject {
    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Skeleton") {
            global.levelDone = true;
        }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/wall.jpg"]);
    }
}

export {Star};