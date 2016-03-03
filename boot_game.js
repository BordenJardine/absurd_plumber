(function() {

var game = new Phaser.Game(800, 450);

var addStates = function() {
  game.state.add('Boot', boot);
  game.state.add('Preload', preload);
  game.state.add('absurdPlumber', absurdPlumber); //global from absurd_plumber.js
}

var preload = {
  ready: false,
  preload: function () {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

    this.asset = this.add.sprite(0, 0, 'preloader');
    this.asset.x = (this.game.width / 2) - (this.asset.width / 2);
    this.asset.y = (this.game.height / 2) - (this.asset.height / 2);
    this.load.setPreloadSprite(this.asset);

    this.load.image('block', 'assets/block.png');
    this.load.image('phaserDude', 'assets/phaser-dude.png');
    this.load.image('buildings', 'assets/buildings.png');
    this.load.tilemap('tiles', 'assets/tiles.json', null, Phaser.Tilemap.TILED_JSON);
  },
  update: function() {
    if (this.ready) {
      this.game.state.start('absurdPlumber');
    }
  },
  onLoadComplete: function () {
    this.ready = true;
  }
};

var boot = {
  preload: function () {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function () {
    this.game.state.start('Preload');
  }
};

window.game = game;

window.onload = function() {
  addStates();
  game.state.start('Boot');
}

})();
