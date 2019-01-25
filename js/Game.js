class Game {
  constructor() {
    this.config = null;
    this.rooms = [];
    this.SVG_FilePaths = ['SVG/GamePlay/passage.svg', 'SVG/Threats/bomb.svg', 'SVG/Threats/guard_dog.svg', 'SVG/Threats/dungeon_master.svg', 'SVG/Threats/troll.svg', 'SVG/Threats/dragon.svg', 'SVG/Treasure/gold.svg', 'SVG/Treasure/key.svg'];
    this.SVG_Files = {};
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.id = "canvas";
    this.canvas.width = (window.innerWidth*0.666);
    this.canvas.height = (window.innerHeight*0.666);

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
      for(let i = 0; i < this.SVG_FilePaths.length; i++) {
        new SVG(this.SVG_FilePaths[i].split('SVG/')[1].split('/')[1].split('.')[0], this.SVG_FilePaths[i]);
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

    this.complete = function() {
      alert(`Game complete! You finished with ${PLAYER.wealth} gold coins!`);
    }
  };
}
