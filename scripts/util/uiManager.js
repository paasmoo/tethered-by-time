import { global } from "../modules/global.js";

import { Heart } from "../gameObjects/ui/heart.js";

import { CoinUI } from "../gameObjects/ui/coin.js";

const ctx = global.ctx;

function draw() {
    drawTimer();
    drawModifiers();
    drawCoinsCollected();
}

function drawHeartsAndCoins() {
    drawHearts();
    drawCoinsUI();
}

function drawTimer() {
    const timerColor = global.timerRemaining < 60 ? "red" : "white";
    drawText(global.timerRemaining, global.canvas.width - 100, 80, 30, timerColor);
}

function drawModifiers() {
    let x = global.currentModifiers.length === 1 ? global.canvas.width / 2 : global.canvas.width / 2 - 30;

    global.currentModifiers.forEach(modifier => {
        const image = new Image();
        image.src = `../images/modifier/${modifier.mod.code}.png`;
        ctx.drawImage(image, x, 43, 60, 60);

        x = global.canvas.width / 2 + 40;
    });
}

function drawCoinsCollected() {
    drawText("x " + global.coinsCollected, 145, 135, 20, "white");
}

function drawHearts() {
    let lastX = 20;
    let remainingHearts = global.hearts;

    for (let i = 0; i < global.maxHearts; i++) {
        console.log(remainingHearts);
        if (remainingHearts <= 0) {
            new Heart(lastX, 20, 100, 100, true)
        } else {
            new Heart(lastX, 20, 100, 100);
        }

        lastX = lastX + 70;
        remainingHearts--;
    }
}

function drawCoinsUI() {
    new CoinUI(40, 100, 60, 60);
}

function drawText(text, x, y, size, color) {
    ctx.font = `${size}px 'VHSGothic', Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = "right";
    ctx.fillText(text, x, y);
}

export { draw, drawHeartsAndCoins };