class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    
    preload() {
        this.load.setPath("./assets/");

        this.load.image("player", "carPlayer.png");
        this.load.image("carFast", "carFast.png");
        this.load.image("carSlow", "carSlow.png");
        this.load.image("carThrow", "carThrow.png");
        this.load.image("carCutOff", "carCutOff.png");
        this.load.image("carTruck", "truck.png");
        this.load.image("mailbox", "mailbox.png");
        this.load.image("fireHydrant", "fireHydrant.png");
        this.load.image("cone", "traffic-cone.png");
        this.load.image("dumpster", "dumpster.png");
        this.load.image("post", "post.png");

        this.load.bitmapFont("pixel_square", "fonts/pixel_square_0.png", "fonts/pixel_square.fnt");

        // preload background
        this.load.image("menu_background", "lilguy_background.png");

        // preload particle sheet
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
        
        // preload audio
        this.load.audio("spawnReset", "audio/powerUp1.ogg");
        this.load.audio("coinPickup", "audio/powerUp2.ogg");
        this.load.audio("keyPickup", "audio/powerUp5.ogg");

        this.load.audio("playerHurt", "audio/explosionCrunch_000.ogg");
        this.load.audio("playerDeath", "audio/explosionCrunch_004.ogg");

        this.load.audio("bounce", "audio/phaseJump1.ogg");
        this.load.audio("squash", "audio/impactPlate_light_000.ogg");
        this.load.audio("pew", "audio/laserSmall_000.ogg");

        // preload font
        this.load.bitmapFont("retro", "fonts/retro_0.png", "fonts/retro.fnt");
    }

    create() {
        // create animations
        this.anims.create({
            key: "walk",
            defaultTextureKey: "tilemap_characters",
            frames: [
                { frame: 0 },
                { frame: 1 }
            ],
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: "enemyProjIdle",
            defaultTextureKey: "tilemap_characters",
            frames: [
                { frame: 11 }
            ],
            repeat: -1
        })

        this.anims.create({
            key: "enemyProjShoot",
            defaultTextureKey: "tilemap_characters",
            frames: [
                { frame: 12 }
            ],
            repeat: -1
        })


        this.scene.start("titleScreen");
    }
}