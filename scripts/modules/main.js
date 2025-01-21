import { global } from "./global.js";
import { Skeleton } from "../gameObjects/skeleton.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { Star } from "../gameObjects/star.js";
import { Enemy } from "../gameObjects/enemy.js";
import { gameModifiers } from "../gameModifiers.js";
import { levels } from "../util/levels.js";
import { Heart } from "../gameObjects/ui/heart.js";
import { Coin } from "../gameObjects/coin.js";
import { CoinUI } from "../gameObjects/ui/coin.js";

function renderMenu() {
    const ctx = global.ctx;

    global.background.style.visibility = "hidden";
    ctx.font = "48px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Tethered by Time", global.canvas.width / 2, global.canvas.height / 2 - 50);
    ctx.font = "24px Arial";
    ctx.fillText("Press [ ENTER ] to Start", global.canvas.width / 2, global.canvas.height / 2 + 20)
}

function renderWinMenu() {
    const ctx = global.ctx;

    global.background.style.visibility = "hidden";
    ctx.font = "48px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("YOU WIN!", global.canvas.width / 2, global.canvas.height / 2 - 50);
    ctx.font = "24px Arial";
    ctx.fillText("Press [ ENTER ] to Restart", global.canvas.width / 2, global.canvas.height / 2 + 20)
}

function drawUI() {
    const ctx = global.ctx;

    ctx.font = "30px 'VHSGothic', Arial";
    
    if(global.timerRemaining < 60) {
        ctx.fillStyle = "red";
    } else {
        ctx.fillStyle = "white";
    }

    const seconds = global.timerRemaining;
    const timeString = `${seconds < 10 ? "0" + seconds : seconds}`;
    ctx.fillText(timeString, global.canvas.width - 100, 80);
}

function getRandomModifiers(numModifiers) {
    const selectedModifiers = [];

    while (selectedModifiers.length < numModifiers) {
        const randomIndex = Math.floor(Math.random() * gameModifiers.length);
        const modifier = gameModifiers[randomIndex];

        if (!selectedModifiers.includes(modifier)) {
            selectedModifiers.push(modifier);
        }
    }

    return selectedModifiers;
}

function applyModifiers() {
    const selectedModifiers = getRandomModifiers(1);

    selectedModifiers.forEach(modifier => {
        modifier.apply();
        console.log(modifier.name);
    });
}

function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime;
    global.deltaTime /= 1000;
    global.prevTotalRunningTime = totalRunningTime;

    if (global.gameState == "mainMenu") {
        global.hearts = 3;
        renderMenu();
    } else if (global.gameState == "generateModifier") {

    } else if (global.gameState == "won") {
        global.hearts = 3;
        renderWinMenu();
    } else if (global.gameState == "level1") {
        if (global.gameFirstStart) {
            global.background.style.visibility = "visible";
            setupGame();
            global.gameFirstStart = false;
            global.backgroundShift = 0;
        }

        if (global.levelDone == true) {
            global.stopTimer();
            global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
            global.gameState = "won";
            global.gameFirstStart = true;
            global.levelDone = false;
            global.allGameObjects = [];
        } else if (global.isDead) {
            global.resetCanvas();
            global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
            global.hearts--;
            global.isDead = false;

            global.allGameObjects = [];

            if (global.hearts == 0) {
                global.stopTimer();
                global.gameState = "mainMenu";
                global.gameFirstStart = true;
            } else {
                global.background.style.visibility = "visible";
                resetGame();
            }
        } else {
            global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 

            for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
                if (global.allGameObjects[i].active == true) {
                    global.allGameObjects[i].storePositionOfPreviousFrame();
                    global.allGameObjects[i].update();
                    global.checkCollisionWithAnyOther(global.allGameObjects[i]);
                    global.allGameObjects[i].applyGravity();
                    global.allGameObjects[i].draw();
                }
            }

            writeCoins();
            drawUI();
        }
    }

    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

const objectFactory = {
    Block: (x, y, width, height) => new BlockObject(x, y, width, height),
    Enemy: (x, y, width, height, startX, endX, speed) => new Enemy(x, y, width, height, startX, endX, speed),
    Finish: (x, y, width, height) => new Star(x, y, width, height)
}

function generateLevel(level) {
    level.objects.forEach(obj => {
        const [type, ...params] = obj;
        
        if(type === "Coin") {
            const [x, y, width, height] = params;
            const existingCoin = global.coins.find(
                coin => coin.x === x && coin.y === y && coin.width === width && coin.height === height
            );

            if(!existingCoin) {
                const coin = new Coin(x, y, width, height);
                global.coins.push(coin);
            }
        } else {
            
            const createObject = objectFactory[type];
            createObject(...params);
        }  
    });
}

function createHeartsUI() {
    let lastX = 20;
    let remainingHearts = global.hearts;
    for(let i=0;i<global.maxHearts;i++) {
        if(remainingHearts <= 0) {
            new Heart(lastX, 20, 100, 100, true)
        } else {
            new Heart(lastX, 20, 100, 100);
        }

        lastX = lastX + 70;
        remainingHearts--;
    }
}

function createCoinsUI() {
    new CoinUI(40, 100, 60, 60);
}

function writeCoins() {
    let ctx = global.ctx;

    ctx.font = "20px 'VHSGothic', Arial";
    ctx.fillStyle = "white";

    ctx.fillText("x "+global.coinsCollected, 125, 135);
}

function resetGame() {
    global.playerObject = new Skeleton(100, 200, 100, 100);
    global.playerObject.switchCurrentSprites(8,9, true);
    global.leftMoveTrigger = new MoveTrigger(100, 100, 20, 900, 100, "Left");
    global.rightMoveTrigger = new MoveTrigger(450, 100, 1000, 900, -100, "Right");
    generateLevel(levels[0], true);
    global.coins.forEach(coin => {
        new Coin(coin.x, coin.y, coin.width, coin.height, coin.active);
    });

    createHeartsUI();
    createCoinsUI();
}

function setupGame() {
    global.startTimer();
    global.coins = [];
    global.coinsCollected = 0;

    global.playerObject = new Skeleton(100, 200, 100, 100);
    

    global.leftMoveTrigger = new MoveTrigger(99, 100, 20, 900, 100, "Left");
    global.rightMoveTrigger = new MoveTrigger(450, 100, 1000, 900, -100, "Right");
    generateLevel(levels[0], false);

    createHeartsUI();
    createCoinsUI();

    applyModifiers();
}

requestAnimationFrame(gameLoop);