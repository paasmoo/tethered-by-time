import { global } from "../modules/global.js";
import { levelModifiers } from "./modifiers.js";

function generate() {
    const numModifiers = Math.random() < 0.5 ? 1 : 2;

    const selectedModifiers = [];
    let modifiersCopy = [];

    if (numModifiers === 1) {
        const weightedPool = levelModifiers.flatMap(modifier => Array(modifier.weight).fill(modifier));

        const randomIndex = Math.floor(Math.random() * weightedPool.length);
        let chancePercent = weightedPool[randomIndex].weight / weightedPool.length * 100;
        selectedModifiers.push({ mod: weightedPool[randomIndex], chance: chancePercent });
    } else {
        while (selectedModifiers.length < numModifiers) {
            modifiersCopy = levelModifiers;

            if (selectedModifiers.length > 0) {
                modifiersCopy.forEach(modifier => {
                    if (modifier.name === selectedModifiers[0].mod.name) {
                        modifier.weight = modifier.weight / 2;
                    }
                });
            }

            const weightedPool = modifiersCopy.flatMap(modifier => Array(modifier.weight).fill(modifier));

            let allowedModifiers = weightedPool.filter(mod =>
                mod.code !== "nothing" && mod.code !== "allbad"
            );

            if (selectedModifiers.length > 0) {
                if (selectedModifiers[0].mod.counter !== "none") {
                    allowedModifiers = allowedModifiers.filter(mod => mod.code !== selectedModifiers[0].mod.counter);
                }
            }

            const randomIndex = Math.floor(Math.random() * allowedModifiers.length);
            const modifier = allowedModifiers[randomIndex];

            let chancePercent = modifier.weight / allowedModifiers.length * 100;
            selectedModifiers.push({ mod: modifier, chance: chancePercent })
        }
    }

    global.currentModifiers = selectedModifiers;
}

export { generate };