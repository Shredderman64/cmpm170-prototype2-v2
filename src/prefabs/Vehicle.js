class Car extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame);

        this.speed = speed;
        this.x = x;
        this.y = y;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        return this;
    }

    update() {
        this.x -= this.speed;
        if (this.x < -this.displayWidth) {
            this.setPosition();
        }
    }

    setPosition() {
        this.x = game.config.width + 100;
        let playerY = this.scene.my.sprite.player.y;
        let minY = playerY - 100;  // Define a range to avoid around the player
        let maxY = playerY + 100;

        // Set y to a position outside the player's vertical range
        do {
            this.y = Phaser.Math.Between(0, game.config.height);
        } while (this.y > minY && this.y < maxY);  // Ensure it's outside the range
    }

    // Jump to the player's height
    jumpToPlayerHeight(player) {
        this.y = player.y;
    }

    // Sudden speed boost
    boostSpeed(amount, duration) {
        const originalSpeed = this.speed;  // Save the original speed
        this.setSpeed(this.speed + amount); // Increase the speed by the specified amount

        // Reset speed after the duration using a delayed timer
        this.scene.time.delayedCall(duration, () => {
            this.setSpeed(originalSpeed);  // Reset to original speed
        });
    }

    // Helper function to set speed (optional, can also just modify this.speed directly)
    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }
}
