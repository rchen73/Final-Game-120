// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this); // add to existing, displayList, updateList
        this.moveSpeed = 2;       // pixels per frame
    }

    update() {
        // left/right movement
        if(keyLeft.isDown) {
            this.x -= this.moveSpeed;
        } else if(keyRight.isDown) {
            this.x += this.moveSpeed;
        }
    }
}