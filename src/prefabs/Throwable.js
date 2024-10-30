class Throwable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, throwDirection) {
        super(scene, x, y, texture, frame);

        this.x = x;
        this.throwDistance = Phaser.Math.Between(100, 300);
        if (throwDirection > 0)
            this.y = y + this.throwDistance;
        else
            this.y = y - this.throwDistance;
        this.throwDirection = throwDirection;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        return this;
    }

    update() {
        this.x -= 15;
        if (this.x < 0) {
            this.destroy();
        }
    }
}