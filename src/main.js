let config = {
    type: Phaser.AUTO,
    width: 1170,
    height: 780,
    scene: [Title, FirstLevel, SecondLevel, ThirdLevel, FourthLevel, GameOver],
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }
}

let game = new Phaser.Game(config);

let spaceBar, keyLeft, keyRight, keyA;

var visible, nextTrue, level;