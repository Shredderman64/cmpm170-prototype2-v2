class Level extends Phaser.Scene {
    constructor() {
        super("levelScreen");

        this.my = { sprite: {} };
        this.gameOver = false;
        this.carSpeed = 25;
        this.timer = 20000;

        // store the points for the player
        this.points = 0;
    }

    create() {
        // Adding racetrack background
        this.racetrack = this.add.tileSprite(0, 0, 1560, 1260, 'racetrack').setOrigin(0, 0);
        this.racetrack.setScale(1, 0.6);

        this.init_game();
        
        let my = this.my;

        this.controls = {};
        this.return = this.input.keyboard.addKey("ENTER");

        this.controls.left = this.input.keyboard.addKey("A");
        this.controls.right = this.input.keyboard.addKey("D");
        this.controls.up = this.input.keyboard.addKey("W");
        this.controls.down = this.input.keyboard.addKey("S");

        my.sprite.player = new Player(this, game.config.width / 6, game.config.height / 2, "player", null, this.controls);
        my.sprite.player.setScale(0.5);
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.body.setMaxVelocityX(700);
        my.sprite.player.body.setMaxVelocityY(700);

        my.sprite.carFast = this.spawnCar();
        my.sprite.carFast.setScale(0.5);

        // Load collision sound
        this.explosionSound = this.sound.add("explosionSound", { "volume": 0.1 });

        // Display the points on the top right corner of the screen
        this.pointsText = this.add.text(
            game.config.width - borderUISize + borderPadding,
            borderUISize - borderPadding,
            "Points: 0", // Initial text
            {
            fontSize: '28px',
            fill: '#fff',
            fontStyle: 'bold'
            }
        ).setOrigin(1, 0);

        // Initialize the timer immediately in create()

        // display timer text
        this.timerText = this.add.text(
            game.config.width / 2,
            borderUISize,
            "Time: 02:00", // Initial text (2 minutes)
            {
                fontSize: '28px',
                fill: '#fff',
                fontStyle: 'bold',
            }
        ).setOrigin(2.6, 0.6); // Set anchor point to center top

        //this.updateTimer(); // Call to initialize display

        // this.updateTimer(); // Call once to initialize the display
        this.timerEvent = this.time.addEvent({ // Use this.time directly
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true,
        });
    }

    update(time, delta) {
        let my = this.my;
        let car = my.sprite.carFast;

        my.sprite.player.update();

        if (!this.gameOver && my.sprite.carFast.visible) {
            car.update();

            if (this.collides(my.sprite.player, car)) {
                this.createExplosion(car.x, car.y); // Trigger explosion effect
                this.explosionSound.play();         // Play explosion sound
                car.visible = false;
                car.y = -100;
                this.respawn();

                this.points += 1; // increment points for player for each collision with car
                this.timer += 3000; // Increase timer by 20 seconds on collision
            }

            if (car.x < -car.displayWidth) {
                car.visible = false;
                car.y = -100;
                this.respawn();
            }

            console.log(delta);
            this.timerUpdate(delta);
        }

        if (this.gameOver) {
            if (Phaser.Input.Keyboard.JustDown(this.return))
                this.scene.start("titleScreen");
        }

        // update the text for the points
        this.pointsText.setText(`Points: ${this.points}`);
    }
    
    displayGameOver() {
        let my = this.my;

        my.sprite.player.makeInactive();
        this.add.bitmapText(game.config.width / 2, (game.config.height / 2 - 40), "pixel_square", "game over", 30).setOrigin(0.5);
        this.add.bitmapText(game.config.width / 2, game.config.height / 2, "pixel_square", "press ENTER to return", 30).setOrigin(0.5);
        this.gameOver = true;
    }

    spawnCar() {
        let yPos = Phaser.Math.Between(0, game.config.height);
        let diceRoll = Math.random();
        let texture = "carFast";
        if (diceRoll < 0.75) {
            texture = "carFast";
        } else if (diceRoll >= 0.75) {
            texture = "ambulance";
        }
        return new Car(this, game.config.width + 100, yPos, texture, null, this.carSpeed);
    }

    respawn() {
        let my = this.my;

        my.sprite.carFast.destroy();
        my.sprite.carFast = this.spawnCar();
        my.sprite.carFast.setScale(0.5);
    }

    collides(player, object) {
        if (Math.abs(player.x - object.x) > (player.displayWidth / 2 + object.displayWidth / 2) * 0.8)
            return false;
        if (Math.abs(player.y - object.y) > (player.displayHeight / 2 + object.displayHeight / 2) * 0.7)
            return false;
        return true;
    }

    createExplosion(x, y) {
        const emitter = this.add.particles(x, y, 'particle', {
            lifespan: 400,
            speed: { min: 180, max: 220 },
            scale: { start: 2, end: 0 },
            blendMode: 'ADD',
            emitting: false
        });
        emitter.explode(16);
    }

    timerUpdate(delta) {
        console.log("Timer before update:", this.timer); // Debugging
        this.timer -= delta;
    
        if (this.timer <= 0 && !this.gameOver) {
            this.timer = 0; // Stop at zero
            this.gameOver = true;
            this.displayGameOver(); // Call gameOver function
        }
    
        let minutes = Math.floor(this.timer / 60000);
        let seconds = Math.floor((this.timer % 60000) / 1000).toString().padStart(2, "0");
        let formattedTime = `Time: ${minutes}:${seconds}`;

        this.timerText.setText(formattedTime);
        console.log("Timer after update:", this.timer); // Debugging
    }

    init_game() {
        this.gameOver = false;
        this.periodicTimer = 0;
    }
}
