import { global } from "./global.js";

let dActive = false;
let aActive = false;

function move(event) {

    if (global.gameState != "mainMenu" && global.gameState != "won") {
        switch (event.key) {
            case "d":
                if (!dActive) {
                    global.playerObject.switchCurrentSprites(0, 3);
                }
                global.playerObject.xVelocity = 200 * global.modifier;
                global.playerObject.yVelocity = 0;
                dActive = true;
                break;
            case "a":
                if (!aActive) {
                    global.playerObject.switchCurrentSprites(4, 7);
                }
                global.playerObject.xVelocity = -200 * global.modifier;
                global.playerObject.yVelocity = 0;
                aActive = true;
                break;
            case " ":
                global.playerObject.setJumpForce(.8);
                break;
        }
    }
}

function stop(event) {
    if (global.gameState != "mainMenu" && global.gameState != "won") {
        switch (event.key) {
            case "d":
                dActive = false;
                if (!aActive) {
                    global.playerObject.switchCurrentSprites(8, 9);
                    global.playerObject.xVelocity = 0;
                }
                break;
            case "a":
                aActive = false;
                if (!dActive) {
                    global.playerObject.switchCurrentSprites(10, 11);
                    global.playerObject.xVelocity = 0;
                }
                break;
        }
    }
}

function menu(event) {
    switch (event.key) {
        case "Enter":
            if (global.gameState == "mainMenu") {
                global.gameState = "level1";
            } else if (global.gameState == "won") {
                global.resetCanvas();
                global.gameState = "mainMenu";

            }
    }
}

document.addEventListener("keydown", menu);

document.addEventListener("keypress", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);