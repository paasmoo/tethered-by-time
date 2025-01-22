import { global } from "./global.js";

// Util
import { levelModifiers } from "../util/modifiers.js";
import { levels } from "../util/levels.js";

// UI objects
import { CoinUI } from "../gameObjects/ui/coin.js";
import { Heart } from "../gameObjects/ui/heart.js";

// Game objects
import { Player } from "../gameObjects/player.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { Enemy } from "../gameObjects/enemy.js";
import { Star } from "../gameObjects/star.js";
import { Coin } from "../gameObjects/coin.js";

const createBlockRow = (x, y, length, typeStart, typeMiddle, typeEnd) => {
    new BlockObject(x, y, global.platformSize, global.platformSize, typeStart);
    let currentX = x + global.platformSize - 1;

    for (let i = 0; i < length - 2; i++) {
        new BlockObject(currentX, y, global.platformSize, global.platformSize, typeMiddle);
        currentX += global.platformSize - 1;
    }

    if (length > 1) {
        new BlockObject(currentX, y, global.platformSize, global.platformSize, typeEnd);
    }
}

const createBlockColumn = (x, y, height, typeStart, typeMiddle, typeEnd) => {
    new BlockObject(x, y, global.platformSize, global.platformSize, typeStart);
    let currentY = y + global.platformSize - 1;

    for (let i = 0; i < height - 2; i++) {
        new BlockObject(x, currentY, global.platformSize, global.platformSize, typeMiddle);
        currentY += global.platformSize - 1;
    }

    if (height > 1) {
        new BlockObject(x, currentY, global.platformSize, global.platformSize, typeEnd);
    }
}

// ObjectFactory for level creation
const objectFactory = {
    Block: (x, y, height, length) => {
        if (length === 1) {
            // Vertical column
            createBlockColumn(x, y, height, 3, 5, 6);
        } else if (height === 1) {
            // Horizontal row
            createBlockRow(x, y, length, 0, 1, 2);
        } else {
            // Full block area
            // Top row
            createBlockRow(x, y, length, 7, 8, 9);
    
            // Middle rows
            let currentY = y + global.platformSize - 1;
            for (let i = 0; i < height - 2; i++) {
                createBlockRow(x, currentY, length, 10, 11, 12);
                currentY += global.platformSize - 1;
            }
    
            // Bottom row
            createBlockRow(x, currentY, length, 13, 14, 15);
        }
    },
    Enemy: (x, y, width, height, startX, endX, speed) => new Enemy(x, y, width, height, startX, endX, speed),
    Finish: (x, y, width, height) => new Star(x, y, width, height)
}

function renderMenu() {
    const ctx = global.ctx;
    global.background.style.visibility = "hidden";

    let image = new Image();
    image.src = "../images/ui/background.png";
    ctx.drawImage(image, 0, 0, image.width, image.height);

    image = new Image();
    image.src = "../images/ui/logo.png";
    ctx.drawImage(image, (global.canvas.width - image.width/3) / 2, (global.canvas.height - image.height/3) / 2 - 60, image.width/3, image.height/3);

    ctx.font = "48px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
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

function getRandomModifiers(numModifiers) {
    const selectedModifiers = [];

    while (selectedModifiers.length < numModifiers) {
        const randomIndex = Math.floor(Math.random() * levelModifiers.length);
        const modifier = levelModifiers[randomIndex];

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

function resetGame() {
    global.playerObject = new Player(100, 200, 100, 100);
    global.playerObject.switchCurrentSprites(8,9, true);
    global.leftMoveTrigger = new MoveTrigger(100, 100, 20, 2900, 500, "Left");
    global.rightMoveTrigger = new MoveTrigger(450, 100, 3000, 900, -500, "Right");
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

    global.playerObject = new Player(100, 200, 100, 100);
    

    global.leftMoveTrigger = new MoveTrigger(99, 100, 20, 2900, 500, "Left");
    global.rightMoveTrigger = new MoveTrigger(450, 100, 3000, 900, -500, "Right");
    generateLevel(levels[0], false);

    createHeartsUI();
    createCoinsUI();

    applyModifiers();
}

// Game loop
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

requestAnimationFrame(gameLoop);