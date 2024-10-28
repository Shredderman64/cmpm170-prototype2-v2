class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, controls) {
        super(scene, x, y, texture, frame);

        this.controls = controls;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.ACCELERATION = 2560;
        this.DRAG = 1000;

        return this;
    }

    update() {
        if (this.controls.left.isDown || this.controls.right.isDown) {
            if (this.controls.left.isDown) {
                this.body.setAccelerationX(-this.ACCELERATION);
            }
            if (this.controls.right.isDown) {
                this.body.setAccelerationX(this.ACCELERATION);
            }
        } else {
            this.body.setAccelerationX(0);
            this.body.setDragX(this.DRAG);
        }
        if (this.controls.up.isDown || this.controls.down.isDown) {
            if (this.controls.up.isDown) {
                this.body.setAccelerationY(-this.ACCELERATION);
            }
            if (this.controls.down.isDown) {
                this.body.setAccelerationY(this.ACCELERATION);
            }
        } else {
            this.body.setAccelerationY(0);
            this.body.setDragY(this.DRAG);
        }
    }
}