class Level extends Phaser.Scene {
    constructor() {
        super("levelScreen");

        this.my = {sprite: {}};
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.image("player", "player.png");
    }

    create() {
        let my = this.my;

        this.controls = {};

        this.controls.left = this.input.keyboard.addKey("A");
        this.controls.right = this.input.keyboard.addKey("D");
        this.controls.up = this.input.keyboard.addKey("W");
        this.controls.down = this.input.keyboard.addKey("S");

        my.sprite.player = new Player(this, game.config.width / 6, game.config.height / 2,
            "player", null, this.controls);
        my.sprite.player.setScale(0.25);
    }

    update() {
        let my = this.my;

        my.sprite.player.update();
    }
}