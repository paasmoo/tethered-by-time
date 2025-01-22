import { global } from "./global.js";

import { GameState } from "../util/menus.js";

let dActive = false;
let aActive = false;

function moveRight() {
    if (!dActive) {
        global.playerObject.switchCurrentSprites(0, 3);
    }
    global.playerObject.xVelocity = 200 * global.moveModifier;
    global.playerObject.yVelocity = 0;
    dActive = true;
}

function moveLeft() {
    if (!aActive) {
        global.playerObject.switchCurrentSprites(4, 7);
    }
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
    if (global.gameState == GameState.PLAYING) {
        switch (event.key) {
            case "d":
                if (global.inputSwitched) {
                    moveLeft();
                } else {
                    moveRight();
                }
                break;
            case "a":
                if (global.inputSwitched) {
                    moveRight();
                } else {
                    moveLeft();
                }
                break;
            case " ":
                global.playerObject.setJumpForce(.8);
                break;
        }
    }
}

function stop(event) {
    if (global.gameState == GameState.PLAYING) {
        switch (event.key) {
            case "d":
                if (global.inputSwitched) {
                    stopMovingLeft();
                } else {
                    stopMovingRight();
                }
                break;
            case "a":
                if (global.inputSwitched) {
                    stopMovingRight();
                } else {
                    stopMovingLeft();
                }
                break;
        }
    }
}

function menu(event) {
    switch (event.key) {
        case "s":
            if (global.gameState == GameState.TITLE_SCREEN) {
                if (global.buttonSelected != "info") {
                    global.buttonSelected = "info"
                }
            }
            break;
        case "w":
            if (global.gameState == GameState.TITLE_SCREEN) {
                if (global.buttonSelected != "play") {
                    global.buttonSelected = "play";
                }
            }
            break;
        case "Enter":
            if (global.gameState == GameState.TITLE_SCREEN) {
                if (global.buttonSelected == "play") {
                    global.reset(true);
                    global.gameState = GameState.LORE_RECAP;
                }
            } else if (global.gameState == GameState.LORE_RECAP) {
                global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
                global.gameState = GameState.LEVEL_OVERVIEW;
            } else if (global.gameState == GameState.MODIFIER_OVERVIEW) {
                global.gameState = GameState.PLAYING;
            } else if (global.gameState == GameState.GAME_OVER) {
                global.gameState = GameState.TITLE_SCREEN;
                global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
            }
    }
}

document.addEventListener("keydown", menu);

document.addEventListener("keypress", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);