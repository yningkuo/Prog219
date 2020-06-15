
class GameStartScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameStartScene" });
    } // end constructor


    // load asset file this.messageTime = this.add.text(70, 320, "You have " + decrement + " seconds until game starts", { fontSize: "32px", fill: "#000" });
    preload() {
        // load images this.messageTime = this.add.text(70, 320, "You have " + decrement + " seconds until game starts", { fontSize: "32px", fill: "#000" });
        this.load.image("background", "assets/background.png");
        this.load.image("duck", "assets/duck.jpeg");
        this.load.image("star", "assets/apple.png");

    }


    // executed once, after assets were loaded
    create() {
        //  A simple background for our game
        this.add.image(400, 300, "background");

        //  The message
        this.message1 = this.add.text(150, 360, "Welcome to Phaser games!", { fontSize: "28px", fill: "#000" });
        this.messageTime = this.add.text(70, 320, "You have " + decrement + " seconds until game starts", { fontSize: "28px", fill: "#000" });
        this.message2 = this.add.text(150, 400, "Press any arrow key to start.", { fontSize: "28px", fill: "#000" });
        this.message3 = this.add.text(150, 440, "Get 120 points to win!", { fontSize: "28px", fill: "#000" });

       // this.message4 = this.add.text(100, 480, "Good Luck!", { fontSize: "32px", fill: "#000" });

        //  set up cursor (arrow) Input Events
        this.cursors = this.input.keyboard.createCursorKeys();
        this.myTimer(); // get my countdown running, this shows the user the countdown
        // using a game level (not scene level), use of a built in javascript function


        this.ducks = this.physics.add.group();

        // this is a phaser cabability
        //this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.doSomething, callbackScope: this, repeat: 8 });
    // repeat 0 gets 1, 8 gets 9
    }

// when ever my phaser addEvent fires, waiting 1 sec and then firing 3 times
    // this code runs, launching another bomb
    doSomething = function () {
        var duck = this.ducks.create(0, 0, "duck");
        duck.setBounce(1);
        duck.setCollideWorldBounds(true);
        duck.setVelocity(Phaser.Math.Between(-200, 200), 20);
        duck.allowGravity = true;
    }

    myTimer() {
        this.timer = setInterval(function () {
            //console.log(decrement--);
            this.timer = decrement--;
        }, 1000);
    }

    // executed on every frame (60 times per second)
    update() {
        // set up cursor movement
        if (this.cursors.left.isDown) {
            this.gameOver();
        } else if (this.cursors.right.isDown) {
            this.gameOver();
        }
        if (this.cursors.up.isDown) {
            this.gameOver();
        } else if (this.cursors.down.isDown) {
            this.gameOver();
        }

        if (decrement <= 0) {
            this.gameOver();
        }
        
        this.messageTime.setText("You have " + decrement + " seconds until game starts");


    }

    gameOver() {

        // shake the camera
        this.cameras.main.fade(500);

        // fade camera
        this.time.delayedCall(250, function () {
            this.cameras.main.fade(250);
        }, [], this);

        // restart game
        this.time.delayedCall(500, function () {
            this.scene.start("StarsGame");  // jump to scene with that key name
        }, [], this);
    }


} // end class