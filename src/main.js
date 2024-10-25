let config = {
    type: Phaser.CANVAS,
    physics: {
        default: "arcade",
    },
    width: 1000,
    height: 700,
    scene: [Level],
}

const game = new Phaser.Game(config);

// reserve keyboard vars

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;