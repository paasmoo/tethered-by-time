import { global } from "../modules/global.js";
import { levelModifiers } from "./modifiers.js";

function generate() {
    const numModifiers = Math.random() < 0.5 ? 1 : 2;
    const selectedModifiers = [];
    let modifiersCopy;

    if (numModifiers === 1) {
        selectedModifiers.push(generateSingleModifier());
    } else {
        while (selectedModifiers.length < numModifiers) {
            modifiersCopy = getModifiersCopy(selectedModifiers);
            const weightedPool = createWeightedPool(modifiersCopy);
            const allowedModifiers = filterAllowedModifiers(weightedPool, selectedModifiers);
            const modifier = pickRandomModifier(allowedModifiers);

            selectedModifiers.push({
                mod: modifier,
                chance: calculateChance(modifier, allowedModifiers),
            });
        }
    }

    global.currentModifiers = selectedModifiers;
}

function generateSingleModifier() {
    const weightedPool = levelModifiers.flatMap(modifier => Array(modifier.weight).fill(modifier));
    const randomIndex = Math.floor(Math.random() * weightedPool.length);
    const selectedModifier = weightedPool[randomIndex];
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