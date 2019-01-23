class Game {
  constructor() {
    this.config = null;
    this.rooms = [];
    this.SVG_FileNames = ['passage.svg'];
    this.SVG_Files = {};
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.id = "canvas";
    this.canvas.width = 1200;
    this.canvas.height = 675;

    /* loadConfig() will pull the tempory configuration file and assign it's contents to the GAME object. */
    this.loadConfig = function(path, callback) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
          GAME.config = JSON.parse(this.responseText);
          callback();
        }
      };
      xhttp.open("GET", path, true);
      xhttp.send();
    };

    this.getObjectLength = function(obj) {
      let len = 0, key;
      for(key in obj) len += (obj.hasOwnProperty(key) ? 1 : 0);
      return len;
    };

    this.loadSVGFiles = function() {
      for(let i = 0; i < this.SVG_FileNames.length; i++) {
        new SVG(this.SVG_FileNames[i].split('.')[0], this.SVG_FileNames[i]);
      }
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
      for(let i = 0; i < GAME.getObjectLength(this.config); i++) {
        let room = new Room(i, GAME.config[i]);
        GAME.rooms.push(room);
      }
    };
  };
}
