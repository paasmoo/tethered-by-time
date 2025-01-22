import { global } from "./global.js";

let dActive = false;
let aActive = false;

function move(event) {

    if (global.gameState != "mainMenu" && global.gameState != "won" && global.gameState != "dead") {
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
    if (global.gameState != "mainMenu" && global.gameState != "won" && global.gameState != "dead") {
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
        case "s":
            if (global.gameState == "mainMenu") {
                if(global.buttonSelected != "info") {
                    global.buttonSelected = "info"
                }
            }
            break;
        case "w":
            if (global.gameState == "mainMenu") {
                if(global.buttonSelected != "play") {
                    global.buttonSelected = "play";
                }
            }
            break;
        case "Enter":
            if (global.gameState == "mainMenu") {
                if(global.buttonSelected == "play") {
                    global.gameState = "level1";
                }
            } else if (global.gameState == "won") {
                global.gameState = "mainMenu";
                global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); 
            } else if (global.gameState == "dead") {
                global.gameState = "mainMenu";
                global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); 
            }
    }
}

document.addEventListener("keydown", menu);

document.addEventListener("keypress", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);