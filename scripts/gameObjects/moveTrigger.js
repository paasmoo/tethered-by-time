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

    reactToCollision = function (collidingObject) {
        if (collidingObject.name === "Skeleton") {
            let shiftBy = collidingObject.xVelocity * global.deltaTime;
            let isBlocked = false;
    
            // Check if player is colliding with a block
            for (let i = 0; i < global.allGameObjects.length; i++) {
                let otherObject = global.allGameObjects[i];
                if (otherObject !== collidingObject && otherObject.active && otherObject.name === "Block") {
                    let collisionHappened = global.detectBoxCollision(collidingObject, otherObject);
                    if (collisionHappened) {
                        isBlocked = true;
                        break; // Stop checking further if the player is blocked by any block
                    }
                }
            }
    
            // If player is not blocked, move the background
            if (!isBlocked) {
                if (this.name === "Right" && collidingObject.x < this.x) {
                    collidingObject.x = this.x;
                }
    
                global.backgroundShift += shiftBy * -1;
    
                // Ensure the background does not exceed the limits
                if (global.backgroundShift < global.backgroundMaxShift) {
                    global.backgroundShift = global.backgroundMaxShift;
                } else if (global.backgroundShift > 0) {
                    global.backgroundShift = 0;
                }
    
                const minLeftBuffer = 100;
                if (collidingObject.x < minLeftBuffer) {
                    collidingObject.x = minLeftBuffer;
                }
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