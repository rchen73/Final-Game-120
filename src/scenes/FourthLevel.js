// FourthLevel Scene
class FourthLevel extends Phaser.Scene {
    constructor() {
        super("FourthLevel");
    }

    preload() {
        this.load.image("bossBG", "./assets/bossBG.png");
    }

    create() {
        // define background
        let bg = this.add.image(0, 0, 'bossBG').setOrigin(0, 0);

        // define player 
        this.player = new Player(this, 330, 550, 'player');

        // define keys
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // define platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(335, 690, 'ground');

        // collision with platforms
        this.touchGround = this.physics.add.collider(this.player, platforms);
    }

    update() {
        this.player.update();

        if(visible) {
            this.teleport.setVisible(visible);
            this.key.setVisible(false);
        }

        if (this.player.y > 700 && level == 4) {
            level = 3;
            this.scene.start('ThirdLevel');
        }
    }
};