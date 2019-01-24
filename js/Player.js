class Player {
  constructor() {
    this.room = null;
    this.wealth = 0;

    this.setRandomRoom = function() {
      this.room = GAME.rooms[Math.floor(Math.random()*GAME.rooms.length)];
    };

    this.changeRoom = function(dir) {
      switch(dir) {
        case "North": this.room = GAME.rooms[this.room.Passages.North.connectingRoomID]; break;
        case "East": this.room = GAME.rooms[this.room.Passages.East.connectingRoomID]; break;
        case "South": this.room = GAME.rooms[this.room.Passages.South.connectingRoomID]; break;
        case "West": this.room = GAME.rooms[this.room.Passages.West.connectingRoomID]; break;
      }
      this.room.drawRoom();
      this.room.resetSubActions(); // TODO. //
    }
  };
}
