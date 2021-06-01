// SecondLevel Scene
class SecondLevel extends Phaser.Scene {
    constructor() {
        super("SecondLevel");
    }

    preload() {
        this.load.image("secondBG", "./assets/secondBG.png");
    }

    create() {
        // define background
        let bg = this.add.image(0, 0, 'secondBG').setOrigin(0, 0);

        // define player 
        this.player = new Player(this, 350, 550, 'player');
        this.player.setCollideWorldBounds(true);

        // define keys
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // define platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(330, 660, 'ground');
        platforms.create(500, 560, 'ground');
        platforms.create(330, 430, 'ground');
        platforms.create(560, 320, 'ground');
        platforms.create(380, 190, 'ground');
        platforms.create(940, 560, 'ground');
        platforms.create(900, 670, 'ground');
        platforms.create(740, 430, 'ground');
        platforms.create(920, 300, 'ground');
        platforms.create(740, 170, 'ground');

        // collision with platforms
        this.touchGround = this.physics.add.collider(this.player, platforms);

        // define walls
        var walls = this.physics.add.staticGroup();
        walls.create(240, 350, 'wall');
        walls.create(970, 350, 'wall');
        walls.create(650, 110, 'wall');

        // collision with walls
        this.touchWalls = this.physics.add.collider(this.player, walls);

        // next scene
        this.teleport = this.physics.add.sprite(720, 100, "door");
        this.teleport.body.setImmovable(true);

        nextTrue = false;
        this.physics.add.overlap(this.player, this.teleport, function () {
            nextTrue = true;
        });

    }

    update() {
        this.player.update();

        if(nextTrue && level == 2) {
            level = 3;
            this.scene.start('ThirdLevel');
        }

        if (this.player.y > 700 && level == 2) {
            level = 1;
            this.scene.start('FirstLevel');
        }
    }
};