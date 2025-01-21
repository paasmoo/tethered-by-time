import { global } from "./modules/global.js"

const gameModifiers = [
    /*{
        name: "Slower Movement",
        description: "Your character moves slower!",
        apply: function() {
            global.modifier = 0.5;
        }
    },*/
    {
        name: "Lower Gravity",
        description: "It's like if you're in space!!",
        apply: function() {
            global.gravityForce = 1.3;
        }
    }/*,
    {
        name: "Nothing",
        description: "Absolutely nothing happens!",
        apply: function() {}
    }*/
];

export { gameModifiers };