let config = {
    type: Phaser.AUTO,
    width: 1170,
    height: 780,
    scene: [Title, FirstLevel, SecondLevel, ThirdLevel, FourthLevel, GameOver],
    physics: {
        default: "arcade",
    }
}

let game = new Phaser.Game(config);

// keys
let spaceBar, keyLeft, keyRight, keyA;

// global variables
var visible, nextTrue, level, hitByFire, playerHP, bgm, fourthFall;

/*
Ryan Chen: coding, level design, music, and sound effects
Chun Yin Chu: background art
Zhe Kou: character sprite art

music and sound effects credits:
bgm - adventure.wav - https://freesound.org/people/tyops/sounds/275807/
sword - sword.wav - https://freesound.org/people/Merrick079/sounds/568170/
battle - battle.wav - https://freesound.org/people/SamiHil/sounds/573803/
win - win.wav - https://freesound.org/people/Sheyvan/sounds/470083/
fail - fail.wav -https://freesound.org/people/FunWithSound/sounds/394900/
*/