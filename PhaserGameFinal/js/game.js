// our game's configuration
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
       scene: [GameStartScene,StarsGame,NinjaGame, End, Lost ]  // will start with first one in array
};

// create the game, and pass it the configuration

let game = new Phaser.Game(config);


let decrement = 10;  // had trouble creating a varaible at phaser class level that Interval could access
// so put it at game level.  Tried adding it to config and then referencing it as
// decrement
// game.decrement
// game.config.decrement   none worked, so left it here


var snake;
var food;
var cursors;
var bomb;

//  Direction consts, just giving better names to the values returned by the cursor object
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;


var bullets;
var ship;
var speed;
var stats;
var cursors;
var lastFired = 0;
