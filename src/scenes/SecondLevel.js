// Play Scene
class SecondLevel extends Phaser.Scene {
    constructor() {
        super("SecondLevel");
    }

    preload() {
        this.load.image("ghost", "./assets/ghost.png");
        this.load.image("ground", "./assets/ground.png");
        this.load.audio("jump", "./assets/Gun.wav");
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
        platforms.create(1200, 520, 'ground');
        platforms.create(950, 400, 'ground');
        platforms.create(350, 400, 'ground');
        platforms.create(100, 280, 'ground');

        this.touchGround = this.physics.add.collider(this.player, platforms);
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

        if (this.player.y > 600 && level == 2) {
            level = 1;
            this.scene.start('Play');
        }
    }
};