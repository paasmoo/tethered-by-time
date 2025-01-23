import { global } from "../modules/global.js";
import { levelModifiers } from "./modifiers.js";

function generate() {
    let numModifiers = Math.random() < 0.5 ? 1 : 2;
    const selectedModifiers = [];
    let modifiersCopy;

    if(global.currentLevel == 3) {
        numModifiers = 0;
    }

    if (numModifiers === 0) {
        let somethingHappens = Math.random() < 0.5 ? 1 : 2;

        if(somethingHappens == 1) {
            let enemies = Math.random() < 0.5 ? 2 : 3;
            selectedModifiers.push({mod: levelModifiers[enemies], chance: 25});
        } else {
            selectedModifiers.push({mod: levelModifiers[8], chance: 50});
        }
    } else if (numModifiers === 1) {
        selectedModifiers.push(generateSingleModifier());
    } else {
        while (selectedModifiers.length < numModifiers) {
            let modifier;
            let generateAgain = true;

            modifiersCopy = getModifiersCopy(selectedModifiers);
            const weightedPool = createWeightedPool(modifiersCopy);
            const allowedModifiers = filterAllowedModifiers(weightedPool, selectedModifiers);
            
            while(generateAgain) {
                modifier = pickRandomModifier(allowedModifiers);

                if(modifier.code == "heartminus") {
                    let heartsPredicted = global.hearts - 1;

                    if(heartsPredicted <= 0) {
                        generateAgain = true;
                    } else {
                        generateAgain = false;
                    }
                } else {
                    generateAgain = false;
                }
            }

            selectedModifiers.push({
                mod: modifier,
                chance: calculateChance(modifier, allowedModifiers),
            });
        }
    }

    global.currentModifiers = selectedModifiers;
}

function generateSingleModifier() {
    let generateAgain = true;
    const weightedPool = levelModifiers.flatMap(modifier => Array(modifier.weight).fill(modifier));
    let selectedModifier;

    while (generateAgain) {
        const randomIndex = Math.floor(Math.random() * weightedPool.length);
        selectedModifier = weightedPool[randomIndex];

        if (selectedModifier.code == "heartminus") {
            let heartsPredicted = global.hearts - 1;

            if (heartsPredicted <= 0) {
                generateAgain = true;
            } else {
                generateAgain = false;
            }
        } else {
            generateAgain = false
        }
    }

    const chancePercent = calculateChance(selectedModifier, weightedPool);
    return { mod: selectedModifier, chance: chancePercent };
}

function getModifiersCopy(selectedModifiers) {
    let modifiersCopy = [...levelModifiers];
    if (selectedModifiers.length > 0) {
        modifiersCopy = modifiersCopy.map(modifier => {
            if (modifier.name === selectedModifiers[0].mod.name) {
                modifier.weight /= 2;
            }
            return modifier;
        });
    }
    return modifiersCopy;
}

function createWeightedPool(modifiersCopy) {
    return modifiersCopy.flatMap(modifier => Array(modifier.weight).fill(modifier));
}

function filterAllowedModifiers(weightedPool, selectedModifiers) {
    let allowedModifiers = weightedPool.filter(mod => mod.code !== "nothing" && mod.code !== "allbad");

    if (selectedModifiers.length > 0 && selectedModifiers[0].mod.counter !== "none") {
        allowedModifiers = allowedModifiers.filter(mod => mod.code !== selectedModifiers[0].mod.counter);
    }

    return allowedModifiers;
}

function pickRandomModifier(allowedModifiers) {
    const randomIndex = Math.floor(Math.random() * allowedModifiers.length);
    return allowedModifiers[randomIndex];
}

function calculateChance(modifier, pool) {
    return (modifier.weight / pool.length) * 100;
}

export { generate };