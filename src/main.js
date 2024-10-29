let config = {
    type: Phaser.CANVAS,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
        }
    },
    width: 1600,
    height: 700,
    scene: [Load, Title, Level]
}

const game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;