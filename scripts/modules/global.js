const global = {};

// Canvas & Background
global.canvas = document.querySelector("#canvas");
global.canvas.width = 1000;
global.canvas.height = 500;
global.ctx = canvas.getContext("2d");
global.background = document.getElementById("background");

global.buttonSelected = "play";

global.platformSize = 80;

global.levelDone = false;
global.isDead = false;
global.gameState = "mainMenu";
global.gameFirstStart = true;

global.maxHearts = 3;
global.hearts = global.maxHearts;

global.modifier = 1;

global.timerDuration = 10;
global.timerRemaining = global.timerDuration;

global.coinsCollected = 0;
global.coins = [];

global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.backgroundShift = 0;
global.backgroundMaxShift = -8000;
global.gravityForce = 4.8;
global.pixelToMeter = 500;
global.leftMoveTrigger;
global.rightMoveTrigger;

global.startTimer = function () {
    global.timerRemaining = global.timerDuration; // Reset the timer to the full duration

    global.timerInterval = setInterval(() => {
        if (global.timerRemaining > 1) {
            global.timerRemaining--;
        } else {
            clearInterval(global.timerInterval);
            global.timerInterval = null; // Timer has ended

            global.resetCanvas();
            global.allGameObjects = [];
            global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
            global.isDead = false;
            global.gameState = "dead";
            global.gameFirstStart = true;
        }
    }, 1000);
}

global.stopTimer = function () {
    if (global.timerInterval) {
        clearInterval(global.timerInterval);
        global.timerInterval = null;
    }
}

global.resetCanvas = function () {
    global.backgroundShift = 0;
}

global.getCanvasBounds = function () {
    let bounds = {
        "left": 0,
        "right": this.canvas.width,
        "top": 0,
        "bottom": this.canvas.height
    }

    return bounds;
}

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = givenObject.index; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
}

global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom &&
            box1.left <= box2.right &&
            box1.bottom >= box2.top &&
            box1.right >= box2.left) {
            return true;
        }
        return false;
    }
}

export { global }