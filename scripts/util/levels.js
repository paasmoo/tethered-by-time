const levels = [
    {
        number: 1,
        objects: [
            // Platform blocks
            ["Block", 100, 450, 1, 5],  // Starting platform
            ["Block", 600, 400, 1, 4],  // Midway platform
            ["Block", 1200, 350, 1, 6], // Large elevated platform
            ["Block", 1800, 300, 1, 5], // Higher platform near the finish
            ["Block", 2400, 400, 1, 5], // Final stretch platform

            // Vertical blocks
            ["Block", 500, 400, 2, 1],  // Decorative vertical block
            ["Block", 1100, 350, 3, 1], // Challenge near 3rd platform
            ["Block", 2000, 300, 3, 1], // Guarding the final stretch

            // Enemies
            ["Enemy", 650, 375, 76, 76, 600, 1000, 1],  // Patrolling enemy near 2nd platform
            ["Enemy", 1300, 325, 76, 76, 1200, 1600, 1], // Enemy on the large platform
            ["Enemy", 1900, 275, 76, 76, 1800, 2200, 1], // Higher enemy guarding the finish

            // Coins
            ["Coin", 750, 350, 64, 64],   // Coin near 2nd platform
            ["Coin", 1400, 300, 64, 64],  // Coin above the large platform
            ["Coin", 2300, 375, 64, 64],  // Coin near the final stretch

            // Finish
            ["Finish", 2900, 275, 64, 64] // Finish line at the far end
        ]
    }
];

export { levels };