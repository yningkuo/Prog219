class NinjaGame extends Phaser.Scene {
    constructor() {
        super({ key: "NinjaGame" });
    }

    
            changeSound = function (number) {
                if(number ===1){
                this.sound = this.sound.add('jump');
                }
                if(number ===2){
                this.sound = this.sound.add('staraudio');
            }
        }
    
        // ****************************************************************************************************
        // scene runs this first of 3 methods
        preload() {
    
            this.load.image("sky2", "assets/sky.jpg");
            this.load.image("ground", "assets/platform.png");
            this.load.image("star", "assets/star.png");
            this.load.image("money", "assets/money.png"); 
            this.load.image("spider", "assets/spider.png");
            this.load.spritesheet("balloon", "assets/balloon.png", { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet("bomb", "assets/bomb2.png", { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet("dude", "assets/test2.png", { frameWidth: 32, frameHeight: 32 });
    
            //load assets for sounds audio
       
            this.load.audio('bombaudio', 'assets/loseAudio.mp3');
            this.load.audio('staraudio', 'assets/starAudio2.mp3');
            this.load.audio('jump', 'assets/jump.mp3');
       
          
            
        }
    
         // ****************************************************************************************************
        // scene runs this second of 3 methods
    
    
    
        create() {
            this.score = 0;
            this.gameOver = false;
    
            //  A simple background for our game
            this.add.image(400, 300, "sky2");
            this.add.image(20, 20, "balloon");
    
    
            //  The platforms group contains the ground and the 2 ledges we can jump on
            this.platforms = this.physics.add.staticGroup();
    
            //  Here we create the ground.
            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    
            //  Now let's create some ledges
            //this.platforms.create(20, 270, 'ground');
            //this.platforms.create(120, 400, 'ground');
    
            //this.platforms.create(800, 240, 'ground');
            //this.platforms.create(560, 370, 'ground');
            //this.platforms.create(800, 450, 'ground');
    
            // The player and its settings
            this.player = this.physics.add.sprite(100, 400, "dude");
    
            //  Player physics properties. Give the little guy a slight bounce.
            this.player.setBounce(0.15);
            this.player.setCollideWorldBounds(true);
    
            //  Our player animations, turning, walking left and walking right.
            this.anims.create({
                key: "left",
                frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
    
            this.anims.create({
                key: "turn",
                frames: [{ key: "dude", frame: 4 }],
                frameRate: 20
            });
    
            this.anims.create({
                key: "right",
                frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            });
    
            //  Input Events
            this.cursors = this.input.keyboard.createCursorKeys();
            
            this.stars = this.physics.add.group();
            //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
            /*this.stars = this.physics.add.group({
                key: "star",
       
                repeat: 5,
                setXY: { x: 12, y: 0, stepX: 56 }
            });
    
            this.stars.children.iterate(function(child) {
    
                //  Give each star a slightly different bounce
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
            });*/
    
            this.bombs = this.physics.add.group();
    
    
            //  The score
            this.scoreText = this.add.text(16, 16, "score: 0", { fontSize: "32px", fill: "#000" });
    
            //  Collide the player and the stars with the platforms
            this.physics.add.collider(this.player, this.platforms);
            //this.physics.add.collider(this.stars, this.platforms);
            //this.physics.add.collider(this.bombs, this.platforms);
    
            //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
            this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
            //  Checks to see if the player overlaps with any of the bombs, if he does call the hitBomb function
            this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    
            //this.changeSound(2);  // 1 is jump
          
    
            this.timedEvent = this.time.addEvent({ delay: 3000, callback: this.doSomething, callbackScope: this, repeat: 3 });
            this.timedEvent = this.time.addEvent({ delay: 3000, callback: this.doSomething2, callbackScope: this, repeat: 20 });
         
               
        
        }
    
        doSomething = function () {
            var bomb = this.bombs.create(0, 16, "spider");
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = true;
    
    
        }
        doSomething2 = function () {
            var star = this.stars.create(0, 16, "money");
            star.setBounce(1);
            star.setCollideWorldBounds(true);
            star.setVelocity(Phaser.Math.Between(-200, 200), 20);
            star.allowGravity = true;
    
    
        }
    
         // ****************************************************************************************************
        // scene runs this third of 3 methods
        update() {
            if (this.gameOver) {
                return;
            }
    
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-200);
    
                this.player.anims.play("left", true);
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(200);
    
                this.player.anims.play("right", true);
            } else {
                this.player.setVelocityX(0);
    
                this.player.anims.play("turn");
            }
    
            //if (this.cursors.up.isDown && this.player.body.touching.down) {
              
              //  this.sound.play();
                //this.player.setVelocityY(-500);
            //}
    
    
        }
    
    
         // ****************************************************************************************************
        
        collectStar(player, star,bomb) {
            star.disableBody(true, true);
      
    
            //this.changeSound(2);  // 2 is star sound
            //this.sound = this.sound.add('staraudio');
            this.sound.play('staraudio');
            
            //  Add and update the scorelet
            this.score += 10;
            this.scoreText.setText("Score: " + this.score);
    
            if(this.score > 110){
                this.scene.start("End");  // jump to 2nd game scene with that key name
            }
    
    
    
            if (this.stars.countActive(true) === 0) {
      
                //  A new batch of stars to collect
                this.stars.children.iterate(function(child) {
            
                    child.enableBody(true, child.x, 0, true, true);
    
                });
    
                var x = (player.x < 320) ? Phaser.Math.Between(320, 640) : Phaser.Math.Between(0, 320);
                var bomb = this.bombs.create(x, 16, "spider");
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                bomb.allowGravity = true;
    
    
            }
        }
    
            hitBomb(player, bomb) {
                this.physics.pause();
                this.sound = this.sound.add('bombaudio');
                this.sound.play();
      //          if(player.x === bomb.x){
        //            this.gameover = true;
          //      }
                player.setTint(0xff0000);
    
                player.anims.play("turn");
    
                this.gameOver = true;
                this.scene.start("Lost");
     
            }


    


}