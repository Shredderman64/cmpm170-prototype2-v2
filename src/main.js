let config = {
    type: Phaser.CANVAS,
    width: 1000,
    height: 700,
    scene: [Level],
}

const game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;