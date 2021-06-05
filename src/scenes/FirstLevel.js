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
        this.load.image("key", "./assets/key.png");
        this.load.image("door", "./assets/door.png");
        this.load.image("wall", "./assets/wall.png");
        this.load.spritesheet('left', './assets/left.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 9});
        this.load.spritesheet('right', './assets/right.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 9});
        this.load.spritesheet('attackLeft', './assets/attackLeft.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 9});
        this.load.spritesheet('attackRight', './assets/attackRight.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 9});
        this.load.spritesheet('jumpLeft', './assets/jumpLeft.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 6});
        this.load.spritesheet('jumpRight', './assets/jumpRight.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 6});
    }

    create() {
        // define background
        let bg = this.add.image(0, 0, 'firstBG').setOrigin(0, 0);
        
        // define player 
        this.player = new Player(this, 70, 500, 'player');

        // define keys
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        // define platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(550, 815, 'ground').setScale(10).refreshBody().setDepth(-1);
        platforms.create(330, 640, 'ground');
        platforms.create(550, 520, 'ground');
        platforms.create(785, 420, 'ground');
        platforms.create(730, 220, 'ground');
        platforms.create(880, 130, 'ground');
        platforms.create(420, 300, 'ground');
        platforms.create(330, 200, 'ground');

        // collision with platforms
        this.touchGround = this.physics.add.collider(this.player, platforms);

        // define walls
        var walls = this.physics.add.staticGroup();
        walls.create(240, 100, 'wall');
        walls.create(980, 275, 'wall');
        walls.create(-30, 330, 'wall').setDepth(-1);

        // collision with walls
        this.touchWalls = this.physics.add.collider(this.player, walls);

        // next scene
        this.teleport = this.physics.add.sprite(880, 60, "door");
        this.teleport.body.setImmovable(true);
        visible = false;
        this.teleport.setVisible(visible);

        this.key = this.physics.add.sprite(330, 150, "key");
        this.key.body.setImmovable(true);
        this.physics.add.overlap(this.player, this.key, function () {
            visible = true;
        });

        nextTrue = false;
        this.physics.add.overlap(this.player, this.teleport, function () {
            nextTrue = true;
        });

        level = 1;

        this.cameras.main.fadeIn(1000);
    }

    update() {
        this.player.update();

        if(visible) {
            this.teleport.setVisible(visible);
            this.key.setVisible(false);
        }

        if(nextTrue && level == 1) {
            level = 2;
            this.scene.start('SecondLevel');
        }
    }
};