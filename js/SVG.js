class SVG {
  constructor(name, src) {
    this.name = name;
    this.image = new Image();
    this.image.src = src;
    
    let file = this;
    this.image.onload = function() {
      GAME.SVG_Files[file.name] = file.image;
      /* If all SVG files have been loaded, begin to draw the inital starting room on the canvas. */
      if(GAME.getObjectLength(GAME.SVG_Files) == GAME.SVG_FilePaths.length) PLAYER.startingRoom.drawRoom();
    };
  };
}
