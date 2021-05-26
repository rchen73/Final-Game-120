let config = {
    type: Phaser.AUTO,
    width: 1170,
    height: 780,
    scene: [Title, FirstLevel, SecondLevel, ThirdLevel],
    physics: {
        default: "arcade"
    }
}

let game = new Phaser.Game(config);

let spaceBar, keyLeft, keyRight, keyA;

var visible, nextTrue, level;