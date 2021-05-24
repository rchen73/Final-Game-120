// ThirdLevel Scene
class ThirdLevel extends Phaser.Scene {
    constructor() {
        super("ThirdLevel");
    }

    preload() {
    }

    create() {
        // define player 
        this.player = this.physics.add.sprite(200, 380, "ghost");
        this.player.setGravityY(900);
        this.player.setCollideWorldBounds(true);
        this.player.jumpState = 0;
        this.player.jumpCount = 1;

        // define keys
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // define platforms
        var platforms = this.physics.add.staticGroup()
        platforms.create(200, 640, 'ground');
        platforms.create(600, 640, 'ground');
        platforms.create(950, 640, 'ground');
        platforms.create(1220, 520, 'ground');
        platforms.create(920, 400, 'ground');
        platforms.create(320, 400, 'ground');
        platforms.create(60, 280, 'ground');
        platforms.create(60, 520, 'ground');
        platforms.create(1200, 280, 'ground');

        this.touchGround = this.physics.add.collider(this.player, platforms);

        // next scene
        this.teleport = this.physics.add.sprite(950, 100, "ground");
        this.teleport.body.setImmovable(true);

        nextTrue = false;
        this.physics.add.overlap(this.player, this.teleport, function () {
            nextTrue = true;
        });

    }

    update() {
        // left/right movement
        if(keyLeft.isDown) {
            this.player.setVelocityX(-400);
        } else if(keyRight.isDown) {
            this.player.setVelocityX(400);
        }

        if(!keyLeft.isDown && !keyRight.isDown) {
            this.player.setVelocityX(0);
        }

        // jump logic
        if(Phaser.Input.Keyboard.JustDown(spaceBar) && this.player.jumpCount > 0) {
            this.player.setVelocityY(-500);
            this.player.jumpState = 1;
            this.player.jumpCount = 0;
            this.sound.play("jump");
        }

        if(this.player.jumpState = 1) {
            if(this.player.body.velocity.y >= 0) {
                this.player.jumpState = 2;
            }
        }

        if(this.player.jumpState == 2) {
            if(this.player.body.velocity.y == 0) {
                this.player.jumpState == 0;
                this.player.jumpCount = 1;
            }
        }

        /*if(nextTrue && level == 2) {
            level = 3;
            this.scene.start('SecondLevel');
        }*/

        if (this.player.y > 600 && level == 3) {
            level = 2;
            this.scene.start('SecondLevel');
        }
    }
};