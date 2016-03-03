(function() {
var player;
var cursors;
var jumpButton;
var map;
var layer;
var blocks = 32;
var bg;
var enemy;
var playerSpeed = 4;

var create = function() {
  //game is global from boot_game.js
  game.physics.startSystem(Phaser.Physics.ARCADE);

  var runOff = 14 * blocks;
  bg = game.add.tileSprite(0, 0, 768, 256, 'buildings');

  //set up the map from Tiled
  map = game.add.tilemap('tiles');
  map.addTilesetImage('block');
  layer = map.createLayer('blocks');
  map.setCollisionBetween(0, 10000, true, layer);

  //set the world size to == tiled map
  layer.resizeWorld();

  //resize the world so that it appears to be infinitely looping
  game.world.setBounds(runOff, 0, game.world.width - (runOff * 2), game.world.height)

  //resize the background so that it appears to be infinitely looping
  bg.x = -runOff * 400; //400 is a filthy hack to make parralax work
  bg.y = 7 * blocks;
  bg.width = game.world.width + (runOff * 400);
  bg.height = 256;

  game.time.desiredFps = 60;

  game.physics.arcade.gravity.y = 550;

  var startingY = 12 * blocks; // start 12 squares down from the top
  var startingX = runOff + (2 * blocks);
  player = game.add.sprite(startingX, startingY, 'phaserDude');
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.bounce.y = 0.2;
  player.body.setSize(20, 32, 5, 16);

  game.camera.follow(player);

  //we only really want camera bounds on the y axis.
  var cameraBounds = new Phaser.Rectangle(0 - runOff * 2, 0, game.world.width + (runOff * 4), game.world.height);
  game.camera.bounds = cameraBounds;

  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  var enemyX = runOff + (5 * blocks);
  var enemyY = startingY - 32;
  var enemy = game.add.sprite(enemyX, enemyY, 'enemy');
  game.physics.enable(enemy, Phaser.Physics.ARCADE);
  enemy.body.bounce.y = 0.2;
  enemy.body.setSize(20, 32, 5, 16);
}

var update = function() {
  game.world.wrap(player, 0, true);

  player.body.velocity.x = 0;

  var oldx = player.body.x;
  if (cursors.left.isDown) {
    player.body.x -= playerSpeed;
  }
  else if (cursors.right.isDown) {
    player.body.x += playerSpeed;
  }

  game.physics.arcade.collide(player, layer);
  game.physics.arcade.collide(enemy, layer);

  if(oldx != player.body.x) {
    bg.x -= (oldx - player.body.x) / 2;
  }

  if ((jumpButton.isDown || cursors.up.isDown) && player.body.onFloor()) {
    player.body.velocity.y = -350;
  }

  bg.y = game.camera.y * 0.1 + 220;
};

window.absurdPlumber = {
  update: update,
  create: create
};

})();
