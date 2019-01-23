class Player {
  constructor() {
    this.startingRoom = null;

    this.setRoom = function() {
      this.startingRoom = GAME.rooms[Math.floor(Math.random()*GAME.rooms.length)];
    };
  };
}
