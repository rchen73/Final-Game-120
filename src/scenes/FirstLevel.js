// FirstLevel Scene
class FirstLevel extends Phaser.Scene {
    constructor() {
        super("FirstLevel");
    }

    preload() {
        this.load.image("player", "./assets/player.png");
        this.load.image("ground", "./assets/ground.png");
        this.load.image("firstBG", "./assets/firstBG.png");
        this.load.audio("jump", "./assets/Gun.wav");
        this.load.image("candle", "./assets/candle.png");
        this.load.image("wall", "./assets/wall.png");
        this.load.spritesheet('left', './assets/left.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 9});
        this.load.spritesheet('right', './assets/right.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 9});
        this.load.spritesheet('attackLeft', './assets/attackLeft.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 9});
        this.load.spritesheet('attackRight', './assets/attackRight.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 9});
        this.load.spritesheet('jumpLeft', './assets/jumpLeft.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 6});
        this.load.spritesheet('jumpRight', './assets/jumpRight.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 6});
    }

    create() {
        let bg = this.add.image(0, 0, 'firstBG').setOrigin(0, 0);
        
        // define player 
        this.player = new Player(this, 70, 500, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(900);
        /*this.player = this.physics.add.sprite(50, 600, "player");
        this.player.setGravityY(900);
        this.player.setCollideWorldBounds(true);
        this.player.jumpState = 0;
        this.player.jumpCount = 1;
        this.player.direction = 1;

        this.anims.create({
            key: 'idleLeft',
            frames: [{key: 'left', frame: 0}],
            frameRate: 20
        });

        this.anims.create({
            key: 'idleRight',
            frames: [{key: 'right', frame: 0}],
            frameRate: 20
        });

        this.anims.create({
            key: 'moveLeft',
            frames: this.anims.generateFrameNumbers('left', {start: 0, end: 9, first: 0}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'moveRight',
            frames: this.anims.generateFrameNumbers('right', {start: 0, end: 9, first: 0}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'attackLight',
            frames: this.anims.generateFrameNumbers('attackLeft', {start: 0, end: 9, first: 0}),
            frameRate: 20
        });

        this.anims.create({
            key: 'attackRight',
            frames: this.anims.generateFrameNumbers('attackRight', {start: 0, end: 9, first: 0}),
            frameRate: 20
        });

        this.anims.create({
            key: 'jumpLeft',
            frames: this.anims.generateFrameNumbers('jumpLeft', {start: 0, end: 6, first: 0}),
            frameRate: 20,
            repeate: -1
        });

        this.anims.create({
            key: 'jumpRight',
            frames: this.anims.generateFrameNumbers('jumpRight', {start: 0, end: 6, first: 0}),
            frameRate: 20,
            repeat: -1
        });*/

        // define keys
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        // define platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(550, 820, 'ground').setScale(10).refreshBody().setDepth(-1);
        platforms.create(320, 640, 'ground');
        platforms.create(550, 520, 'ground');
        platforms.create(750, 420, 'ground');
        platforms.create(880, 320, 'ground');
        platforms.create(420, 300, 'ground');
        platforms.create(330, 200, 'ground');

        this.touchGround = this.physics.add.collider(this.player, platforms);

        var walls = this.physics.add.staticGroup();
        walls.create(240, 330, 'wall');
        walls.create(980, 330, 'wall');

        // next scene
        this.teleport = this.physics.add.sprite(800, 100, "ground");
        this.teleport.body.setImmovable(true);
        visible = false;
        this.teleport.setVisible(visible);

        this.candle = this.physics.add.sprite(350, 150, "candle");
        this.candle.body.setImmovable(true);
        this.physics.add.overlap(this.player, this.candle, function () {
            visible = true;
        });

        nextTrue = false;
        this.physics.add.overlap(this.player, this.teleport, function () {
            nextTrue = true;
        });

        level = 1;
    }

    update() {
        this.player.update();
        // left/right movement
        /*if(keyLeft.isDown) {
            this.player.setVelocityX(-400);
            this.player.direction = 0;
        } else if(keyRight.isDown) {
            this.player.setVelocityX(400);
            this.player.direction = 1;
        }

        if(Phaser.Input.Keyboard.JustDown(keyLeft)) {
            this.player.anims.play('moveLeft');
        } else if(Phaser.Input.Keyboard.JustDown(keyRight)) {
            this.player.anims.play('moveRight');
        }

        if(!keyLeft.isDown && !keyRight.isDown) {
            this.player.setVelocityX(0);
            if(this.player.direction == 0) {
                this.player.anims.play('idleLeft');
            } else if(this.player.direction == 1) {
                this.player.anims.play('idleRight');
            }
        }

        // jump logic
        if(Phaser.Input.Keyboard.JustDown(spaceBar) && this.player.jumpCount > 0) {
            if(this.player.direction == 0) {
                this.player.setVelocityY(-500);
                this.player.jumpState = 1;
                this.player.jumpCount = 0;
                this.sound.play("jump", {volume: 0.5});
                this.player.anims.play("jumpLeft");
            } else if(this.player.direction == 1) {
                this.player.setVelocityY(-500);
                this.player.jumpState = 1;
                this.player.jumpCount = 0;
                this.sound.play("jump", {volume: 0.5});
                this.player.anims.play("jumpRight");
            }
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

        if(keyA.isDown) {
            this.player.anims.play('attackRight');
        }*/

        if(visible) {
            this.teleport.setVisible(visible);
        }

        if(nextTrue && level == 1) {
            level = 2;
            this.scene.start('SecondLevel');
        }
    }
};