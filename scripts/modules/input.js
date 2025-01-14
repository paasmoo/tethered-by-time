import { global } from "./global.js";

function move(event) {

    if(global.gameState != "mainMenu") {
        switch(event.key) {
            case "d":
                if (global.playerObject.xVelocity == 0)
                    global.playerObject.switchCurrentSprites(27, 35);
                global.playerObject.xVelocity = 200;
                global.playerObject.yVelocity = 0;
                console.log("velocity set");
                break;
            case "a":
                if (global.playerObject.xVelocity == 0)
                    global.playerObject.switchCurrentSprites(9, 17);
                global.playerObject.xVelocity = -200;
                global.playerObject.yVelocity = 0;
                break;
            case " ":
                global.playerObject.setJumpForce(.8);
                break;
        }
    }
}

function stop(event) {
    if(global.gameState != "mainMenu") {
        switch(event.key) {
            case "d":
                global.playerObject.xVelocity = 0;
                break;
            case "a":
                global.playerObject.xVelocity = 0;
                break;   
        }
    }
}

function menu(event) {
    switch(event.key) {
        case "Enter":
            if(global.gameState == "mainMenu") {
                global.gameState = "level1";
            }
    }
}

document.addEventListener("keydown", menu);

document.addEventListener("keypress", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);