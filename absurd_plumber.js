(function() {
var player;
var cursors;
var jumpButton;
var map;
var layer;
var blocks = 32;
var bg;

var create = function() {
  //game is global from boot_game.js
  game.physics.startSystem(Phaser.Physics.ARCADE);

  var runOff = 14 * blocks;
  bg = game.add.tileSprite(0, 0, 768, 256, 'buildings');

  //set up the map from Tiled
  map = game.add.tilemap('tiles');
  map.addTilesetImage('block');
  layer = map.createLayer('blocks');
  //set the world size to == tiled map
  layer.resizeWorld();

  //resize the world so that it appears to be infinitely looping
  game.world.setBounds(runOff, 0, game.world.width - (runOff * 2), game.world.height)

  //resize the background so that it appears to be infinitely looping
  bg.x = -runOff;
  bg.y = 7 * blocks;
  bg.width = game.world.width + (runOff * 4);
  bg.height = 256;


  game.time.desiredFps = 60;
  //game.stage.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  game.physics.arcade.gravity.y = 550;

  var startingY = 12 * blocks; // start 12 squares down from the top
  player = game.add.sprite(runOff + (2 * blocks), startingY, 'phaserDude');
  game.physics.enable(player, Phaser.Physics.ARCADE);
  game.camera.follow(player);

  //we only really want camera bounds on the y axis.
  var cameraBounds = new Phaser.Rectangle(0 - runOff * 2, 0, game.world.width + (runOff * 4), game.world.height);
  game.camera.bounds = cameraBounds;

  player.body.bounce.y = 0.2;
  player.body.setSize(20, 32, 5, 16);

  map.setCollisionBetween(0, 10000, true, layer);

  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

var update = function() {
  game.physics.arcade.collide(player, layer);
  game.world.wrap(player, 0, true);

  player.body.velocity.x = 0;

  if (cursors.left.isDown) {
    player.body.velocity.x = -150;
    //bg.x -= 1;
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
    //bg.x += 1;
  }
  if ((jumpButton.isDown || cursors.up.isDown) && player.body.onFloor()) {
    player.body.velocity.y = -350;
  }
};

window.absurdPlumber = {
  update: update,
  create: create
};

})();
