class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    
    preload() {
        this.load.setPath("./assets/");

        this.load.spritesheet("car_sheet", "carSprites.png", {
            frameWidth: 400,
            frameHeight: 400
        });

        this.load.image("player", "carPlayer.png");
        this.load.image("carFast", "carFast.png");
        this.load.image("throw", "throw.png");
        this.load.image("ambulance", "carAmbulence.png")
        this.load.image("racetrack", "racetrack.png");

        this.load.bitmapFont("pixel_square", "fonts/pixel_square_0.png", "fonts/pixel_square.fnt");

        // preload background
        //this.load.image("menu_background", "lilguy_background.png");
    }

    create() {
        // create animations

        this.anims.create({
            key: "warning",
            defaultTextureKey: "car_sheet",
            frameRate: 20,
            frames: [
                { frame: 0 },
                { frame: 1 }
            ],
            repeat: -1
        });

        this.anims.create({
            key: "idle",
            defaultTextureKey: "car_sheet",
            frames: [
                { frame: 0 }
            ],
            repeat: -1
        });
        
        /*
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

        */
        this.scene.start("titleScreen");
    }
}