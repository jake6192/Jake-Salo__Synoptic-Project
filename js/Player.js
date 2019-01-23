class Player {
  constructor() {
    this.room = null;

    this.setRandomRoom = function() {
      this.room = GAME.rooms[Math.floor(Math.random()*GAME.rooms.length)];
    };
  };
}
