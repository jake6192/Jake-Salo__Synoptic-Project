class Game {
  constructor() {
    this.config = null;

    this.loadConfig = function(path) {
      $.getJSON(path, function(result) {
        GAME.config = result;
      });
    };
  }
}
