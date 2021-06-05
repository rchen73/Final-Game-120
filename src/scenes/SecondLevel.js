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
        
        // define keys
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        // define platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(330, 690, 'ground');
        platforms.create(480, 590, 'ground');
        platforms.create(330, 460, 'ground');
        platforms.create(560, 350, 'ground');
        platforms.create(380, 220, 'ground');
        platforms.create(600, 120, 'ground');
        platforms.create(940, 590, 'ground');
        platforms.create(890, 720, 'ground');
        platforms.create(740, 460, 'ground');
        platforms.create(920, 330, 'ground');
        platforms.create(740, 200, 'ground');

        // collision with platforms
        this.touchGround = this.physics.add.collider(this.player, platforms);

        // define walls
        var walls = this.physics.add.staticGroup();
        walls.create(240, 390, 'wall');
        walls.create(970, 390, 'wall');
        walls.create(650, 85, 'wall');

        // collision with walls
        this.touchWalls = this.physics.add.collider(this.player, walls);

        // next scene
        this.teleport = this.physics.add.sprite(725, 130, "door");
        this.teleport.body.setImmovable(true);
        visible = false;
        this.teleport.setVisible(visible);

        this.key = this.physics.add.sprite(590, 70, "key");
        this.key.body.setImmovable(true);
        this.physics.add.overlap(this.player, this.key, function () {
            visible = true;
        });

        nextTrue = false;
        this.physics.add.overlap(this.player, this.teleport, function () {
            nextTrue = true;
        });

        this.cameras.main.fadeIn(1000);
    }

    update() {
        this.player.update();

        if(visible) {
            this.teleport.setVisible(visible);
            this.key.setVisible(false);
        }

        if(nextTrue && level == 2) {
            level = 3;
            this.scene.start('ThirdLevel');
        }

        if(this.player.y > 700 && level == 2) {
            level = 1;
            this.scene.start('FirstLevel');
        }
    }
};