class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, controls) {
        super(scene, x, y, texture, frame);

        this.controls = controls;

        this.playerSpeed = 10;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.ACCELERATION = 2560;
        this.DRAG = 1000;

        return this;
    }

    update() {
        if (this.isDown(this.controls)) {
            if (this.controls.left.isDown) {
                this.body.setAccelerationX(-this.ACCELERATION);
            }
            if (this.controls.right.isDown) {
                this.body.setAccelerationX(this.ACCELERATION);
            }
            if (this.controls.up.isDown) {
                this.body.setAccelerationY(-this.ACCELERATION);
            }
            if (this.controls.down.isDown) {
                this.body.setAccelerationY(this.ACCELERATION);
            }
        } else {
            this.stop();
        }
    }

    isDown(controls) {
        for (const key in controls) {
            if (controls[key].isDown) return true;
        }
        return false;
    }
    stop() {
        this.body.setAccelerationX(0);
        this.body.setAccelerationY(0);
        this.body.setDrag(this.DRAG);
    }
}