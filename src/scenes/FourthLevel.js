// FourthLevel Scene
class FourthLevel extends Phaser.Scene {
    constructor() {
        super("FourthLevel");
    }

    preload() {
        this.load.image("bossBG", "./assets/bossBG.png");
        this.load.spritesheet('boss', './assets/boss.png', {frameWidth: 200, frameHeight: 240, startFrame: 0, endFrame: 23});
        this.load.image("fire", "./assets/fire.png");
        this.load.audio('sword', './assets/sword.wav');
        this.load.audio('sizzle', './assets/sizzle.mp3');
        this.load.audio('death', './assets/death.mp3');
        this.load.audio('battle', './assets/battle.wav');
    }

    create() {
        // define background
        let bg = this.add.image(0, 0, 'bossBG').setOrigin(0, 0);

        // play background music
        this.playBGM = this.sound.add('battle', {volume: 0.5, loop: true });
        this.playBGM.play();

        // define player 
        this.player = new Player(this, 370, 520, 'player');

        playerHP = 50;

        // define boss
        this.boss = this.physics.add.sprite(600, 400, "boss");
        this.boss.body.setImmovable(true);

        // boss animation
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('boss', {start: 0, end: 23, first: 0}),
            frameRate: 20,
            repeat: -1
        });

        this.boss.anims.play('attack');

        // boss HP
        this.bossHP = 100;

        // fire attack
        this.fire = this.physics.add.sprite(100, 300, 'fire').setBounce(1).setVelocityX(500).setDepth(1).setCollideWorldBounds(true);

        // collision with fire attack
        hitByFire = false;
        this.physics.add.overlap(this.player, this.fire, function () {
            hitByFire = true;
        });

        // define keys
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        // define platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(370, 620, 'ground');
        platforms.create(240, 490, 'ground');
        platforms.create(410, 360, 'ground');
        platforms.create(770, 380, 'ground');
        platforms.create(1000, 420, 'ground');

        // collision with platforms
        this.touchGround = this.physics.add.collider(this.player, platforms);

        // define walls
        var walls = this.physics.add.staticGroup();
        walls.create(20, 390, 'wall');
        walls.create(1150, 390, 'wall');

        // collision with walls
        this.touchWalls = this.physics.add.collider(this.player, walls);

        // collision with boss
        this.hitBoss = this.physics.add.collider(this.player, this.boss);

        // bgm change logic
        fourthFall = false;

        // fade scene transition
        this.cameras.main.fadeIn(1000);
    }

    update() {
        this.player.update();

        // falling to previous scene
        if(this.player.y > 700 && level == 4) {
            level = 3;
            this.scene.start('ThirdLevel');
            this.playBGM.stop();
            fourthFall = true;
        }
        
        // hitting boss
        if(Phaser.Input.Keyboard.JustDown(keyA) && this.hitBoss) {
            this.bossHP -= 1;
            this.sound.play('sword');
        }

        // fire hitting player
        if(hitByFire) {
            hitByFire = false;
            playerHP -= 1;
            this.sound.play('sizzle', {volume: 0.1});
        }

        // player death transition
        if(playerHP == 0) {
            this.sound.play('death', {volume: 0.3});
            this.player.setVisible(false);
            this.time.delayedCall(2000, () => {
                this.playBGM.stop();
                this.scene.start('GameOver');
            });
        }

        // boss death transition
        if(this.bossHP == 0) {
            this.boss.destroy();
            this.time.delayedCall(2000, () => {
                this.playBGM.stop();
                this.scene.start('GameOver');
            });
        }
    }
};