import { global } from "./global.js";

import * as menuManager from "../util/menuManager.js";
import * as levelManager from "../util/levelManager.js";
import * as uiManager from "../util/uiManager.js";

import * as modifierGenerator from "../util/modifierGenerator.js";

import { GameState } from "../util/menus.js";


// Game loop
function gameLoop(totalRunningTime) {
    global.deltaTime = (totalRunningTime - global.prevTotalRunningTime) / 1000;
    global.prevTotalRunningTime = totalRunningTime;

    if(global.currentLevel == 3) {
        if(global.timerRemaining == 1) {
            global.won = true;
        }
    }

    if (global.gameState.startsWith("menu")) {
        if (global.gameState == GameState.LEVEL_OVERVIEW) {
            menuManager.show(global.gameState);
            setTimeout(() => {
                if (global.gameState == GameState.LEVEL_OVERVIEW) {
                    global.gameState = GameState.MODIFIER_OVERVIEW;
                }
            }, 3000);
        } else if (global.gameState == GameState.MODIFIER_OVERVIEW && !global.modifierGenerated) {
            modifierGenerator.generate();
            global.modifierGenerated = true;
            menuManager.show(global.gameState);
        } else if (global.gameState == GameState.HEART_LOST) {
            menuManager.show(global.gameState);
            setTimeout(() => {
                if (global.gameState == GameState.HEART_LOST) {
                    global.gameState = GameState.PLAYING;
                    global.background.style.visibility = "visible";
                    levelManager.load("old");
                    global.startTimer();
                }
            }, 1000);
        } else {
            menuManager.show(global.gameState);
        }
    } else if (global.gameState == GameState.PLAYING) {
        if (global.gameFirstStart) {
            global.background.style.visibility = "visible";
            levelManager.load("new");
            global.gameFirstStart = false;
        }

        if(global.won) {
            global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

            global.stopTimer();
            global.backgroundShift = 0;
            global.isDead = false;
            global.allGameObjects = [];
            global.levelDone = false;
            global.gameFirstStart = true;

            global.reset();
            global.gameState = GameState.WON;
        }

        if (global.levelDone) {
            global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

            global.stopTimer();
            global.backgroundShift = 0;
            global.isDead = false;
            global.allGameObjects = [];
            global.currentLevel++;
            global.levelDone = false;
            global.gameFirstStart = true;

            global.reset();
            global.gameState = GameState.LEVEL_OVERVIEW;
        }

        if (global.isDead) {
            global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

            global.stopTimer();
            global.backgroundShift = 0;
            global.hearts--;
            global.isDead = false;
            global.allGameObjects = [];

            if (global.hearts == 0) {
                global.reset(true); // Full reset on permadeath
                global.gameState = GameState.GAME_OVER;
            } else {
                global.gameState = GameState.HEART_LOST;
            }
        } else {
            global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

            global.allGameObjects.forEach(obj => {
                if (obj.active) {
                    obj.storePositionOfPreviousFrame();
                    obj.update();
                    global.checkCollisionWithAnyOther(obj);
                    obj.applyGravity();
                    obj.draw();
                }
            });

            uiManager.draw();
        }
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);