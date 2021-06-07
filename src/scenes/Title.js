class Title extends Phaser.Scene {
    constructor() {
        super("Title");
    }

    preload() {
        this.load.image("titleBG", "./assets/titleBG.png");
        this.load.audio('bgm', './assets/adventure.wav');
    }

    create() {
        // define background
        let bg = this.add.image(0, 0, 'titleBG').setOrigin(0, 0);

        // play background music
        bgm = this.sound.add('bgm', {volume: 0.3, loop: true });
        bgm.play();
        
        // define key
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // fade scene transition
        this.cameras.main.fadeIn(1000);
    }

    update() {
        // key scene transition
        if(Phaser.Input.Keyboard.JustDown(spaceBar)) {
            this.scene.start('FirstLevel');
        }
    }
}