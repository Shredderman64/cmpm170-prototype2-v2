class Car extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame, speed);

        scene.add.existing(this);
        this.speed;

        return this;
    }

    update() {
        // basic enemy functionality - walk back and forth
        this.x += this.speed;
    }
}