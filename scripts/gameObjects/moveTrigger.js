import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class MoveTrigger extends BaseGameObject {
    backGroundDiv = null;

    update = function () {
        this.backGroundDiv.style.backgroundPositionX = global.backgroundShift + "px";
    }

    draw = function () {
       //global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Skeleton") {
            let shiftBy = collidingObject.xVelocity * global.deltaTime;

            if(this.name == "Right") {
                if(collidingObject.x < this.x) {
                    collidingObject.x = this.x;
                    console.log("done!")
                }
            }

            global.backgroundShift += shiftBy * -1;

            if (global.backgroundShift < global.backgroundMaxShift) {
                global.backgroundShift = global.backgroundMaxShift;
                console.log("reached");
            }
            else if (global.backgroundShift > 0) {
                global.backgroundShift = 0;
            }

            const minLeftBuffer = 100;
            if(collidingObject.x < minLeftBuffer) {
                collidingObject.x = minLeftBuffer;
            }
        }

    }

    constructor(x, y, width, height, name) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.backGroundDiv = document.querySelector("#background");
    }
}

export {MoveTrigger}