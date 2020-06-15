
class Lost extends Phaser.Scene {
    constructor() {
        super({ key: "Lost" });
    } // end constructor


    // load asset file this.messageTime = this.add.text(70, 320, "You have " + decrement + " seconds until game starts", { fontSize: "32px", fill: "#000" });
    preload() {
        // load images this.messageTime = this.add.text(70, 320, "You have " + decrement + " seconds until game starts", { fontSize: "32px", fill: "#000" });
        this.load.image("lost", "assets/tear.png");
    }


    // executed once, after assets were loaded
    create() {
        //  A simple background for our game
        this.add.image(400, 300, "lost");
        this.message = this.add.text(100, 400, "Oh no, you lost. Please try again", { fontSize: "28px", fill: "#ffffff" });

    }
}