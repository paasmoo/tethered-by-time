Day 1 (14/01/2025)
---
Adjusted canvas ratio to fullscreen.
Added win condition (pickup Star) and death condition (fall below canvas).
Implemented a main menu.

Day 2 (15/01/2025)
---
Reverted canvas ratio to original (because of pixel art).
Fixed win and death screens (canvas now refreshes and shows character).
Added a hearts system (restart at main menu after losing all 3 hearts).
Objects now move into view if outside the screen (still buggy).

Day 3 (16/01/2025)
---
Fixed scrolling behavior.
Created a basic UI to display hearts.
Introduced level modifiers.

Day 4 (17/01/2025)
---
Added enemies (moving from left to right).
Started working on drawing the sprites.

Day 5 (20/01/2025)
---
Introduced a better logic to generate levels.
Added remaining hearts to the UI (with self-drawn sprites).
Added self-drawn sprites to character, enemies, flag (previously a star) and the ground.
Continued working on drawing the sprites.

Day 6 (21/01/2025)
---
Updated self-drawn sprites for enemies and the ground (It's now 32x32 pixel art).
Added coin object & coin UI with self-drawn sprites (collectable).
Added a logo and background to title screen.
Replaced flag with self-drawn star sprites.
Fixed game states for dying (enemies & time ran out) & winning.
Refactored a bit of code.

Day 7 (22/01/2025)
---
Block objects are now based on a 16-tile spritesheet.
Bug fixes regarding MoveTrigger and background shift.
Implemented a screen that shows upon perma death (losing all 3 hearts).
Added a play & info button the title screen.
Added a lore recap that shows before the first level is shown.
Added a new modifier generation logic (based on weight) & implemented a screen to show the current level modifiers.
Added a current level screen.
Added a lost heart screen.
Refactored a large bit of code.

TO-DO
---
Add 2 new platform tiles.
Add 1 new enemy type: spikes.
Create 2 normal levels.
Create 1 boss level. (+ win condition & win screen)
Add info screen with controls & modifier info.