class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        this.load.image("gameOver", "./assets/gameOver.png");
    }

    create() {
        // define background
        let bg = this.add.image(0, 0, 'gameOver').setOrigin(0, 0);
        
        // define key
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.cameras.main.fadeIn(1000);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(spaceBar)) {
            this.scene.start('Title');
        }
    }
}