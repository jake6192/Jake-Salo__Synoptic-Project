/*
* These global constants will contain all game information
* and will be referenced throughout the program
**/
const GAME = new Game();
const PLAYER = new Player();


/*
* When the DOM has loaded, begin preparing components for the maze.
**/
$(document).ready(function() {
  /* This uses a callback function as all of the other processes are dependant on the configuration information. */
  GAME.loadConfig('config.json', function() {
    GAME.createMaze();
    GAME.prepareCanvas(); // Draws a blank canvas in preparation for rooms. //
    PLAYER.setRoom(); // Assign the player to a random room. //
    PLAYER.startingRoom.drawRoom(); // Draw the inital starting room on the canvas. //
  });
});
