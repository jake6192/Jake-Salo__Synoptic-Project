class Player {
  constructor() {
    this.room = null;
    this.wealth = 0;
    this.hasKey = false;

    this.setRandomRoom = function() {
      this.room = GAME.rooms[Math.floor(Math.random()*GAME.rooms.length)];
    };

    this.changeRoom = function(dir) {
      if(this.room.Passages[dir].isExitPassage && PLAYER.hasKey) GAME.complete();
      else if(this.room.Passages[dir].isExitPassage) alert('You need to find the key first!');
      else {
        this.room = GAME.rooms[this.room.Passages[dir].connectingRoomID];
        this.room.drawRoom();
        this.room.resetSubActions();
      }
    }
  };
}
