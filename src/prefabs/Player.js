class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, controls) {
        super(scene, x, y, texture, frame);

        this.left = controls.left;
        this.right = controls.right;
        this.up = controls.up;
        this.down = controls.down;

        this.playerSpeed = 10;

        scene.add.existing(this);

        return this;
    }

    update() {
        if (this.left.isDown) {
            if (this.x > (this.displayWidth / 2))
                this.x -= this.playerSpeed;
        }
        if (this.right.isDown) {
            if (this.x < (game.config.width - this.displayWidth / 2))
                this.x += this.playerSpeed;
        }
    }
}