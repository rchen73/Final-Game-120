let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [Play],
    physics: {
        default: "arcade"
    }
}

let game = new Phaser.Game(config);

let spaceBar, keyLeft, keyRight;