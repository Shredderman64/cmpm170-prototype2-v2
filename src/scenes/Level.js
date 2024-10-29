class Level extends Phaser.Scene {
    constructor() {
        super("levelScreen");

        this.my = { sprite: {} };
        this.gameOver = false;

        // Timer for periodic trigger
        this.periodicTimer = 0;
    }

    create() {
        this.init_game();
        
        let my = this.my;

        this.controls = {};
        this.return = this.input.keyboard.addKey("ENTER");

        this.controls.left = this.input.keyboard.addKey("A");
        this.controls.right = this.input.keyboard.addKey("D");
        this.controls.up = this.input.keyboard.addKey("W");
        this.controls.down = this.input.keyboard.addKey("S");

        my.sprite.player = new Player(this, game.config.width / 6, game.config.height / 2,
            "player", null, this.controls);
        my.sprite.player.setScale(0.5);
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.body.setMaxVelocityX(600);
        my.sprite.player.body.setMaxVelocityY(600);

        my.sprite.carFast = this.spawnCar();
        my.sprite.carFast.setScale(0.5);

        //my.sprite.throwable = this.physics.add.sprite(x, y, "throw", 8);
        //my.sprite.throwable.setScale(0.5);
    }

    update() {
        let my = this.my;

        my.sprite.player.update();

        if (!this.gameOver) {
            my.sprite.carFast.update();

            // Periodic trigger every 120 frames (approx. 2 seconds)
            this.periodicTimer++;
            if (this.periodicTimer >= 120) {
                this.periodicTimer = 0; // Reset the timer

                // Randomly choose between jump and speed boost
                if (Phaser.Math.Between(0, 1) === 0) {
                    my.sprite.carFast.jumpToPlayerHeight(my.sprite.player);
                } else {
                    my.sprite.carFast.boostSpeed(5, 2000); // Boost speed by 5 for 2 seconds
                }
            }

            /*
            if (this.collides(my.sprite.player, my.sprite.throwable)) {
                my.sprite.player.makeInactive();
                this.add.bitmapText(game.config.width / 2, (game.config.height / 2 - 40), "pixel_square",
                "game over", 30).setOrigin(0.5);
                this.add.bitmapText(game.config.width / 2, game.config.height / 2, "pixel_square",
                "press ENTER to return", 30).setOrigin(0.5);
                this.gameOver = true;
            }
            */

            if (this.collides(my.sprite.player, my.sprite.carFast)) {
                my.sprite.player.makeInactive();
                this.add.bitmapText(game.config.width / 2, (game.config.height / 2 - 40), "pixel_square",
                "game over", 30).setOrigin(0.5);
                this.add.bitmapText(game.config.width / 2, game.config.height / 2, "pixel_square",
                "press ENTER to return", 30).setOrigin(0.5);
                this.gameOver = true;
            }
        }

        if (this.gameOver) {
            if (Phaser.Input.Keyboard.JustDown(this.return))
                this.scene.start("titleScreen");
        }
    }

    spawnCar() {
        let yPos = Phaser.Math.Between(0, game.config.height);
        return new Car(this, game.config.width + 100, yPos, "carFast", null, 10);
    }


    collides(player, object) {
        if (Math.abs(player.x - object.x) > (player.displayWidth / 2 + object.displayWidth / 2) * 0.8)
            return false;
        if (Math.abs(player.y - object.y) > (player.displayHeight / 2 + object.displayHeight / 2) * 0.8)
            return false;
        return true;
    }

    init_game() {
        this.gameOver = false;
    }
}
