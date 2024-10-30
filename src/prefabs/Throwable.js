class Throwable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, throwDirection, carSpeed) {
        super(scene, x, y, texture, frame);

        this.x = x;
        this.throwDistance = Phaser.Math.Between(100, 300);
        if (throwDirection > 0)
            this.y = y + this.throwDistance;
        else
            this.y = y - this.throwDistance;
        this.throwDirection = throwDirection;
        this.carSpeed = carSpeed;
        this.speed = this.carSpeed + 5;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        return this;
    }

    update() {
        this.speed = this.carSpeed + 5;
        this.x -= this.speed;
        if (this.x < 0)
            this.destroy();
    }
}