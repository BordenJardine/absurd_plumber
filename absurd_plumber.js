(function() {
var player;
var cursors;
var jumpButton;
var map;
var layer;

var create = function() {
  //game is global from boot_game.js
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //set up the map from Tiled
  map = game.add.tilemap('tiles');
  map.addTilesetImage('block');
  layer = map.createLayer('blocks');
  //set the world size to == tiled map
  layer.resizeWorld();

  game.time.desiredFps = 30;

  game.physics.arcade.gravity.y = 550;

  player = game.add.sprite(64, 32, 'phaserDude');
  game.physics.enable(player, Phaser.Physics.ARCADE);
  game.camera.follow(player);

  player.body.bounce.y = 0.2;
  player.body.collideWorldBounds = false;
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
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
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
