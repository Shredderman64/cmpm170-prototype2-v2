class CarThrow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame, speed);

        this.speed = speed;
        this.x = x;
        this.y = y;
        this.timer = 0;
        this.shoot = false;

        return this;
    }

    update() {
        this.x -= this.speed;
        // basic enemy functionality - walk back and forth
        this.timer++;
        if (this.timer == 200 && !this.shoot) {
            this.shoot = true;
            this.timer = 0;
        }
    }

    setPosition() {
        this.x = game.config.width + 100;
        let diceRoll = Math.floor(Phaser.Math.Between(0, 6));
        if (diceRoll < 2)
            this.y = this.scene.my.sprite.player.y;
        else if (diceRoll >= 2)
            this.y = Phaser.Math.Between(0, game.config.height);
    }

    // Helper function to set speed (optional, can also just modify this.speed directly)
    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }
}