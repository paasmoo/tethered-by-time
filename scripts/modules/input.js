import { global } from "./global.js";
import { GameState } from "../util/menus.js";
import { levelModifiers } from "../util/modifiers.js";

let dActive = false;
let aActive = false;

function moveRight() {
    if (!dActive) global.playerObject.switchCurrentSprites(0, 3);
    global.playerObject.xVelocity = 200 * global.moveModifier;
    global.playerObject.yVelocity = 0;
    dActive = true;
}

function moveLeft() {
    if (!aActive) global.playerObject.switchCurrentSprites(4, 7);
    global.playerObject.xVelocity = -200 * global.moveModifier;
    global.playerObject.yVelocity = 0;
    aActive = true;
}

function stopMovingRight() {
    dActive = false;
    if (!aActive) {
        global.playerObject.switchCurrentSprites(8, 9);
        global.playerObject.xVelocity = 0;
    }
}

function stopMovingLeft() {
    aActive = false;
    if (!dActive) {
        global.playerObject.switchCurrentSprites(10, 11);
        global.playerObject.xVelocity = 0;
    }
}

function move(event) {
    if (global.gameState !== GameState.PLAYING) return;
    
    const keyActions = {
        "d": global.inputSwitched ? moveLeft : moveRight,
        "a": global.inputSwitched ? moveRight : moveLeft,
        " ": () => global.playerObject.setJumpForce(0.8)
    };
    
    if (keyActions[event.key]) keyActions[event.key]();
}

function stop(event) {
    if (global.gameState !== GameState.PLAYING) return;
    
    const keyActions = {
        "d": global.inputSwitched ? stopMovingLeft : stopMovingRight,
        "a": global.inputSwitched ? stopMovingRight : stopMovingLeft
    };
    
    if (keyActions[event.key]) keyActions[event.key]();
}

function menu(event) {
    const menuActions = {
        "d": () => {
            if (global.gameState === GameState.INFO && global.currentInfoIndex < levelModifiers.length - 1) {
                global.currentInfoIndex++;
            }
        },
        "a": () => {
            if (global.gameState === GameState.INFO && global.currentInfoIndex > 0) {
                global.currentInfoIndex--;
            }
        },
        "s": () => {
            if (global.gameState === GameState.TITLE_SCREEN && global.buttonSelected !== "info") {
                global.buttonSelected = "info";
            }
        },
        "w": () => {
            if (global.gameState === GameState.TITLE_SCREEN && global.buttonSelected !== "play") {
                global.buttonSelected = "play";
            }
        },
        "Enter": () => {
            switch (global.gameState) {
                case GameState.TITLE_SCREEN:
                    global.buttonSelected === "play" ? (global.reset(true), global.gameState = GameState.LORE_RECAP) : global.gameState = GameState.INFO;
                    break;
                case GameState.INFO:
                    global.currentInfoIndex = 0;
                    global.gameState = GameState.TITLE_SCREEN;
                    break;
                case GameState.LORE_RECAP:
                    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
                    global.gameState = GameState.LEVEL_OVERVIEW;
                    break;
                case GameState.MODIFIER_OVERVIEW:
                    global.gameState = GameState.PLAYING;
                    break;
                case GameState.GAME_OVER:
                case GameState.WON:
                    global.gameState = GameState.TITLE_SCREEN;
                    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
                    break;
            }
        }
    };
    
    if (menuActions[event.key]) menuActions[event.key]();
}

document.addEventListener("keydown", menu);
document.addEventListener("keypress", move);
document.addEventListener("keyup", stop);