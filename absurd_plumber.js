(function() {
var player;
var jumpTimer = 0;
var cursors;
var jumpButton;

var create = function() {
    //game is global from boot_game.js
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.time.desiredFps = 30;

    game.physics.arcade.gravity.y = 250;

    player = game.add.sprite(32, 32, 'phaserDude');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

var update = function() {
  player.body.velocity.x = 0;

  if (cursors.up.isDown)
  {
      if (player.body.onFloor())
      {
          player.body.velocity.y = -200;
      }
  }

  if (cursors.left.isDown)
  {
      player.body.velocity.x = -150;
  }
  else if (cursors.right.isDown)
  {
      player.body.velocity.x = 150;
  }
  if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
  {
      player.body.velocity.y = -250;
      jumpTimer = game.time.now + 750;
  }
};

window.absurdPlumber = {
  update: update,
  create: create
};

})();
