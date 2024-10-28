let config = {
    type: Phaser.CANVAS,
    physics: {
        default: "arcade",
    },
    width: 1000,
    height: 700,
    scene: [Title, Level],
}

const game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;