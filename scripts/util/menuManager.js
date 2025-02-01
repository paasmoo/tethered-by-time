import { global } from "../modules/global.js";

// utils
import { levels } from "./levels.js";
import { GameState } from "./menus.js";
import { levelModifiers } from "./modifiers.js";


const ctx = global.ctx;

function show(name) {
    switch (name) {
        case GameState.TITLE_SCREEN:
            renderTitleScreen();
            break;
        case GameState.INFO:
            renderInfo();
            break;
        case GameState.LORE_RECAP:
            renderLoreRecap();
            break;
        case GameState.LEVEL_OVERVIEW:
            renderLevelOverview();
            break;
        case GameState.MODIFIER_OVERVIEW:
            renderModifierOverview();
            break;
        case GameState.HEART_LOST:
            renderHeartLost();
            break;
        case GameState.GAME_OVER:
            renderGameOver();
            break;
        case GameState.WON:
            renderWon();
            break;
    }
}

function drawCenteredImage(imageSrc, scale = 1, yOffset = 0) {
    let image = new Image();
    image.src = imageSrc;
    image.onload = () => {
        const x = (global.canvas.width - image.width * scale) / 2;
        const y = (global.canvas.height - image.height * scale) / 2 + yOffset;
        ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
    }
}

function drawCenteredMultilineText(text, x, y, lineHeight, size, color) {
    const lines = text.split('\n');
    const totalHeight = lines.length * lineHeight;

    let startY = y - totalHeight / 2;

    for (let i = 0; i < lines.length; i++) {
        drawText(lines[i], x, startY + (i * lineHeight), size, color);
    }
}

function drawText(text, x, y, size, color) {
    ctx.font = `${size}px 'VHSGothic', Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";

    ctx.fillText(text, x, y);
}

function drawBlackscreen() {
    global.background.style.visibility = "hidden";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, global.canvas.width, global.canvas.height);
}

function renderTitleScreen() {
    global.background.style.visibility = "hidden";

    drawCenteredImage("/images/ui/background.png");
    drawCenteredImage("/images/ui/logo.png", 1 / 3, -100);

    const playButtonState = global.buttonSelected === "play" ? "1" : "0";
    drawCenteredImage(`/images/ui/buttons/playButton${playButtonState}.png`, 1, 10);

    const infoButtonState = global.buttonSelected === "info" ? "1" : "0";
    drawCenteredImage(`/images/ui/buttons/infoButton${infoButtonState}.png`, 1, 100);

    drawText("by Pascal Pamer", global.canvas.width / 2, global.canvas.height - 5, 10, "gray")
}

function renderInfo() {
    let weightSum = 0;
    drawBlackscreen();

    levelModifiers.forEach(mod => {
        weightSum += mod.weight;
    });

    let chance = levelModifiers[global.currentInfoIndex].weight / weightSum * 100

    drawText("Modifier", global.canvas.width / 2, global.canvas.height / 2 - 150, 30, "white");

    let image = new Image();
    image.src = `../images/modifier/${levelModifiers[global.currentInfoIndex].code}.png`;
    ctx.drawImage(image, global.canvas.height - image.width / 2, global.canvas.height / 2 - 100);
    drawText(`${chance.toFixed(2)}%`, global.canvas.height, global.canvas.height / 2 + 90, 15, "cyan");
    drawText(levelModifiers[global.currentInfoIndex].name, global.canvas.height, global.canvas.height / 2 + 125, 20, "white");
    drawText(levelModifiers[global.currentInfoIndex].description, global.canvas.height, global.canvas.height / 2 + 150, 15, "gray");

    if(global.currentInfoIndex > 0) {
    image = new Image();
    image.src = `../images/ui/buttons/arrowLeft.png`;
    ctx.drawImage(image, global.canvas.height - image.width / 2 - 150, global.canvas.height / 2 - 100);
    }

    if(global.currentInfoIndex < levelModifiers.length-1) {
    image = new Image();
    image.src = `../images/ui/buttons/arrowRight.png`;
    ctx.drawImage(image, global.canvas.height - image.width / 2 + 150, global.canvas.height / 2 - 100);
    }

    drawText("Press [ ENTER ] to go back to the main menu.", global.canvas.height, global.canvas.height / 2 + 230, 12, "gray");
}

function renderLoreRecap() {
    drawBlackscreen();

    const multilineText = `Haunted by visions of a witch and an ancient artifact, Aurosa journeys to a
magical mountain. There, she discovers an artifact that manipulates time,
but it's fragile and unstable. As she climbs, the mountain changes, and
enemies stand in her way. To find the witch, she must navigate the
mountain's shifting power and unlock its secrets.`;

    const centerX = global.canvas.width / 2;
    const centerY = global.canvas.height / 2;

    drawCenteredMultilineText(multilineText, centerX, centerY - 30, 30, 17, "white", "center");
    drawText("Press [ ENTER ] to start Aurosa's journey.", centerX, centerY + 80, 15, "gray");
}

function renderLevelOverview() {
    let x = global.canvas.width / 2 - 250;
    let image;

    drawBlackscreen();

    for (let i = 0; i < 3; i++) {
        ctx.globalAlpha = global.currentLevel > i ? 1 : 0.3;

        // Level symbol
        image = new Image();
        image.src = `../images/levelSymbols/symbol${i + 1}.png`;
        ctx.drawImage(image, x - image.width / 2, global.canvas.height / 2 - 120);

        // Level text and name
        drawText(`Level ${i + 1}`, x, global.canvas.height / 2 + 60, 20, "white");
        drawText(global.currentLevel > i ? levels[i].name : "???", x, global.canvas.height / 2 + 85, 15, levels[i].nameColor);

        // Points between levels
        if (i != 2) {
            let pointY = x + image.width / 2;
            for (let j = 0; j < 3; j++) {
                ctx.globalAlpha = global.currentLevel > i + 1 ? 1 : 0.3;
                ctx.fillStyle = "white";
                ctx.fillRect(pointY, global.canvas.height / 2 - 45, 10, 10);
                pointY += 35;
            }
        }

        // Reset variables
        x += 250;
        ctx.globalAlpha = 1;
    }
}

function renderModifierOverview() {
    let x = (global.currentModifiers.length === 1) ? global.canvas.width / 2 : global.canvas.width / 2 - 150;

    drawBlackscreen();

    drawText("The artifact has chosen your fate.", global.canvas.width / 2, global.canvas.height / 2 - 150, 30, "white");

    global.currentModifiers.forEach(modifier => {
        drawText(`${modifier.chance.toFixed(2)}%`, x, global.canvas.height / 2 - 90, 10, "gray");

        const image = new Image();
        image.src = `../images/modifier/${modifier.mod.code}.png`;
        ctx.drawImage(image, x - image.width / 2, global.canvas.height / 2 - 80);

        drawText(modifier.mod.name, x, global.canvas.height / 2 + 120, 20, "white");

        x = global.canvas.width / 2 + 150;
    });

    drawText(`Press [ ENTER ] to start level ${global.currentLevel}.`, global.canvas.width / 2, global.canvas.height / 2 + 180, 15, "gray");
}

function renderGameOver() {
    drawBlackscreen();

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, global.canvas.width, global.canvas.height);

    drawText("Aurosa's adventure is over.", global.canvas.width / 2, global.canvas.height / 2, 30, "red");
    drawText("Press [ ENTER ] to go back to the main menu.", global.canvas.width / 2, global.canvas.height / 2 + 40, 15, "gray");
}

function renderWon() {
    drawBlackscreen();

    drawText("THANK YOU FOR PLAYING!", global.canvas.width / 2, global.canvas.height / 2, 30, "white");
    drawText(`You collected ${global.coinsCollected}/${global.coins.length} coins!`, global.canvas.width / 2, global.canvas.height / 2 + 40, 15, "white");
    drawText("Press [ ENTER ] to go back to the main menu.", global.canvas.width / 2, global.canvas.height / 2 + 80, 15, "gray");
}

function renderHeartLost() {
    drawBlackscreen();

    if (global.hearts > 1) {
        drawText(`${global.hearts} hearts remaining.`, global.canvas.width / 2, global.canvas.height / 2, 30, "red");
    } else {
        drawText(`${global.hearts} heart remaining.`, global.canvas.width / 2, global.canvas.height / 2, 30, "red");
    }
}


export { show };