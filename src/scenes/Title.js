class Title extends Phaser.Scene {
    constructor() {
        super("Title");
    }

    preload() {
    }

    create() {
        let placeholder = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            backgroundColor: '#ffe100',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 300,
            fixedHeight: 50
        }
        this.title = this.add.text(500, 500, "press spacebar", placeholder);

        // define key
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(spaceBar)) {
            this.scene.start('Play');    
        }
    }
}