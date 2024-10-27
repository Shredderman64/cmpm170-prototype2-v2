class Car extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame);

        this.speed = speed;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        return this;
    }

    update() {
        // basic enemy functionality - walk back and forth
        this.x += this.speed;
    }
}