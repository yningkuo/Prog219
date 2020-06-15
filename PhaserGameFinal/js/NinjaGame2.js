class NinjaGame extends Phaser.Scene {
    constructor() {
        super({ key: "NinjaGame" });
    }



    
        
     preload ()
    {
        this.load.spritesheet('ship', 'assets/spaceship3.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('bullet', 'assets/bomb.png');
        this.load.image("star", "assets/star.png");
        this.load.image("ground", "assets/platform.png");
    }
    
     create ()
    {   


        //this.player = this.physics.add.sprite(100, 400, "ship");

        this.score = 0;
        this.scoreText;
        this.gameOver = false;

        //this.physics.add.overlap(this.bullet, this.stars, this.collectStar, null, this);

        var Bullet = new Phaser.Class({
    
            Extends: Phaser.GameObjects.Image,
    
            initialize:
    
            function Bullet (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
    
                this.speed = Phaser.Math.GetSpeed(400, 1);
            },
    
            fire: function (x, y)
            {
                this.setPosition(x, y - 50);
    
                this.setActive(true);
                this.setVisible(true);
            },
    
            update: function (time, delta)
            {
                this.y -= this.speed * delta;
    
                if (this.y < -50)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }

            
    
        });

        this.stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 10, y: 0, stepX: 50 }
            });
    
        this.bullets = this.add.group({
            key:"bullet",
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });

    
        ship = this.add.sprite(400, 500, 'ship').setDepth(1);
    
        cursors = this.input.keyboard.createCursorKeys();
    
        speed = Phaser.Math.GetSpeed(300, 1);

        this.scoreText = this.add.text(16, 16, "score: 0", { fontSize: "32px", fill: "#FFF" });

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 200, "ground").setScale(2).refreshBody();


        //this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.stars, this.bullets, this.collectStar, null,this);


    }
    
     update (time, delta)
    {
        if (cursors.left.isDown)
        {
            ship.x -= speed * delta;
        }
        else if (cursors.right.isDown)
        {
            ship.x += speed * delta;
        }
        /*
        else if (cursors.up.isDown)
        {
            ship.y -= speed * delta;
        }
        else if (cursors.down.isDown)
        {
            ship.y += speed * delta;
        }
        */
        if (cursors.up.isDown && time > lastFired)
        {
            var bullet = this.bullets.get();
    
            if (bullet)
            {
                bullet.fire(ship.x, ship.y);
    
                lastFired = time + 50;
            }
        }
        
    }
    
   collectStar(star,bullets) {
        star.disableBody(false, false);
        //star.visible = false;
        //star.active = false;
      
        //this.changeSound(2);  // 2 is star sound
        
        // this.sound.play();
        
        //  Add and update the scorelet
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);
        this.physics.pause();

        if(this.score > 30){
            this.scene.start("End");  // jump to 2nd game scene with that key name
        }



       /* if (this.stars.countActive(true) === 0) {
  
            //  A new batch of stars to collect
            this.stars.children.iterate(function(child) {
        
                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 320) ? Phaser.Math.Between(320, 640) : Phaser.Math.Between(0, 320);
            var bomb = this.bombs.create(x, 16, "bomb");
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = true;


        }*/
    }


}