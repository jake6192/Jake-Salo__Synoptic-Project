class Player {
  constructor() {
    this.roomID = null;

    this.setRoom = function() {
      this.roomID = Math.floor(Math.random()*GAME.rooms.length);
    };
  };
}
