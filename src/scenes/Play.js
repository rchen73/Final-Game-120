// Play Scene
class Play extends Phaser.Scene {
    constructor() {
        super("Play");
    }

    preload() {
        this.load.image("ghost", "./assets/ghost.png");
    }

    create() {
        this.player = this.physics.add.sprite(200, 380, "ghost");
        this.player.setGravityY(900);
        this.player.setCollideWorldBounds(true);

        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    bigJump() {
        if (this.player.body.touching.down) {
            this.player.setVelocityY(-600);
        }
    }

    update() {
        // left/right movement
        if(keyLeft.isDown) {
            this.player.setVelocityX(-500);
        } else if(keyRight.isDown) {
            this.player.setVelocityX(500);
        } else if(spaceBar.isDown) {
            this.player.setVelocityY(-200);
        }
    }
};