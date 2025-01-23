import { global } from "../modules/global.js";

let enemyModifier = 0.35;
let moveModifier = 0.25;
let timeModifier = 3;

const levelModifiers = [
    {
        code: "allbad",
        name: "Doomed!",
        description: "TODO",
        counter: "none",
        apply: function() {
            global.timerDuration -= Math.floor(global.timerDuration / timeModifier);
            global.inputSwitched = !global.inputSwitched;
            global.enemyModifier += enemyModifier;
            global.moveModifier -= moveModifier;
        },
        weight: 5
    },
    {
        code: "controlswitch",
        name: "Flip It!",
        description: "TODO",
        counter: "controlswitch",
        apply: function() {
            global.inputSwitched = !global.inputSwitched;
        },
        weight: 10
    },
    {
        code: "enemiesminus",
        name: "Lazy Foes",
        description: "TODO",
        counter: "enemiesplus",
        apply: function() {
            global.enemyModifier -= enemyModifier;
        },
        weight: 10
    },
    {
        code: "enemiesplus",
        name: "Hyper Foes",
        description: "TODO",
        counter: "enemiesminus",
        apply: function() {
            global.enemyModifier += enemyModifier;
        },
        weight: 10
    },
    {
        code: "gravity",
        name: "Moon Bounce",
        description: "TODO",
        counter: "none",
        apply: function() {
            global.gravityForce = 1.3;
        },
        weight: 10
    },
    {
        code: "heartminus",
        name: "Heartbreaker",
        description: "TODO",
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
        description: "TODO",
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
        description: "TODO",
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
        name: "Meh...",
        description: "TODO",
        counter: "none",
        apply: function() {},
        weight: 5
    },
    {
        code: "speedminus",
        name: "Snail's Pace",
        description: "TODO",
        counter: "speedplus",
        apply: function() {
            global.moveModifier -= moveModifier;
        },
        weight: 10
    },
    {
        code: "speedplus",
        name: "Speed Runner",
        description: "TODO",
        counter: "speedminus",
        apply: function() {
            global.moveModifier += moveModifier;
        },
        weight: 10
    },
    {
        code: "timeminus",
        name: "Time Crunch",
        description: "TODO",
        counter: "timeplus",
        apply: function() {
            global.timerDuration -= Math.floor(global.timerDuration / timeModifier);
        },
        weight: 10
    },
    {
        code: "timeplus",
        name: "Time Bender",
        description: "TODO",
        counter: "timeminus",
        apply: function() {
            global.timerDuration += Math.floor(global.timerDuration / timeModifier);
        },
        weight: 10
    }
];

export { levelModifiers };
