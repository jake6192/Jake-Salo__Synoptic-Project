class Room {
  constructor(roomID, room) {
    this.id = roomID;
    this.Passages = room.Passages;
    this.Treasure = room.Treasure;
    this.Threat = room.Threat;
    this.size = 300; // Size of all rooms in pixels. //
    this.margins = { // Used to center the room in the canvas. //
      hMargin: (GAME.canvasWidth-this.size)/2,
      vMargin: (GAME.canvasHeight-this.size)/2
    };

    this.drawRoom = function() {
      let canvas = document.getElementById('canvas');
      let context = canvas.getContext('2d');
      context.translate(this.margins.hMargin, this.margins.vMargin); // Move the origin to the top left corner of the room. //
      /* Draw the outline of the room. */
      context.lineWidth = 2;
      context.moveTo(0, 0);
      context.lineTo(this.size, 0);
      context.moveTo(this.size, 0);
      context.lineTo(this.size, this.size);
      context.moveTo(this.size, this.size);
      context.lineTo(0, this.size);
      context.moveTo(0, this.size);
      context.lineTo(0, 0);
      context.stroke();
      /* Fill the room background. */
      context.fillStyle = '#999999';
      context.fillRect(2, 2, this.size-4, this.size-4);
    };
  };
}
