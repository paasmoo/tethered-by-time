import { global } from "../modules/global.js";

let enemyModifier = 0.35;
let moveModifier = 0.25;
let timeModifier = 3;

const levelModifiers = [
    {
        code: "allbad",
        name: "Doomed!",
        description: "Everything’s falling apart, brace yourself.",
        counter: "none",
        apply: function() {
            global.timerDuration -= Math.floor(global.timerDuration / timeModifier);
            global.inputSwitched = !global.inputSwitched;
            global.enemyModifier += enemyModifier;
            global.moveModifier -= moveModifier;
        },
        weight: 2
    },
    {
        code: "controlswitch",
        name: "Flip It!",
        description: "Your controls are reversed. Good luck!",
        counter: "controlswitch",
        apply: function() {
            global.inputSwitched = !global.inputSwitched;
        },
        weight: 10
    },
    {
        code: "enemiesminus",
        name: "Lazy Foes",
        description: "Enemies working for minimum wage, don't expect much effort!",
        counter: "enemiesplus",
        apply: function() {
            global.enemyModifier -= enemyModifier;
        },
        weight: 10
    },
    {
        code: "enemiesplus",
        name: "Hyper Foes",
        description: "Enemies on steroids, good luck!",
        counter: "enemiesminus",
        apply: function() {
            global.enemyModifier += enemyModifier;
        },
        weight: 10
    },
    {
        code: "gravity",
        name: "Moon Bounce",
        description: "Gravity’s weaker, enjoy the high jumps!",
        counter: "none",
        apply: function() {
            global.gravityForce = 1.3;
        },
        weight: 10
    },
    {
        code: "heartminus",
        name: "Heartbreaker",
        description: "Lose hearts, both your max and current count.",
        counter: "heartplus",
        apply: function() {
            global.maxHearts--;
            global.hearts--;
        },
        weight: 6
    },
    {
        code: "heartplus",
        name: "Lifeline",
        description: "Gain extra hearts, both max and current.",
        counter: "heartminus",
        apply: function() {
            global.maxHearts++;
            global.hearts++;
        },
        weight: 6
    },
    {
        code: "mirror",
        name: "Mirror World",
        description: "Everything’s mirrored, and your controls too.",
        counter: "mirror",
        apply: function() {
            let wrapper = document.getElementById("gameContainer");
            wrapper.style.transform = "scale(-1, 1)";
            global.inputSwitched = !global.inputSwitched;
        },
        weight: 10
    },
    {
        code: "nothing",
        name: "null",
        description: "This has to be a bug?!",
        counter: "none",
        apply: function() {},
        weight: 5
    },
    {
        code: "speedminus",
        name: "Snail's Pace",
        description: "Slow and steady... but mostly slow.",
        counter: "speedplus",
        apply: function() {
            global.moveModifier -= moveModifier;
        },
        weight: 10
    },
    {
        code: "speedplus",
        name: "Speed Runner",
        description: "Zoom, zoom!",
        counter: "speedminus",
        apply: function() {
            global.moveModifier += moveModifier;
        },
        weight: 10
    },
    {
        code: "timeminus",
        name: "Time Crunch",
        description: "Better hurry, time's running out!",
        counter: "timeplus",
        apply: function() {
            global.timerDuration -= Math.floor(global.timerDuration / timeModifier);
        },
        weight: 10
    },
    {
        code: "timeplus",
        name: "Time Bender",
        description: "Don't stress it, take your time.",
        counter: "timeminus",
        apply: function() {
            global.timerDuration += Math.floor(global.timerDuration / timeModifier);
        },
        weight: 10
    }
];

export { levelModifiers };
