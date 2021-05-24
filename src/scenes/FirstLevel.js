// FirstLevel Scene
class FirstLevel extends Phaser.Scene {
    constructor() {
        super("FirstLevel");
    }

    preload() {
        this.load.image("ghost", "./assets/ghost.png");
        this.load.image("ground", "./assets/ground.png");
        this.load.image('firstBG', './assets/firstBG.png');
        this.load.audio("jump", "./assets/Gun.wav");
        this.load.image('candle', "./assets/candle.png");
    }

    create() {
        let bg = this.add.image(0, 0, 'firstBG').setOrigin(0, 0);
        
        // define player 
        this.player = this.physics.add.sprite(200, 380, "ghost");
        this.player.setGravityY(900);
        this.player.setCollideWorldBounds(true);
        this.player.jumpState = 0;
        this.player.jumpCount = 1;

        this.cameras.main.setBounds(0, 0, bg.displayWidth, game.config.displayHeight);
        this.cameras.main.startFollow(this.player);

        // define keys
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // define platforms
        var platforms = this.physics.add.staticGroup()
        platforms.create(200, 640, 'ground');
        platforms.create(500, 520, 'ground');
        platforms.create(750, 420, 'ground');
        platforms.create(1100, 320, 'ground');
        platforms.create(250, 320, 'ground');
        platforms.create(60, 220, 'ground');

        this.touchGround = this.physics.add.collider(this.player, platforms);

        // next scene
        this.teleport = this.physics.add.sprite(800, 100, "ground");
        this.teleport.body.setImmovable(true);
        visible = 0;
        this.teleport.alpha = visible;

        this.candle = this.physics.add.sprite(80, 170, "candle");
        this.candle.body.setImmovable(true);
        this.physics.add.overlap(this.player, this.candle, function () {
            visible = 1;
        });

        nextTrue = false;
        this.physics.add.overlap(this.player, this.teleport, function () {
            nextTrue = true;
        });

        level = 1;
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

        if(nextTrue && level == 1) {
            level = 2;
            this.scene.start('SecondLevel');
        }
    }
};