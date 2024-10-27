class Level extends Phaser.Scene {
    constructor() {
        super("levelScreen");

        this.my = {sprite: {}};
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.image("player", "carPlayer.png");
        this.load.image("carFast", "carFast.png");
        this.load.image("carSlow", "carSlow.png");
        this.load.image("carThrow", "carThrow.png");
        this.load.image("carCutOff", "carCutOff.png");
        this.load.image("carTruck", "truck.png");
        this.load.image("mailbox", "mailbox.png");
        this.load.image("fireHydrant", "fireHydrant.png");
        this.load.image("cone", "traffic-cone.png");
        this.load.image("dumpster", "dumpster.png");
        this.load.image("post", "post.png");
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
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.body.setMaxVelocityX(500);
        my.sprite.player.body.setMaxVelocityY(500);
        
        my.sprite.carFast = new Car(this, game.config.width / 5, game.config.height / 3,
            "carFast", null, 600);
        my.sprite.carFast.setScale(0.25);
        my.sprite.carFast.setCollideWorldBounds(true);
    }

    update() {
        let my = this.my;

        my.sprite.player.update();
        
        my.sprite.carFast.update();
    }
}