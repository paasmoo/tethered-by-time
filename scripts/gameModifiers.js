import { global } from "./modules/global.js"

const gameModifiers = [
    {
        name: "Slower Movement, Lower Gravity",
        description: "Your character moves slower and there's a lower gravity!",
        apply: function() {
            global.modifier = 0.5;
            global.gravityForce = 3.5;
        }
    },
    {
        name: "Nothing",
        description: "Absolutely nothing happens!",
        apply: function() {

        }
    }
];

export { gameModifiers };