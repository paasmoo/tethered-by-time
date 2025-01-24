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

// ObjectFactory for level creation
const objectFactory = {
    Block: (x, y, height, length, type) => {
        if (length === 1) {
            // Vertical column
            createBlockColumn(x, y, height, 3, 5, 6, type);
        } else if (height === 1) {
            // Horizontal row
            createBlockRow(x, y, length, 0, 1, 2, type);
        } else {
            // Full block area
            // Top row
            createBlockRow(x, y, length, 7, 8, 9, type);

            // Middle rows
            let currentY = y + global.platformSize - 1;
            for (let i = 0; i < height - 2; i++) {
                createBlockRow(x, currentY, length, 10, 11, 12, type);
                currentY += global.platformSize - 1;
            }

            // Bottom row
            createBlockRow(x, currentY, length, 13, 14, 15, type);
        }
    },
    Spike: (x, y, length, position) => {
        createSpikeRow(x, y, length, position);
    },
    Enemy: (x, y, width, height, startX, endX, speed, type, facing) =>  new Enemy(x, y, width, height, startX, endX, speed * global.enemyModifier, type, facing),
    Finish: (x, y, width, height) => new Star(x, y, width, height),
    BossEnemy: (x, y, width, height, end, speed, facing, startTime) => new BossEnemy(x, y, width, height, end, speed, facing, startTime)
}

function generateLevel(level) {
    if(global.currentLevel == 1) {
        background.style.setProperty('background-image', "url('../images/background.png')", 'important');
    } else if (global.currentLevel == 2) {
        background.style.setProperty('background-image', "url('../images/backgroundDark.png')", 'important');
    } else if (global.currentLevel == 3) {
        background.style.setProperty('background-image', "url('../images/backgroundBoss.png')", 'important')
    }

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
    generateLevel(levels[global.currentLevel - 1], true);

    if(global.currentLevel != 3) {
        global.playerObject = new Player(120, 200, 100, 100);
        global.rightMoveTrigger = new MoveTrigger(450, -500, 3000, 1000, "Right");
    } else {
        global.playerObject = new Player(global.canvas.width / 2 - 50, 400, 100, 100);
    }
    global.leftMoveTrigger = new MoveTrigger(100, 0, 20, 1000, "Left");

    global.coins.forEach(coin => {
        new Coin(coin.x, coin.y, coin.width, coin.height, coin.active);
    });

    uiManager.drawHeartsAndCoins();
}

function setupGame() {
    generateLevel(levels[global.currentLevel - 1], false);

    if(global.currentLevel != 3) {
        global.playerObject = new Player(120, 100, 100, 100);
        global.rightMoveTrigger = new MoveTrigger(450, -500, 3000, 1000, "Right");
    } else {
        global.playerObject = new Player(global.canvas.width / 2 - 50, 400, 100, 100);
    }
    
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
