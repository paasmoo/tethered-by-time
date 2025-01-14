import { global } from "./global.js";
import { Skeleton } from "../gameObjects/skeleton.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";

function renderMenu() {
    const ctx = global.ctx;
    
    ctx.font = "48px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Tethered by Time", global.canvas.width / 2, global.canvas.height / 2 - 50);
    ctx.font = "24px Arial";
    ctx.fillText("Press [ ENTER ] to Start", global.canvas.width / 2, global.canvas.height / 2 + 20)
}

function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime;

    if(global.gameState == "mainMenu") {
        renderMenu();
    } else if(global.gameState == "level1") {
        if(global.gameFirstStart) {
            global.background.style.visibility = "visible";
            setupGame();
            global.gameFirstStart = false;
        }
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
    }
    
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {
    global.playerObject = new Skeleton(300, 1000, 128, 128);
    global.leftMoveTrigger = new MoveTrigger(100, 100, 20, 900, 100);
    global.rightMoveTrigger = new MoveTrigger(800, 100, 20, 900, -100);
    new BlockObject(0, 1000, 1000, 500);

    new BlockObject(1100, 1000, 1000, 500);
    //new BlockObject(300, 400, 50, 50);
    // setup your game here - means: Create instances of the GameObjects that belong to your game.
    // e.g.: 
    /*    
                global.playerObject = new PacMan(200, 300, 60, 60);
                new Wall(0, 0, 100, 100);
                new Candy(100, 100, 100, 100);
    }*/
   
}

requestAnimationFrame(gameLoop);