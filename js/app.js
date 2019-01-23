const GAME = new Game();
const PLAYER = new Player();

$(document).ready(function() {
  GAME.loadConfig('config.json', function() {
    GAME.createMaze();
    PLAYER.setRoom();
  });
});
