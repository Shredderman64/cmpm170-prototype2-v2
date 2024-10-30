class Throwable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, throwDirection) {
        super(scene, x, y, texture, frame);

        this.x = x;
        this.y = y;
        this.throwDistance = Phaser.Math.Between(100, 600);
        this.throwDirection = throwDirection;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        return this;
    }

    update() {
        if (throwDirection > 0) {
            this.y--;
        }
        else if (throwDirection < 0) {
            this.y++;
        }
    }
}