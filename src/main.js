/*
Atri Mehta
RocketPatrol Remastered
It took my about 3 days to finish this assignment working on it for about 4 hours everyday.
Mods executed:
- Allow the player to control the Rocket after it's fired (1 point)
- Implement the 'FIRE' UI text from the original game (1 point)
    -https://phasergames.com/phaser-3-basics-images-text-and-click/ reference for UI text
- Implement parallax scrolling for the background (3 points)
    -https://www.youtube.com/watch?v=GwGzFczdpkg reference for parallax scrolling
    -https://freepngimg.com/png/19261-space-png-pic got background picture from here
-Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5 points)
    -https://www.pixilart.com/draw/pixel-bullet-00e5a8660c772f2 used pixilart to edit the bullet missile.
    -edited Enemyship.js to be smaller and faster from Spaceship.js
-Implement mouse control for player movement and mouse click to fire (5 points)
    -https://stackoverflow.com/questions/28104605/how-to-find-the-mouse-position-x-y-using-phaser used this as reference for mouse control.
    -https://stackoverflow.com/questions/69759621/phaser-3-move-gameobject-to-mouse-click-click-to-move-movement-using-twee used this as reference to undestand the logic of mouse click to fire.
-Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (5 points)
    -https://rexrainbow.github.io/phaser3-rex-notes/docs/site/particles/ used this as reference
    -got the particle png from https://www.cleanpng.com/png-explosive-light-effect-material-539/download-png.html#google_vignette
    





*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;