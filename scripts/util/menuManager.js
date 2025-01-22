import { global } from "../modules/global.js";
import { levels } from "./levels.js";

function show(name) {
    switch (name) {
        case "titleScreen":
            renderMenu();
            break;
        case "loreRecap":
            renderLoreScreen();
            break;
        case "levelOverview":
            renderLevelScreen();
            break;
        case "modifierOverview":
            renderModifier();
            break;
        case "permadeath":
            renderDeadMenu();
            break;
    }
}

function drawImageCentered(imageSrc, scale = 1, yOffset = 0) {
    const ctx = global.ctx;

    let image = new Image();
    image.src = imageSrc;
    image.onload = () => {
        const x = (global.canvas.width - image.width * scale) / 2;
        const y = (global.canvas.height - image.height * scale) / 2 + yOffset;
        ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
    }
}

function drawCenteredText(text, x, y, lineHeight) {
    const ctx = global.ctx;
    const lines = text.split('\n');
    const totalHeight = lines.length * lineHeight;

    let startY = y - totalHeight / 2;

    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, startY + (i * lineHeight));
    }
}

function renderMenu() {
    const ctx = global.ctx;
    global.background.style.visibility = "hidden";

    drawImageCentered("../images/ui/background.png");
    drawImageCentered("../images/ui/logo.png", 1 / 3, -100);
    const playButtonState = global.buttonSelected === "play" ? "1" : "0";
    drawImageCentered(`../images/ui/buttons/playButton${playButtonState}.png`, 1, 10);

    const infoButtonState = global.buttonSelected === "info" ? "1" : "0";
    drawImageCentered(`../images/ui/buttons/infoButton${infoButtonState}.png`, 1, 100);

    ctx.font = "10px 'VHSGothic', Arial";
    ctx.fillStyle = "gray";
    ctx.textAlign = "center";
    ctx.fillText("by Pascal Pamer", global.canvas.width / 2, global.canvas.height - 5);
}

function renderLoreScreen() {
    const ctx = global.ctx;

    global.background.style.visibility = "hidden";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, global.canvas.width, global.canvas.height);

    const multilineText = "Haunted by visions of a witch and an ancient artifact, Aurosa journeys to a\nmagical mountain. There, she discovers an artifact that manipulates time,\nbut it's fragile and unstable. As she climbs, the mountain changes, and\nenemies stand in her way. To find the witch, she must navigate the\nmountain's shifting power and unlock its secrets.";
    const lineHeight = 30;

    const centerX = global.canvas.width / 2;
    const centerY = global.canvas.height / 2;

    ctx.font = "17px 'VHSGothic', Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    drawCenteredText(multilineText, centerX, centerY - 30, lineHeight);

    ctx.fillStyle = "gray";
    ctx.font = "15px 'VHSGothic', Arial";
    ctx.fillText("Press [ ENTER ] to start Aurosa's journey.", global.canvas.width / 2, global.canvas.height / 2 + 80)
}

function renderLevelScreen() {
    const ctx = global.ctx;
    let y = global.canvas.width / 2 - 250;
    let image;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    global.background.style.visibility = "hidden";

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 3; i++) {
        if (global.currentLevel > i) {
            ctx.globalAlpha = 1;
        } else {
            ctx.globalAlpha = 0.3;
        }

        image = new Image();
        image.src = `../images/levelSymbols/symbol${i + 1}.png`;
        ctx.drawImage(image, y - image.width / 2, global.canvas.height / 2 - 120);

        ctx.fillStyle = "white";
        ctx.font = "20px 'VHSGothic', Arial";
        ctx.textAlign = "center";
        ctx.fillText(`Level ${i + 1}`, y, global.canvas.height / 2 + 60);

        ctx.fillStyle = levels[i].nameColor;
        ctx.font = "15px 'VHSGothic', Arial";
        ctx.textAlign = "center";
        if (global.currentLevel > i) {
            ctx.fillText(`${levels[i].name}`, y, global.canvas.height / 2 + 85);
        } else {
            ctx.fillText(`???`, y, global.canvas.height / 2 + 85);
        }

        if (i != 2) {
            ctx.fillStyle = "white";
            let pointY = y + image.width / 2;
            for (let j = 0; j < 3; j++) {
                if (global.currentLevel > i + 1) {
                    ctx.globalAlpha = 1;
                } else {
                    ctx.globalAlpha = 0.3;
                }
                ctx.fillRect(pointY, global.canvas.height / 2 - 45, 10, 10);
                pointY += 35;
            }
        }

        y += 250;
        ctx.fillStyle = "white";
        ctx.globalAlpha = 1;
    }
}

function renderModifier() {
    const ctx = global.ctx;
    let image;
    let y;

    ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

    global.background.style.visibility = "hidden";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, global.canvas.width, global.canvas.height);

    ctx.font = "30px 'VHSGothic', Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("The artifact has chosen your fate.", global.canvas.width / 2, global.canvas.height / 2 - 150);

    if (global.currentModifiers.length == 1) {
        y = global.canvas.width / 2;
    } else {
        y = global.canvas.width / 2 - 150;
    }

    global.currentModifiers.forEach(modifier => {
        ctx.fillStyle = "gray";
        ctx.font = "10px 'VHSGothic', Arial";
        ctx.fillText(`${modifier.chance.toFixed(2)}%`, y, global.canvas.height / 2 - 90);

        image = new Image();
        image.src = `../images/modifier/${modifier.mod.code}.png`;
        ctx.drawImage(image, y - image.width / 2, global.canvas.height / 2 - 80);

        ctx.fillStyle = "white";
        ctx.font = "20px 'VHSGothic', Arial";
        ctx.fillText(modifier.mod.name, y, global.canvas.height / 2 + 120);

        y = global.canvas.width / 2 + 150;
    });

    ctx.fillStyle = "gray";
    ctx.font = "15px 'VHSGothic', Arial";
    ctx.fillText(`Press [ ENTER ] to start level ${global.currentLevel}.`, global.canvas.width / 2, global.canvas.height / 2 + 180)
}

function renderDeadMenu() {
    const ctx = global.ctx;

    global.background.style.visibility = "hidden";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, global.canvas.width, global.canvas.height);

    ctx.font = "30px 'VHSGothic', Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Aurosa's adventure is over.", global.canvas.width / 2, global.canvas.height / 2);

    ctx.fillStyle = "white";
    ctx.font = "15px 'VHSGothic', Arial";
    ctx.fillText("Press [ ENTER ] to go back to the main menu.", global.canvas.width / 2, global.canvas.height / 2 + 40)
}

export { show };