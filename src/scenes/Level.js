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
        let cfg = game.config;

        my.sprite.player = new Player(this, cfg.width / 5, cfg.height / 2, "player", null);
        my.sprite.player.setScale(0.25);
    }
}