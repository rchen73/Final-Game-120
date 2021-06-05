// FourthLevel Scene
class FourthLevel extends Phaser.Scene {
    constructor() {
        super("FourthLevel");
    }

    preload() {
        this.load.image("bossBG", "./assets/bossBG.png");
        this.load.spritesheet('boss', './assets/boss.png', {frameWidth: 200, frameHeight: 240, startFrame: 0, endFrame: 23});
    }

    create() {
        // define background
        let bg = this.add.image(0, 0, 'bossBG').setOrigin(0, 0);

        // define player 
        this.player = new Player(this, 370, 520, 'player');

        // define boss
        this.boss = this.physics.add.sprite(600, 400, "boss");
        this.boss.body.setImmovable(true);

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('boss', {start: 0, end: 23, first: 0}),
            frameRate: 20,
            repeat: -1
        });

        this.boss.anims.play('attack');

        this.health = 1000;

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

        this.cameras.main.fadeIn(1000);
    }

    update() {
        this.player.update();

        if(this.player.y > 700 && level == 4) {
            level = 3;
            this.scene.start('ThirdLevel');
        }

        if(keyA.isDown && this.hitBoss) {
            this.health -= 1;
        }

        if(this.health == 0) {
            this.boss.destroy();
            this.time.delayedCall(3000, () => {
                this.scene.start('GameOver');
            });
        }
    }
};