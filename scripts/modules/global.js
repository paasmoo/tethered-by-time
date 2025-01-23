import { GameState } from "../util/menus.js";

const global = {};

// Canvas & Background
global.canvas = document.querySelector("#canvas");
global.canvas.width = 1000;
global.canvas.height = 500;
global.ctx = canvas.getContext("2d");
global.background = document.getElementById("background");

global.platformSize = 80;

global.currentLevel = 1;
global.buttonSelected = "play";
global.levelDone = false;
global.isDead = false;
global.gameState = GameState.TITLE_SCREEN;
global.gameFirstStart = true;

global.won = false;

global.modifierGenerated = false;
global.currentModifiers = [];

global.hearts = global.maxHearts;

global.coinsCollected = 0;
global.coins = [];

global.timerRemaining = global.timerDuration;

// modifiable by modifier
global.wrapper = document.getElementById("gameContainer").style.transform = "scale(1, 1)";
global.timerDuration;
global.maxHearts = 3;
global.moveModifier = 1;
global.enemyModifier = 1;
global.inputSwitched = false;
global.gravityForce = 2.8;

global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.backgroundShift = 0;
global.backgroundMaxShift = -8000;
global.pixelToMeter = 500;
global.leftMoveTrigger;
global.rightMoveTrigger;

global.reset = function (fullReset = false) {
    if(fullReset) {
        global.hearts = 3;
        global.maxHearts = 3;
        global.currentLevel = 1;
        global.buttonSelected = "play";
        global.levelDone = false;
        global.isDead = false;
        global.gameState = GameState.TITLE_SCREEN;
        global.gameFirstStart = true;
        global.coinsCollected = 0;
        global.coins = [];
        global.backgroundShift = 0;
        global.won = false;
    }

    global.wrapper = document.getElementById("gameContainer").style.transform = "scale(1, 1)";
    global.currentModifiers = [];
    global.modifierGenerated = false;

    global.moveModifier = 1;
    global.enemyModifier = 1;
    global.inputSwitched = false;
    global.gravityForce = 2.8;
}

global.startTimer = function () {
    global.timerRemaining = global.timerDuration; // Reset the timer to the full duration

    global.timerInterval = setInterval(() => {
        if (global.timerRemaining > 1) {
            global.timerRemaining--;
        } else {
            clearInterval(global.timerInterval);
            global.timerInterval = null; // Timer has ended

            global.reset();
            global.allGameObjects = [];
            global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
            global.isDead = false;
            global.gameState = GameState.GAME_OVER;
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