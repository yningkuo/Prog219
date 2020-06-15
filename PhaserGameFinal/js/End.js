class End extends Phaser.Scene {
    constructor() {
            super({ key: "End" });
        } // end constructor


    // load asset file this.messageTime = this.add.text(70, 320, "You have " + decrement + " seconds until game starts", { fontSize: "32px", fill: "#000" });
    preload() {
        // load images this.messageTime = this.add.text(70, 320, "You have " + decrement + " seconds until game starts", { fontSize: "32px", fill: "#000" });
        this.load.image("kitten", "assets/laugh.png");
    }


    // executed once, after assets were loaded
    create() {
        //  A simple background for our game
        this.add.image(400, 300, "kitten");
        this.message = this.add.text(100, 400, "Congrats! YOU WON!", { fontSize: "48px", fill: "#ffffcc" });
    }
}