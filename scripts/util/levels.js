const levels = [
    {
        number: 1,
        name: "Awakening",
        nameColor: "green",
        time: 130,
        objects: [
            // Start
            ["Block", -30, 450, 1, 4, "grass"],
            ["Block", 370, 380, 2, 2, "grass"],
            ["Enemy",  530, 100, 76, 76,  100,  500, 0.85, 1, "left"],

            ["Enemy", 680, 305, 76, 76, 680, 930, 0.9, 0, "right"],
            ["Block", 630, 380, 2, 2, "grass"],
            ["Block", 830, 380, 2, 2, "grass"],

            ["Spike", 1050, 380, 1, 0],
            ["Block", 1030, 420, 2, 2, "stone"],

            ["Spike", 1220, 430, 1, 0],
            ["Block", 1200, 470, 2, 2, "stone"],

            ["Spike", 1700, 360, 2, 0],
            ["Block", 1500, 400, 2, 4, "wood"],

            ["Block", 1900, 370, 2, 4, "wood"],

            ["Coin", 2275, 400, 64, 64],
            ["Spike", 2270, 440, 2, 0],
            ["Block", 2270, 480, 2, 1, "wood"],

            ["Block", 2370, 380, 5, 1, "grass"],
            ["Finish", 2370, 325, 64, 64],
        ]
    },
    {
        number: 2,
        name: "Twilight Vale",
        nameColor: "yellow",
        time: 90,
        objects: [
            // Start
            ["Block", -30, 450, 1, 4, "grassDark"],
            ["Block", 370, 380, 2, 2, "grassDark"],
            ["Block", 630, 420, 2, 2, "grassDark"],
            ["Coin", 675, 350, 64, 64],
            ["Enemy",  530, 100, 76, 76,  100,  500, 0.85, 1, "left"],

            // Narrow stones
            ["Block", 900, 420, 3, 1, "grassDark"],
            ["Block", 1060, 420, 3, 1, "grassDark"],
            ["Block", 1220, 420, 3, 1, "grassDark"],
            ["Block", 1380, 420, 3, 1, "grassDark"],
            ["Enemy", 900, 225, 76, 76, 900, 1380, 1, 0, "left"],  // Enemy on the large platform

            // Stairs to the finish
            ["Block", 1540, 370, 3, 2, "grassDark"],
            ["Block", 1800, 350, 3, 2, "grassDark"],
            ["Block", 2060, 310, 3, 2, "grassDark"],
            ["Block", 2310, 250, 4, 2, "grassDark"],
            ["Block", 2555, 175, 2, 2, "grassDark"],
            ["Block", 2555, 450, 2, 2, "grassDark"],
            ["Coin", 2595, 380, 64, 64],
            ["Finish", 2700, 500, 64, 64], // Hidden end (you have to fall)

            // Finish
            ["Block", 2800, 175, 6, 4, "grassDark"],
            ["Finish", 3000, 105, 64, 64],

            // stone wall for bounds
            ["Block", 3300, -300, 12, 5, "stone"]
        ]
    },
    {
        number: 3,
        name: "Phantom's Wrath",
        nameColor: "red",
        time: 73,
        objects: [
            // Platform blocks
            ["Enemy",  530, 0, 500, 500,  50,  50, 1, 2, "left"],
            ["Block", 200, 450, 1, 8, "stone"],

            // 1st wave ("tutorial")
            ["BossEnemy", -80, 380, 64, 64, 1050, 2, "right", 65],
            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 59],

            // 2nd wave (a bit harder)
            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 54],
            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 52],
            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 50],
            ["BossEnemy", -50, 380, 64, 64, 1050, 2, "right", 48],
            ["BossEnemy", -50, 380, 64, 64, 1050, 2, "right", 46],
            ["BossEnemy", -50, 380, 64, 64, 1050, 2, "right", 44],

            // 3rd wave (left-right combo)
            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 42],
            ["BossEnemy", -50, 380, 64, 64, 1050, 2, "right", 41],
            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 40],
            ["BossEnemy", -50, 380, 64, 64, 1050, 2, "right", 39],
            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 38],
            ["BossEnemy", -50, 380, 64, 64, 1050, 2, "right", 37],
            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 36],
            ["BossEnemy", -50, 380, 64, 64, 1050, 2, "right", 35],

            // 4th wave (a lot of enemies behind each other)
            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 32],
            ["BossEnemy", 1090, 380, 64, 64, -50, 2, "left", 31],
            ["BossEnemy", 1130, 380, 64, 64, -50, 2, "left", 30],
            ["BossEnemy", 1170, 380, 64, 64, -50, 2, "left", 29],

            ["BossEnemy", -50, 380, 64, 64, 1050, 2, "right", 26],
            ["BossEnemy", -90, 380, 64, 64, 1050, 2, "right", 26],
            ["BossEnemy", -130, 380, 64, 64, 1050, 2, "right", 26],
            ["BossEnemy", -170, 380, 64, 64, 1050, 2, "right", 26],

            // last wave (mixup)
            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 22],
            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 20],
            ["BossEnemy", -50, 380, 64, 64, 1050, 2, "right", 19],
            ["BossEnemy", -50, 380, 64, 64, 1050, 2, "right", 17],
            
            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 16],
            ["BossEnemy", -50, 380, 64, 64, 1050, 2, "right", 15],

            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 12],
            ["BossEnemy", 1090, 380, 64, 64, -50, 2, "left", 11],
            ["BossEnemy", 1130, 380, 64, 64, -50, 2, "left", 10],

            ["BossEnemy", -50, 380, 64, 64, 1050, 2, "right", 9],
            ["BossEnemy", 1050, 380, 64, 64, -50, 2, "left", 8],

            ["BossEnemy", -50, 380, 64, 64, 1050, 2, "right", 5],
            ["BossEnemy", -130, 380, 64, 64, 1050, 2, "right", 3],
            ["BossEnemy", -170, 380, 64, 64, 1050, 2, "right", 2]
        ]
    }
];

export { levels };