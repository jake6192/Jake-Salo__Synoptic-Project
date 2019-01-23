class Room {
  constructor(roomID, room) {
    this.id = roomID;
    this.Passages = room.Passages;
    this.Treasure = room.Treasure;
    this.Threat = room.Threat;
    this.size = 300; // Size of all rooms in pixels. //
    this.SVG_Size = this.size/10;
    this.margins = { // Used to center the room in the canvas. //
      hMargin: (GAME.canvas.width-this.size)/2,
      vMargin: (GAME.canvas.height-this.size)/2
    };

    this.drawRoom = function() {
      GAME.context.translate(this.margins.hMargin, this.margins.vMargin); // Move the origin to the top left corner of the room. //
      /* Draw the outline of the room. */
      GAME.context.lineWidth = 2;
      GAME.context.moveTo(0, 0);
      GAME.context.lineTo(this.size, 0);
      GAME.context.lineTo(this.size, this.size);
      GAME.context.lineTo(0, this.size);
      GAME.context.lineTo(0, 0);
      GAME.context.stroke();
      /* Fill the room background. */
      GAME.context.fillStyle = '#999999';
      GAME.context.fillRect(2, 2, this.size-4, this.size-4);

      /* Draw any passages for the room. */
      if(this.Passages.North.passageIsOpen) GAME.context.drawImage(GAME.SVG_Files.passage, (PLAYER.startingRoom.size-PLAYER.startingRoom.SVG_Size)/2, 1, PLAYER.startingRoom.SVG_Size, PLAYER.startingRoom.SVG_Size);
      if(this.Passages.East.passageIsOpen) GAME.context.drawImage(GAME.SVG_Files.passage, (PLAYER.startingRoom.size-PLAYER.startingRoom.SVG_Size)-1, (PLAYER.startingRoom.size-PLAYER.startingRoom.SVG_Size)/2, PLAYER.startingRoom.SVG_Size, PLAYER.startingRoom.SVG_Size);
      if(this.Passages.South.passageIsOpen) GAME.context.drawImage(GAME.SVG_Files.passage, (PLAYER.startingRoom.size-PLAYER.startingRoom.SVG_Size)/2, (PLAYER.startingRoom.size-PLAYER.startingRoom.SVG_Size)-1, PLAYER.startingRoom.SVG_Size, PLAYER.startingRoom.SVG_Size);
      if(this.Passages.West.passageIsOpen) GAME.context.drawImage(GAME.SVG_Files.passage, 1, (PLAYER.startingRoom.size-PLAYER.startingRoom.SVG_Size)/2, PLAYER.startingRoom.SVG_Size, PLAYER.startingRoom.SVG_Size);

      /* Draw the threats for this room. */
      if(this.Threat.type == 'Bomb')
        GAME.context.drawImage(GAME.SVG_Files.bomb, (PLAYER.startingRoom.size/2)-(PLAYER.startingRoom.SVG_Size/2), (PLAYER.startingRoom.size/2)-(PLAYER.startingRoom.SVG_Size/2), PLAYER.startingRoom.SVG_Size, PLAYER.startingRoom.SVG_Size);
      // else if(this.Threat.type == 'Guard Dog')
      //   TODO;
      // else if(this.Threat.type == 'Dungeon Master')
      //   TODO;

      /* Draw the treasure for this room. */
      // TODO ~ SVG Maybe? //

    };
  };
}
