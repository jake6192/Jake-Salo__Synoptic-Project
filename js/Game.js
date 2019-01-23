class Game {
  constructor() {
    this.config = null;
    this.rooms = [];
    this.canvasWidth = 1200;
    this.canvasHeight = 675;

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
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      canvas.id = "canvas";
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      /* Draw the canvas background. */
      context.fillStyle = '#BBBBBB';
      context.fillRect(0, 0, canvas.width, canvas.height);
      /* Insert the canvas into the HTML markup. */
      document.getElementById('mainContainer').innerHTML = '';
      document.getElementById('mainContainer').appendChild(canvas);
    };


    this.createMaze = function() {
      for(let i = 0; i < GAME.getConfigLength(); i++) {
        let room = new Room(i, GAME.config[i]);
        GAME.rooms.push(room);
      }
    };
  };
}
