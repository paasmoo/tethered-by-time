import { global } from "../modules/global.js";

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

function load(name) {
    switch (name) {
        case "new":
            setupGame();
            break;
        case "old":
            resetGame();
            break;
    }
}

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
    Enemy: (x, y, width, height, startX, endX, speed) => new Enemy(x, y, width, height, startX, endX, speed * global.enemyModifier),
    Finish: (x, y, width, height) => new Star(x, y, width, height)
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

function generateLevel(level) {
    global.timerDuration = level.time;

    if (global.gameFirstStart) {
        applyModifiers();
    }

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
    generateLevel(levels[global.currentLevel - 1], true);
    global.coins.forEach(coin => {
        new Coin(coin.x, coin.y, coin.width, coin.height, coin.active);
    });

    createHeartsUI();
    createCoinsUI();
}

function setupGame() {
    global.coins = [];
    global.coinsCollected = 0;

    global.playerObject = new Player(110, 200, 100, 100);


    global.leftMoveTrigger = new MoveTrigger(99, 0, 20, 1000, "Left");
    global.rightMoveTrigger = new MoveTrigger(450, 0, 3000, 1000, "Right");
    generateLevel(levels[global.currentLevel - 1], false);

    createHeartsUI();
    createCoinsUI();

    global.startTimer();
}

function applyModifiers() {
    global.currentModifiers.forEach(modifier => {
        modifier.mod.apply();
    });
}

export { load };