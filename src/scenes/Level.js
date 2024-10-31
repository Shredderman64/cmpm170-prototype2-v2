class Level extends Phaser.Scene {
    constructor() {
        super("levelScreen");

        this.my = { sprite: {} };
        this.gameOver = false;
        this.carSpeed = 20;

        // Timer for periodic trigger
        this.periodicTimer = 0;
    }

    create() {

        // adding racetrack background
        this.racetrack = this.add.tileSprite(0, 0, 1560, 1260, 'racetrack').setOrigin(0, 0);

        // Scale the racetrack image to fit the game screen
        this.racetrack.setScale(1, 0.6);

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
        my.sprite.player.body.setMaxVelocityX(500);
        my.sprite.player.body.setMaxVelocityY(500);

        my.sprite.carFast = this.spawnCar();
        my.sprite.carFast.setScale(0.5);
    }

    update() {
        let my = this.my;

        my.sprite.player.update();

        function displayGameOver(scene) {
            my.sprite.player.makeInactive();
            scene.add.bitmapText(game.config.width / 2, (game.config.height / 2 - 40), "pixel_square",
                "game over", 30).setOrigin(0.5);
            scene.add.bitmapText(game.config.width / 2, game.config.height / 2, "pixel_square",
                "press ENTER to return", 30).setOrigin(0.5);
            scene.gameOver = true;
        }

        if (!this.gameOver && my.sprite.carFast.visible) {
            my.sprite.carFast.update();
            // Periodic trigger every 120 frames (approx. 2 seconds)
            this.periodicTimer++;
            if (this.periodicTimer >= 120) {
                this.periodicTimer = 0; // Reset the timer

                let diceRoll = Math.floor(Phaser.Math.Between(0, 1));
                // Randomly choose between jump and speed boost
                //this.litter.push(this.spawnThrowable());
                if (diceRoll == 0/* && this.periodicTimer > 240*/) {
                    my.sprite.carFast.jumpToPlayerHeight(my.sprite.player);
                } else if (diceRoll == 1) {
                    my.sprite.carFast.boostSpeed(5, 2000); // Boost speed by 5 for 2 seconds
                }// else if (diceRoll == 2) {
                //    this.litter.push(this.spawnThrowable(my.sprite.carFast.speed));
                //}
            }

            if (this.collides(my.sprite.player, my.sprite.carFast)) {
                my.sprite.carFast.visible = false;
                my.sprite.carFast.y = -100;
                setTimeout(() => {
                    my.sprite.carFast.destroy();
                    my.sprite.carFast = this.spawnCar();
                    my.sprite.carFast.setScale(0.5);
                }, 1000);
            }
        }

        if (this.gameOver) {
            if (Phaser.Input.Keyboard.JustDown(this.return))
                this.scene.start("titleScreen");
        }
    }

    spawnCar() {
        let yPos = Phaser.Math.Between(0, game.config.height);
        return new Car(this, game.config.width + 100, yPos, "carFast", null, this.carSpeed);
    }

    collides(player, object) {
        if (Math.abs(player.x - object.x) > (player.displayWidth / 2 + object.displayWidth / 2) * 0.8)
            return false;
        if (Math.abs(player.y - object.y) > (player.displayHeight / 2 + object.displayHeight / 2) * 0.7)
            return false;
        return true;
    }

    init_game() {
        this.gameOver = false;
        this.periodicTimer = 0;
    }
}