import { global } from "../modules/global.js";

// Util
import { levels } from "../util/levels.js";

// UI objects
import * as uiManager from "../util/uiManager.js";

// Game objects
import { Player } from "../gameObjects/player.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { Enemy } from "../gameObjects/enemy.js";
import { Star } from "../gameObjects/star.js";
import { Coin } from "../gameObjects/coin.js";
import { Spike } from "../gameObjects/spike.js";
import { BossEnemy } from "../gameObjects/bossEnemy.js";

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

const createBlockRow = (x, y, length, spriteStart, spriteMiddle, spriteEnd, type) => {
    new BlockObject(x, y, global.platformSize, global.platformSize, spriteStart, type);
    let currentX = x + global.platformSize - 1;

    for (let i = 0; i < length - 2; i++) {
        new BlockObject(currentX, y, global.platformSize, global.platformSize, spriteMiddle, type);
        currentX += global.platformSize - 1;
    }

    if (length > 1) {
        new BlockObject(currentX, y, global.platformSize, global.platformSize, spriteEnd, type);
    }
}

const createBlockColumn = (x, y, height, spriteStart, spriteMiddle, spriteEnd, type) => {
    new BlockObject(x, y, global.platformSize, global.platformSize, spriteStart, type);
    let currentY = y + global.platformSize - 5;

    for (let i = 0; i < height - 2; i++) {
        new BlockObject(x, currentY, global.platformSize, global.platformSize, spriteMiddle, type);
        currentY += global.platformSize - 5;
    }

    if (height > 1) {
        new BlockObject(x, currentY - 5, global.platformSize, global.platformSize, spriteEnd, type);
    }
}

const createSpikeRow = (x, y, length, position) => {
    let currentY = y;
    let currentX = x;
    const size = global.platformSize / 2;

    for(let i = 0; i < length; i++) {
        new Spike(currentX, currentY, size, size, position);
        if(position == 1 || position == 3) {
            currentY += size;
        } else {
            currentX += size;
        }
    }
}

const objectFactory = {
    Block: (x, y, height, length, type) => {
        if (length === 1) {
            createBlockColumn(x, y, height, 3, 5, 6, type);
        } else if (height === 1) {
            createBlockRow(x, y, length, 0, 1, 2, type);
        } else {
            createBlockRow(x, y, length, 7, 8, 9, type);
            let currentY = y + global.platformSize - 1;
            for (let i = 0; i < height - 2; i++) {
                createBlockRow(x, currentY, length, 10, 11, 12, type);
                currentY += global.platformSize - 1;
            }
            createBlockRow(x, currentY, length, 13, 14, 15, type);
        }
    },
    Spike: (x, y, length, position) => {
        createSpikeRow(x, y, length, position);
    },
    Enemy: (x, y, width, height, startX, endX, speed, type, facing) =>  new Enemy(x, y, width, height, startX, endX, speed * global.enemyModifier, type, facing),
    Finish: (x, y, width, height) => new Star(x, y, width, height),
    BossEnemy: (x, y, width, height, end, speed, facing, startTime) => new BossEnemy(x, y, width, height, end, speed, facing, startTime),
    Coin: (x, y, width, height) => {
        const existingCoin = global.coins.find(coin => coin.x === x && coin.y === y);
        if (!existingCoin) {
            const coin = new Coin(x, y, width, height);
            global.coins.push(coin);
        }
    }
};

function generateLevel(level) {
    const backgrounds = {
        1: "url('../images/background.png')",
        2: "url('../images/backgroundDark.png')",
        3: "url('../images/backgroundBoss.png')"
    };
    background.style.setProperty('background-image', backgrounds[global.currentLevel], 'important');

    global.timerDuration = level.time;

    if (global.gameFirstStart) {
        applyModifiers();
    }

    level.objects.forEach(obj => {
        const [type, ...params] = obj;
        objectFactory[type]?.(...params);
    });
}

function createPlayer() {
    const x = global.currentLevel !== 3 ? 120 : global.canvas.width / 2 - 50;
    const y = global.currentLevel !== 3 ? 100 : 400;
    return new Player(x, y, 100, 100);
}

function resetGame() {
    generateLevel(levels[global.currentLevel - 1], true);
    global.playerObject = createPlayer();
    global.rightMoveTrigger = new MoveTrigger(450, -500, 3000, 1000, "Right");
    global.leftMoveTrigger = new MoveTrigger(100, 0, 20, 1000, "Left");
    uiManager.drawHeartsAndCoins();
}

function setupGame() {
    generateLevel(levels[global.currentLevel - 1], false);
    global.playerObject = createPlayer();
    global.rightMoveTrigger = new MoveTrigger(450, -500, 3000, 1000, "Right");
    global.leftMoveTrigger = new MoveTrigger(99, 0, 20, 1000, "Left");
    uiManager.drawHeartsAndCoins();
    global.startTimer();
}

function applyModifiers() {
    global.currentModifiers.forEach(modifier => {
        modifier.mod.apply();
    });
}

export { load };