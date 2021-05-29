// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.jumpState = 0;
        this.jumpCount = 1;
        this.direction = 1;

        this.sfx = scene.sound.add('jump');
        
        this.anims.create({
            key: 'idleLeft',
            frames: [{key: 'left', frame: 0}],
            frameRate: 20
        });

        this.anims.create({
            key: 'idleRight',
            frames: [{key: 'right', frame: 0}],
            frameRate: 20
        });

        this.anims.create({
            key: 'moveLeft',
            frames: this.anims.generateFrameNumbers('left', {start: 0, end: 9, first: 0}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'moveRight',
            frames: this.anims.generateFrameNumbers('right', {start: 0, end: 9, first: 0}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'attackLight',
            frames: this.anims.generateFrameNumbers('attackLeft', {start: 0, end: 9, first: 0}),
            frameRate: 20,
        });

        this.anims.create({
            key: 'attackRight',
            frames: this.anims.generateFrameNumbers('attackRight', {start: 0, end: 9, first: 0}),
            frameRate: 20,
        });
    }
    create(){
    }

    update(){
        if(keyLeft.isDown) {
            this.setVelocityX(-400);
            this.direction = 0;
        } else if(keyRight.isDown) {
            this.setVelocityX(400);
            this.direction = 1;
        }

        if(Phaser.Input.Keyboard.JustDown(keyLeft)) {
            this.anims.play('moveLeft');
        } else if(Phaser.Input.Keyboard.JustDown(keyRight)) {
            this.anims.play('moveRight');
        }

        if(!keyLeft.isDown && !keyRight.isDown) {
            this.setVelocityX(0);
            if(this.direction == 0) {
                this.anims.play('idleLeft');
            } else if(this.direction == 1) {
                this.anims.play('idleRight');
            }
        }

        // jump logic
        if(Phaser.Input.Keyboard.JustDown(spaceBar) && this.jumpCount > 0) {
            this.setVelocityY(-500);
            this.jumpState = 1;
            this.jumpCount = 0;
            this.sfx.play();
        }

        if(this.jumpState = 1) {
            if(this.body.velocity.y >= 0) {
                this.jumpState = 2;
            }
        }

        if(this.jumpState == 2) {
            if(this.body.velocity.y == 0) {
                this.jumpState == 0;
                this.jumpCount = 1;
            }
        }

        if(keyA.isDown) {
            this.anims.play('attackRight');
        }
    }
}