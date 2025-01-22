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
        new BlockObject(x, currentY - 1, global.platformSize, global.platformSize, typeEnd);
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

function drawImageCentered(imageSrc, scale = 1, yOffset = 0) {
    const ctx = global.ctx;

    let image = new Image();
    image.src = imageSrc;
    image.onload = () => {
        const x = (global.canvas.width - image.width * scale) / 2;
        const y = (global.canvas.height - image.height * scale) / 2 + yOffset;
        ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
    }
}

function renderMenu() {
    const ctx = global.ctx;
    global.background.style.visibility = "hidden";

    drawImageCentered("../images/ui/background.png");
    drawImageCentered("../images/ui/logo.png", 1 / 3, -100);
    const playButtonState = global.buttonSelected === "play" ? "1" : "0";
    drawImageCentered(`../images/ui/buttons/playButton${playButtonState}.png`, 1, 10);

    const infoButtonState = global.buttonSelected === "info" ? "1" : "0";
    drawImageCentered(`../images/ui/buttons/infoButton${infoButtonState}.png`, 1, 100);

    ctx.font = "10px 'VHSGothic', Arial";
    ctx.fillStyle = "gray";
    ctx.textAlign = "center";
    ctx.fillText("by Pascal Pamer", global.canvas.width / 2, global.canvas.height - 5);
}

function renderModifier() {
    const ctx = global.ctx;
    let image;
    let y;

    ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

    global.background.style.visibility = "hidden";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, global.canvas.width, global.canvas.height);

    ctx.font = "30px 'VHSGothic', Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("The artifact has chosen your fate.", global.canvas.width / 2, global.canvas.height / 2 - 150);

    if (global.currentModifiers.length == 1) {
        y = global.canvas.width / 2;
    } else {
        y = global.canvas.width / 2 - 150;
    }

    global.currentModifiers.forEach(modifier => {
        image = new Image();
        image.src = `../images/modifier/${modifier.code}.png`;
        ctx.drawImage(image, y - image.width / 2, global.canvas.height / 2 - 80);

        ctx.font = "20px 'VHSGothic', Arial";
        ctx.fillText(modifier.name, y, global.canvas.height / 2 + 120);

        y = global.canvas.width / 2 + 150;
    });

    ctx.fillStyle = "gray";
    ctx.font = "15px 'VHSGothic', Arial";
    ctx.fillText("Press [ ENTER ] to start level 1.", global.canvas.width / 2, global.canvas.height / 2 + 180)
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

function renderDeadMenu() {
    const ctx = global.ctx;

    global.background.style.visibility = "hidden";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, global.canvas.width, global.canvas.height);

    ctx.font = "30px 'VHSGothic', Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Aurosa's adventure is over.", global.canvas.width / 2, global.canvas.height / 2);

    ctx.fillStyle = "white";
    ctx.font = "15px 'VHSGothic', Arial";
    ctx.fillText("Press [ ENTER ] to go back to the main menu.", global.canvas.width / 2, global.canvas.height / 2 + 40)
}

function drawCenteredText(text, x, y, lineHeight) {
    const ctx = global.ctx;
    const lines = text.split('\n');
    const totalHeight = lines.length * lineHeight;

    let startY = y - totalHeight / 2;

    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, startY + (i * lineHeight));
    }
}

function renderLoreScreen() {
    const ctx = global.ctx;

    global.background.style.visibility = "hidden";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, global.canvas.width, global.canvas.height);

    const multilineText = "Haunted by visions of a witch and an ancient artifact, Aurosa journeys to a\nmagical mountain. There, she discovers an artifact that manipulates time,\nbut it's fragile and unstable. As she climbs, the mountain changes, and\nenemies stand in her way. To find the witch, she must navigate the\nmountain's shifting power and unlock its secrets.";
    const lineHeight = 30;

    const centerX = global.canvas.width / 2;
    const centerY = global.canvas.height / 2;

    ctx.font = "17px 'VHSGothic', Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    drawCenteredText(multilineText, centerX, centerY - 30, lineHeight);

    ctx.fillStyle = "gray";
    ctx.font = "15px 'VHSGothic', Arial";
    ctx.fillText("Press [ ENTER ] to start Aurosa's journey.", global.canvas.width / 2, global.canvas.height / 2 + 80)
}

function drawUI() {
    const ctx = global.ctx;
    let image;
    let x;

    ctx.font = "30px 'VHSGothic', Arial";
    ctx.textAlign = "right";

    if (global.timerRemaining < 60) {
        ctx.fillStyle = "red";
    } else {
        ctx.fillStyle = "white";
    }

    ctx.fillText(global.timerRemaining, global.canvas.width - 100, 80);

    if (global.currentModifiers.length == 1) {
        x = global.canvas.width / 2;
    } else {
        x = global.canvas.width / 2 - 30;
    }

    global.currentModifiers.forEach(modifier => {
        image = new Image();
        image.src = `../images/modifier/${modifier.code}.png`;
        ctx.drawImage(image, x, 43, 60, 60);
        x = global.canvas.width / 2 + 30;
    });
}

function createHeartsUI() {
    let lastX = 20;
    let remainingHearts = global.hearts;
    for (let i = 0; i < global.maxHearts; i++) {
        if (remainingHearts <= 0) {
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

    ctx.textAlign = "right";
    ctx.fillText("x " + global.coinsCollected, 145, 135);
}


function getRandomModifiers(numModifiers) {
    const selectedModifiers = [];
    let modifiersCopy = [];

    if (numModifiers === 1) {
        const weightedPool = levelModifiers.flatMap(modifier => Array(modifier.weight).fill(modifier));

        const randomIndex = Math.floor(Math.random() * weightedPool.length);
        selectedModifiers.push(weightedPool[randomIndex]);
        console.log(weightedPool[randomIndex].weight / weightedPool.length * 100);
    } else {
        while (selectedModifiers.length < numModifiers) {
            modifiersCopy = levelModifiers;

            if(selectedModifiers.length > 0) {
                modifiersCopy.forEach(modifier => {
                    if(modifier.name === selectedModifiers[0].name) {
                        modifier.weight = modifier.weight / 2;
                    }
                });
            }

            const weightedPool = modifiersCopy.flatMap(modifier => Array(modifier.weight).fill(modifier));

            let allowedModifiers = weightedPool.filter(mod =>
                mod.code !== "nothing" && mod.code !== "allbad"
            );

            if (selectedModifiers.length > 0) {
                if (selectedModifiers[0].counter !== "none") {
                    allowedModifiers = allowedModifiers.filter(mod => mod.code !== selectedModifiers[0].counter);
                }
            }

            const randomIndex = Math.floor(Math.random() * allowedModifiers.length);
            const modifier = allowedModifiers[randomIndex];

            selectedModifiers.push(modifier);
            let test = modifier.weight / allowedModifiers.length * 100;
            console.log(`${modifier.weight} / ${allowedModifiers.length} * 100 = ${test}`)
        }
    }

    return selectedModifiers;
}


function applyModifiers() {
    const modifierCount = Math.random() < 0.5 ? 1 : 2;
    const selectedModifiers = getRandomModifiers(modifierCount);

    selectedModifiers.forEach(modifier => {
        modifier.apply();
        global.currentModifiers.push(modifier);
    });
}

function generateLevel(level) {
    level.objects.forEach(obj => {
        const [type, ...params] = obj;

        if (type === "Coin") {
            const [x, y, width, height] = params;
            const existingCoin = global.coins.find(
                coin => coin.x === x && coin.y === y && coin.width === width && coin.height === height
            );

            if (!existingCoin) {
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
    global.playerObject.switchCurrentSprites(8, 9, true);
    global.leftMoveTrigger = new MoveTrigger(99, 0, 20, 1000, "Left");
    global.rightMoveTrigger = new MoveTrigger(450, 0, 3000, 1000, "Right");
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

    global.playerObject = new Player(110, 200, 100, 100);


    global.leftMoveTrigger = new MoveTrigger(99, 0, 20, 1000, "Left");
    global.rightMoveTrigger = new MoveTrigger(450, 0, 3000, 1000, "Right");
    generateLevel(levels[0], false);

    createHeartsUI();
    createCoinsUI();
}

// Game loop
function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime;
    global.deltaTime /= 1000;
    global.prevTotalRunningTime = totalRunningTime;

    if (global.gameState == "mainMenu") {
        global.hearts = 3;
        renderMenu();
    } else if (global.gameState == "lore") {
        renderLoreScreen();
    } else if (global.gameState == "modifier") {
        if (!global.modifierGenerated) {
            applyModifiers();
            global.modifierGenerated = true;
        }

        renderModifier();
    } else if (global.gameState == "won") {
        global.hearts = 3;
        renderWinMenu();
    } else if (global.gameState == "dead") {
        renderDeadMenu();
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
            global.stopTimer();
            global.resetCanvas();
            global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
            global.hearts--;
            global.isDead = false;

            global.allGameObjects = [];

            if (global.hearts == 0) {
                global.gameState = "dead";
                global.gameFirstStart = true;
            } else {
                global.background.style.visibility = "visible";
                resetGame();
                global.startTimer();
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