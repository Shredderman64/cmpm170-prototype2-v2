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
        let diceRoll = Math.floor(Phaser.Math.Between(0, 6));
        if (diceRoll < 2)
            this.y = this.scene.my.sprite.player.y;
        else if (diceRoll >= 2)
            this.y = Phaser.Math.Between(0, game.config.height);
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }
}