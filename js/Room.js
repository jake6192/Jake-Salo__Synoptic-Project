class Room {
  constructor(roomID, room) {
    this.id = roomID;
    this.Passages = room.Passages;
    this.Treasure = room.Treasure;
    this.Threat = room.Threat;
    this.size = 500; // Size of entire room in pixels. //
    this.SVG_Size = this.size/7.5;
    this.margins = { // Used to center the room in the canvas. //
      hMargin: (GAME.canvas.width-this.size)/2,
      vMargin: (GAME.canvas.height-this.size)/2
    };

    this.drawRoom = function() {
      GAME.context.fillStyle = '#BBBBBB';
      GAME.context.fillRect(0, 0, this.size, this.size);
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
      if(this.Passages.North.passageIsOpen) GAME.context.drawImage(GAME.SVG_Files.passage, (PLAYER.room.size-PLAYER.room.SVG_Size)/2, 1, PLAYER.room.SVG_Size, PLAYER.room.SVG_Size);
      if(this.Passages.East.passageIsOpen) GAME.context.drawImage(GAME.SVG_Files.passage, (PLAYER.room.size-PLAYER.room.SVG_Size)-1, (PLAYER.room.size-PLAYER.room.SVG_Size)/2, PLAYER.room.SVG_Size, PLAYER.room.SVG_Size);
      if(this.Passages.South.passageIsOpen) GAME.context.drawImage(GAME.SVG_Files.passage, (PLAYER.room.size-PLAYER.room.SVG_Size)/2, (PLAYER.room.size-PLAYER.room.SVG_Size)-1, PLAYER.room.SVG_Size, PLAYER.room.SVG_Size);
      if(this.Passages.West.passageIsOpen) GAME.context.drawImage(GAME.SVG_Files.passage, 1, (PLAYER.room.size-PLAYER.room.SVG_Size)/2, PLAYER.room.SVG_Size, PLAYER.room.SVG_Size);

      /* Draw the threats for this room. */
      if(this.Threat) {
        switch(this.Threat.type) {
          case 'Bomb': GAME.context.drawImage(GAME.SVG_Files.bomb, (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), PLAYER.room.SVG_Size, PLAYER.room.SVG_Size); break;
          case 'Guard Dog': GAME.context.drawImage(GAME.SVG_Files.guard_dog, (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), PLAYER.room.SVG_Size, PLAYER.room.SVG_Size); break;
          case 'Dungeon Master': GAME.context.drawImage(GAME.SVG_Files.dungeon_master, (PLAYER.room.size/2)-(PLAYER.room.SVG_Size*0.75), (PLAYER.room.size/2)-(PLAYER.room.SVG_Size*0.75), PLAYER.room.SVG_Size*1.5, PLAYER.room.SVG_Size*1.5); break;
        }
      } else { // If all threats have been defeated, draw the treasure for the room. //
        switch(this.Treasure.type) {
          case "Gold": /* TODO */ break;
          case "Key": /* TODO */ break;
        }
      }
    };

    this.showValidActions = function(id) {
      let subActions = document.querySelector(`#${id} > div.subActions`);
      subActions.style.display = "flex";

      switch(id) {
        case "changeRoom":
          if(this.Passages.North.passageIsOpen) document.querySelector('#changeRoom > .subActions > .subAction[name="North"]').classList.remove("inactive");
          if(this.Passages.East.passageIsOpen) document.querySelector('#changeRoom > .subActions > .subAction[name="East"]').classList.remove("inactive");
          if(this.Passages.South.passageIsOpen) document.querySelector('#changeRoom > .subActions > .subAction[name="South"]').classList.remove("inactive");
          if(this.Passages.West.passageIsOpen) document.querySelector('#changeRoom > .subActions > .subAction[name="West"]').classList.remove("inactive");
          break;
        case "attackThreat":
          /* All threat option will be available - the player need to discover the correct option. */
          break;
      }
    };

    this.selectSubAction = function(playerAction, HTMLelement) {
      if(!HTMLelement.classList.contains('inactive')) {
        let action = HTMLelement.getAttribute('name');

        if(playerAction == 'changeRoom') {
          PLAYER.changeRoom(action);
        } else if(playerAction == 'attackThreat') {
          if(action == 'Bribe') PLAYER.wealth -= 50;
          if(this.Threat.action == action) {
            delete this.Threat;
            this.drawRoom();
          }
        }
        this.resetSubActions();
      } else alert('You cannot perform this action here...');
    };

    this.resetSubActions = function() {
      let elements = document.querySelector('#changeRoom').children[0].children;
      for(let i = 0; i < elements.length; i++)
        if(elements[i].classList.contains('subAction')) elements[i].classList.add('inactive');
      document.querySelector('#changeRoom > .subActions').removeAttribute('style');
      document.querySelector('#attackThreat > .subActions').removeAttribute('style');
    };

    // TODO. //
    this.collectTreasure = function() {
      if(!this.Threat) console.log(true);
      else console.log(false);
    };
  };
}
