class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        this.load.image("gameOver", "./assets/gameOver.png");
        this.load.audio('win', './assets/win.wav');
        this.load.audio('fail', './assets/fail.wav');
    }

    create() {
        // define background
        let bg = this.add.image(0, 0, 'gameOver').setOrigin(0, 0);

        // play background music
        if(playerHP > 0) {
            this.playBGM = this.sound.add('win', {volume: 0.5, loop: true });
            this.playBGM.play();
        } else {
            this.playBGM = this.sound.add('fail', {volume: 0.5, loop: true });
            this.playBGM.play();
        }
        
        // define key
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // fade scene transition
        this.cameras.main.fadeIn(1000);
    }

    update() {
        // key scene transition
        if(Phaser.Input.Keyboard.JustDown(spaceBar)) {
            this.playBGM.stop();
            this.scene.start('Title');
        }
    }
}