// ThirdLevel Scene
class ThirdLevel extends Phaser.Scene {
    constructor() {
        super("ThirdLevel");
    }

    preload() {
        this.load.image("thirdBG", "./assets/thirdBG.png");
    }

    create() {
        // define background
        let bg = this.add.image(0, 0, 'thirdBG').setOrigin(0, 0);

        // define player 
        this.player = new Player(this, 330, 550, 'player');

        // define keys
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        // define platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(335, 690, 'ground');
        platforms.create(500, 590, 'ground');
        platforms.create(335, 460, 'ground');
        platforms.create(480, 370, 'ground');
        platforms.create(840, 490, 'ground');
        platforms.create(875, 360, 'ground');
        platforms.create(700, 230, 'ground');
        platforms.create(350, 140, 'ground');

        // collision with platforms
        this.touchGround = this.physics.add.collider(this.player, platforms);

        // define walls
        var walls = this.physics.add.staticGroup();
        walls.create(235, 390, 'wall');
        walls.create(965, 390, 'wall');

        // collision with walls
        this.touchWalls = this.physics.add.collider(this.player, walls);

        // next scene
        this.teleport = this.physics.add.sprite(330, 70, "door");
        this.teleport.body.setImmovable(true);
        visible = false;
        this.teleport.setVisible(visible);

        this.key = this.physics.add.sprite(335, 410, "key");
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

        if(nextTrue && level == 3) {
            level = 4;
            this.scene.start('FourthLevel');
        }

        if(this.player.y > 700 && level == 3) {
            level = 2;
            this.scene.start('SecondLevel');
        }
    }
};