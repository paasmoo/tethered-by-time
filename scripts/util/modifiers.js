import { global } from "../modules/global.js";

const levelModifiers = [
    {
        code: "allbad",
        name: "Doomed!",
        description: "TODO",
        counter: "none",
        apply: function() {
            // todo
        },
        weight: 5
    },
    {
        code: "controlswitch",
        name: "Flip It!",
        description: "TODO",
        counter: "controlswitch",
        apply: function() {
            // todo
        },
        weight: 10
    },
    {
        code: "enemiesminus",
        name: "Lazy Foes",
        description: "TODO",
        counter: "enemiesplus",
        apply: function() {
            // todo
        },
        weight: 10
    },
    {
        code: "enemiesplus",
        name: "Hyper Foes",
        description: "TODO",
        counter: "enemiesminus",
        apply: function() {
            // todo
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
            // todo
        },
        weight: 10
    },
    {
        code: "heartplus",
        name: "Lifeline",
        description: "TODO",
        counter: "heartminus",
        apply: function() {
            // todo
        },
        weight: 10
    },
    {
        code: "mirror",
        name: "Mirror World",
        description: "TODO",
        counter: "mirror",
        apply: function() {
            // todo
        },
        weight: 10
    },
    {
        code: "nothing",
        name: "Meh...",
        description: "Absolutely nothing happens!",
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
            // todo
        },
        weight: 10
    },
    {
        code: "speedplus",
        name: "Speed Runner",
        description: "TODO",
        counter: "speedminus",
        apply: function() {
            // todo
        },
        weight: 10
    },
    {
        code: "timeminus",
        name: "Time Crunch",
        description: "TODO",
        counter: "timeplus",
        apply: function() {
            // todo
        },
        weight: 10
    },
    {
        code: "timeplus",
        name: "Time Bender",
        description: "TODO",
        counter: "timeminus",
        apply: function() {
            // todo
        },
        weight: 10
    }
];

export { levelModifiers };
