class Game {
  constructor() {
    this.config = null;
    this.rooms = [];

    this.loadConfig = function(path, callback) {
      $.getJSON(path, function(result) {
        GAME.config = result;
        callback();
      });
    };

    this.getConfigLength = function() {
      let len = 0, key;
      for(key in this.config) len += (this.config.hasOwnProperty(key) ? 1 : 0);
      return len;
    };

    this.createMaze = function() {
      for(let i = 0; i < GAME.getConfigLength(); i++) {
        let room = new Room(i, GAME.config[i]);
        GAME.rooms.push(room);
      }
    };
  };
}
