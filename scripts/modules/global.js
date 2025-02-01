import { GameState } from "../util/menus.js";

const global = {};

// Canvas & Background Setup
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

global.currentInfoIndex = 0;
global.won = false;

global.modifierGenerated = false;
global.currentModifiers = [];

global.hearts = global.maxHearts;
global.coinsCollected = 0;
global.coins = [];

global.timerRemaining = global.timerDuration;

global.wrapper = document.getElementById("gameContainer").style.transform = "scale(1, 1)";

global.timerDuration = undefined;
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
global.leftMoveTrigger = undefined;
global.rightMoveTrigger = undefined;

global.reset = function (fullReset = false) {
    if (fullReset) {
        Object.assign(global, {
            hearts: 3,
            maxHearts: 3,
            currentLevel: 1,
            buttonSelected: "play",
            levelDone: false,
            isDead: false,
            gameState: GameState.TITLE_SCREEN,
            gameFirstStart: true,
            coinsCollected: 0,
            coins: [],
            backgroundShift: 0,
            won: false,
        });
    }

    Object.assign(global, {
        wrapper: document.getElementById("gameContainer").style.transform = "scale(1, 1)",
        currentModifiers: [],
        modifierGenerated: false,
        moveModifier: 1,
        enemyModifier: 1,
        inputSwitched: false,
        gravityForce: 2.8,
    });
};

global.startTimer = function () {
    global.timerRemaining = global.timerDuration;

    global.timerInterval = setInterval(() => {
        if (global.timerRemaining > 1) {
            global.timerRemaining--;
        } else {
            global.stopTimer();
            global.reset();
            global.allGameObjects = [];
            global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
            Object.assign(global, {
                isDead: false,
                gameState: GameState.GAME_OVER,
                gameFirstStart: true,
            });
        }
    }, 1000);
};

global.stopTimer = function () {
    if (global.timerInterval) {
        clearInterval(global.timerInterval);
        global.timerInterval = null;
    }
};

global.getCanvasBounds = function () {
    return {
        left: 0,
        right: this.canvas.width,
        top: 0,
        bottom: this.canvas.height,
    };
};

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let otherObject of global.allGameObjects) {
        if (otherObject.active && otherObject !== givenObject) {
            if (this.detectBoxCollision(givenObject, otherObject)) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
};

global.detectBoxCollision = function (gameObject1, gameObject2) {
    if (gameObject1 === gameObject2) return false;
    
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    
    return (
        box1.top <= box2.bottom &&
        box1.left <= box2.right &&
        box1.bottom >= box2.top &&
        box1.right >= box2.left
    );
};

export { global };