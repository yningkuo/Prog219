
class SnakeGame extends Phaser.Scene {
    constructor() {
            super({ key: "SnakeGame" });
        } // end constructor


    // entire game consists of a snake object, a food object, and the 4 arrow keys living in a scene object
    // But they are defined at the game level, not here in the scene
  

    // ****************************************************************************************************
    // scene runs this first of 3 methods
    preload ()  // create 23 Phaser image  objects
    {
        this.load.image('foodPic', 'assets/food.png');
        this.load.image('bodyPic', 'assets/body.png');
        this.load.image("flowers", "assets/flowers.jpg");
    }

    // ****************************************************************************************************
    // scene runs this 2nd of 3 methods
    create ()
    {
        //  A  background for our game
        this.add.image(400, 300, "flowers");

        var Food = new Phaser.Class({
            // This is OO inheritence, Food is now a Classt of type Phase Image, but then we add more functions to it
            Extends: Phaser.GameObjects.Image,

            initialize:   // this  is like a construstor, that will run once the object is created from this class

            function Food (scene, x, y)
            {
                Phaser.GameObjects.Image.call(this, scene)

                this.setTexture('foodPic');
                this.setPosition(x * 16, y * 16);
                this.setOrigin(0);

                this.total = 0;

                scene.children.add(this);
            },

            eat: function ()
            {
                this.total++;
                console.log(this.total)
            }

        });

        var Snake = new Phaser.Class({

            initialize:  // like a constructor function

          

            // takes in the scene so we can modify it, and a postion for the head of the snake
            function Snake (scene, x, y)
            {
                // var to keep track of where the head is
                this.headPosition = new Phaser.Geom.Point(x, y);

                this.body = scene.add.group();  // adding a group for our collection of snake sections

                // add the firts body segment, the head, to the body group
                this.head = this.body.create(x * 16, y * 16, 'bodyPic');
                this.head.setOrigin(0);  // instead of using center of pic, forcing to upper left corner as 0

                this.alive = true;

                this.speed = 100;

                this.moveTime = 0;

                // var to keep track of where the last segment  is
                this.tail = new Phaser.Geom.Point(x, y);

        
                this.heading = RIGHT;  // the direction the player pressed
                this.direction = RIGHT;  // the left, right, up, or down we are going to grow the body from

            },

            update: function (time)  // we take in the current time, compare it to our last saved (time + this.speed;)
            {
                if (time >= this.moveTime)     // only call the move funcion if a delta this speed has passed
                {
                    return this.move(time);  // we call update, it calls move, which will return a false if game over
                }
            },

            /* next 4 functions check to  ensure you don't double-back on yourself, 
            for example if you're moving to the right and you press the LEFT cursor,
            it ignores it, because the only valid directions you can move in at that
            time is up and down.
            */
            faceLeft: function ()
            {
                if (this.direction === UP || this.direction === DOWN)
                {
                    this.heading = LEFT;
                }
            },
            faceRight: function ()
            {
                if (this.direction === UP || this.direction === DOWN)
                {
                    this.heading = RIGHT;
                }
            },
            faceUp: function ()
            {
                if (this.direction === LEFT || this.direction === RIGHT)
                {
                    this.heading = UP;
                }
            },
            faceDown: function ()
            {
                if (this.direction === LEFT || this.direction === RIGHT)
                {
                    this.heading = DOWN;
                }
            },

            move: function (time)
            {
                /**
                * Based on the heading property (which is the direction the pgroup pressed)
                * we update the headPosition value accordingly.
                * 
                * The Math.wrap call allow the snake to wrap around the screen, so when
                * it goes off any of the sides it re-appears on the other.
                */
                switch (this.heading)
                {
                    case LEFT:
                        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 50);
                        break;

                    case RIGHT:
                        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 50);
                        break;

                    case UP:
                        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 37);
                        break;

                    case DOWN:
                        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 37);
                        break;
                }

                this.direction = this.heading;

                //  Update the body segments and place the last coordinate into this.tail
                Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);

                //  Check to see if any of the body pieces have the same x/y as the head
                //  If they do, the head ran into the body

                var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);

                if (hitBody)
                {
                    console.log('dead');  

                    this.alive = false;

                    return false;
                }
                else
                {
                    //  Update the timer ready for the next movement
                    this.moveTime = time + this.speed;

                    return true;
                }
            },

            grow: function ()  // add a segment at the back
            {
                var newPart = this.body.create(this.tail.x, this.tail.y, 'bodyPic');
                newPart.setOrigin(0);
            },

            collideWithFood: function (food)
            {
                if (this.head.x === food.x && this.head.y === food.y)
                {
                    this.grow();  // just above function to all a segment

                    food.eat();  // need to remove the food image and randomly place it somewhere else

                    // make the game harder the longer you play
                    //  For every 5 items of food eaten we'll increase the snake speed a little
                    if (this.speed > 20 && food.total % 5 === 0)
                    {
                        this.speed -= 5;
                    }

                    return true;
                }
                else
                {
                    return false;
                }
            },

            updateGrid: function (grid)
            {
                //  Remove all body pieces from valid positions list
                this.body.children.each(function (segment) {

                    var bx = segment.x / 16;
                    var by = segment.y / 16;

                    grid[by][bx] = false;

                });

                return grid;
            }

        });  // end of defining our Snake object and all its functions

        food = new Food(this, 3, 4);   // create the first food object, place it in "this" scene, at the 3 - 4 grid position

        snake = new Snake(this, 8, 8); // create the snake object, place it in "this" scene, at the 8 - 8 grid position

        cursors = this.input.keyboard.createCursorKeys();   //  Create our keyboard controls

    }   // end of Create


    // ****************************************************************************************************
    // scene runs this third of 3 methods
    //  Phaser game engine calls our update giving is a time value and a delta, how long since last call
    update (time, delta)  
    {
        if (!snake.alive)
        {
          
            this.scene.start('Lost'); // jump to scene with that key name
            return;  // Do nothing if game is over
        }

        if (snake.speed < 75)  // very easy to win, speed drops 5 for each  5 food
        {
            this.scene.start('End');
        }

        /**
        * Check which key is pressed, and then change the direction the snake
        * is heading based on that. 
        */
        if (cursors.left.isDown)
        {
            snake.faceLeft();
        }
        else if (cursors.right.isDown)
        {
            snake.faceRight();
        }
        else if (cursors.up.isDown)
        {
            snake.faceUp();
        }
        else if (cursors.down.isDown)
        {
            snake.faceDown();
        }

        // call the snake object's update method, which moves snake, and also checks for win or loss
        if (snake.update(time))  
        {
            //  If the snake updated (moved), we need to check for collision against food

            if (snake.collideWithFood(food))
            {
                repositionFood();
            }
        }
    


    // ****************************************************************************************************
    /*   
    * We can place the food anywhere in our 40x30 grid
    * *except* on-top of the snake, so we need
    * to filter those out of the possible food locations.
    * If there aren't any locations left, they've won!
    *
    * repositionFood places food item, returns {boolean} true if the food was placed, otherwise false
    */
    function repositionFood ()
    {
        //  First create an array that assumes all positions
        //  are valid for the new piece of food

        //  A Grid, 2 dim array of 16x16 pixels, we'll use to reposition the food each time it's eaten
        //  game was 640 x 480  now 800 x 600  so dimensions of board don't work evenly with our grid

        // defines playing area as 40 => 50   positions wide and 30 => 37.5 => 37positions high
        // we will not move by pixels, but jump by these grid sections
        var testGrid = [];

        for (var y = 0; y < 37; y++)
        {
            testGrid[y] = [];

            for (var x = 0; x < 50; x++)
            {
                testGrid[y][x] = true;  // start by saying all positions are ok to place food
            }
        }

        snake.updateGrid(testGrid);

        //  Purge out false positions
        var validLocations = [];

        for (var y = 0; y < 37; y++)
        {
            for (var x = 0; x < 50; x++)
            {
                if (testGrid[y][x] === true)
                {
                    //  Is this position valid for food? If so, add it here ...
                    validLocations.push({ x: x, y: y });
                }
            }
        }


        if (validLocations.length > 0)
        {
            //  Use the RND to pick a random food position
            var pos = Phaser.Math.RND.pick(validLocations);

            //  And place it
            food.setPosition(pos.x * 16, pos.y * 16);
            console.log( pos.x * 16 + " " + pos.y * 16 + " " + validLocations.length )

            return true;
        }
        else
        {
            return false;
        }
    }

   

}
}
