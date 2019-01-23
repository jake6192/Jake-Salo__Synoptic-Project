const GAME = new Game();

$(document).ready(function() {
  GAME.loadConfig('config.json', GAME.createMaze);
});
