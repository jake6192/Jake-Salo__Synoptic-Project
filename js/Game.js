class Game {
  constructor() {
    this.config = null;
    this.rooms = [];
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.id = "canvas";
    this.canvas.width = 1200;
    this.canvas.height = 675;

    /* loadConfig() will pull the tempory configuration file and assign it's contents to the GAME object. */
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


    this.prepareCanvas = function() {
      /* Draw the canvas background. */
      GAME.context.fillStyle = '#BBBBBB';
      GAME.context.fillRect(0, 0, GAME.canvas.width, GAME.canvas.height);
      /* Insert the canvas into the HTML markup. */
      document.getElementById('mainContainer').innerHTML = '';
      document.getElementById('mainContainer').appendChild(GAME.canvas);
    };


    this.createMaze = function() {
      for(let i = 0; i < GAME.getConfigLength(); i++) {
        let room = new Room(i, GAME.config[i]);
        GAME.rooms.push(room);
      }
    };
  };
}
