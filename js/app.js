/*
* These global constants will contain all game information
* and will be referenced throughout the program
**/
const GAME = new Game();
const PLAYER = new Player();


/*
* When the DOM has loaded, begin preparing components for the maze.
**/
function newGame() {
  /* This uses a callback function as all of the other processes are dependant on the configuration information. */
  GAME.loadConfig('config.json', function() {
    GAME.loadSVGFiles(); // This will also begin to draw the starting room when complete. //
    GAME.createMaze();
    GAME.prepareCanvas(); // Draws a blank canvas in preparation for rooms. //
    PLAYER.setRandomRoom(); // Assign the player to a random room. //
  });
}
