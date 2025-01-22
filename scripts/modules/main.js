import { global } from "./global.js";

import { levelModifiers } from "../util/modifiers.js";

import * as menuManager from "../util/menuManager.js";
import * as levelManager from "../util/levelManager.js";

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
        image.src = `../images/modifier/${modifier.mod.code}.png`;
        ctx.drawImage(image, x, 43, 60, 60);
        x = global.canvas.width / 2 + 40;
    });
}

function getRandomModifiers() {
    const numModifiers = Math.random() < 0.5 ? 1 : 2;

    const selectedModifiers = [];
    let modifiersCopy = [];

    if (numModifiers === 1) {
        const weightedPool = levelModifiers.flatMap(modifier => Array(modifier.weight).fill(modifier));

        const randomIndex = Math.floor(Math.random() * weightedPool.length);
        let chancePercent = weightedPool[randomIndex].weight / weightedPool.length * 100;
        selectedModifiers.push({ mod: weightedPool[randomIndex], chance: chancePercent });
    } else {
        while (selectedModifiers.length < numModifiers) {
            modifiersCopy = levelModifiers;

            if (selectedModifiers.length > 0) {
                modifiersCopy.forEach(modifier => {
                    if (modifier.name === selectedModifiers[0].mod.name) {
                        modifier.weight = modifier.weight / 2;
                    }
                });
            }

            const weightedPool = modifiersCopy.flatMap(modifier => Array(modifier.weight).fill(modifier));

            let allowedModifiers = weightedPool.filter(mod =>
                mod.code !== "nothing" && mod.code !== "allbad"
            );

            if (selectedModifiers.length > 0) {
                if (selectedModifiers[0].mod.counter !== "none") {
                    allowedModifiers = allowedModifiers.filter(mod => mod.code !== selectedModifiers[0].mod.counter);
                }
            }

            const randomIndex = Math.floor(Math.random() * allowedModifiers.length);
            const modifier = allowedModifiers[randomIndex];

            let chancePercent = modifier.weight / allowedModifiers.length * 100;
            selectedModifiers.push({ mod: modifier, chance: chancePercent });
        }
    }

    return selectedModifiers;
}

function generateModifiers() {
    const selectedModifiers = getRandomModifiers();

    selectedModifiers.forEach(modifier => {
        global.currentModifiers.push({ mod: modifier.mod, chance: modifier.chance });
    });
}

function writeCoins() {
    let ctx = global.ctx;

    ctx.font = "20px 'VHSGothic', Arial";
    ctx.fillStyle = "white";

    ctx.textAlign = "right";
    ctx.fillText("x " + global.coinsCollected, 145, 135);
}

// Game loop
function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime;
    global.deltaTime /= 1000;
    global.prevTotalRunningTime = totalRunningTime;

    if (global.gameState == "mainMenu") {
        global.hearts = 3;
        menuManager.show("titleScreen");
    } else if (global.gameState == "lore") {
        menuManager.show("loreRecap")
    } else if (global.gameState == "showLevel") {
        menuManager.show("levelOverview")
        setTimeout(() => {
            if (global.gameState === "showLevel") { // Stelle sicher, dass sich der Zustand nicht geändert hat
                global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
                global.gameState = "modifier";
            }
        }, 500);
    } else if (global.gameState == "modifier") {
        if (!global.modifierGenerated) {
            generateModifiers();
            global.modifierGenerated = true;
        }
        menuManager.show("modifierOverview")
    } else if (global.gameState == "dead") {
        menuManager.show("permadeath");
    } else if (global.gameState == "level1") {
        if (global.gameFirstStart) {
            global.background.style.visibility = "visible";
            levelManager.load("new");
            global.gameFirstStart = false;
            global.backgroundShift = 0;
        }

        if (global.levelDone == true) {
            global.stopTimer();
            global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
            global.gameState = "showLevel";
            global.resetModifier();
            global.currentLevel++;
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
                global.currentLevel = 1;
                global.gameFirstStart = true;
            } else {
                global.background.style.visibility = "visible";
                levelManager.load("old");
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