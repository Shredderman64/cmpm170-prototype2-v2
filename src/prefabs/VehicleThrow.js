class Car extends Phaser.GameObjects.Scene {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame, speed);

        scene.add.existing(this);
        this.speed;
        this.timer = 0;
        this.shoot = false;
        this.aimX = 0;
        this.aimY = 0;

        return this;
    }

    update() {
        // basic enemy functionality - walk back and forth
        this.x += this.speed;
        this.timer++;
        if (this.timer == 100 && !this.shoot) {
            this.shoot = true;
            this.timer = 0;
        }
    }
}