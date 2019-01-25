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

      if(this.Threat) { // Draw the threats for this room - if present. //
        switch(this.Threat.type) {
          case 'bomb': GAME.context.drawImage(GAME.SVG_Files.bomb, (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), PLAYER.room.SVG_Size, PLAYER.room.SVG_Size); break;
          case 'guard dog': GAME.context.drawImage(GAME.SVG_Files.guard_dog, (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), PLAYER.room.SVG_Size, PLAYER.room.SVG_Size); break;
          case 'troll': GAME.context.drawImage(GAME.SVG_Files.troll, (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), PLAYER.room.SVG_Size, PLAYER.room.SVG_Size); break;
          case 'dragon': GAME.context.drawImage(GAME.SVG_Files.dragon, (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), PLAYER.room.SVG_Size, PLAYER.room.SVG_Size); break;
          case 'dungeon master': GAME.context.drawImage(GAME.SVG_Files.dungeon_master, (PLAYER.room.size/2)-(PLAYER.room.SVG_Size*0.75), (PLAYER.room.size/2)-(PLAYER.room.SVG_Size*0.75), PLAYER.room.SVG_Size*1.5, PLAYER.room.SVG_Size*1.5); break;
        }
      } else if(this.Treasure) { // If all threats have been defeated, draw the treasure for the room. //
        switch(this.Treasure.type) {
          case "gold": GAME.context.drawImage(GAME.SVG_Files.gold, (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), PLAYER.room.SVG_Size, PLAYER.room.SVG_Size); break;
          case "key": GAME.context.drawImage(GAME.SVG_Files.key, (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), (PLAYER.room.size/2)-(PLAYER.room.SVG_Size/2), PLAYER.room.SVG_Size, PLAYER.room.SVG_Size); break;
        }
      }
      document.getElementById('wealth').innerHTML = PLAYER.wealth;
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
        /* All threat options will be available - the player needs to discover the correct option for each threat. */
        case "attackThreat": break;
      }
    };

    this.selectSubAction = function(playerAction, HTMLelement) {
      if(!HTMLelement.classList.contains('inactive')) {
        let subAction = HTMLelement.getAttribute('name');

        if(playerAction == 'changeRoom') PLAYER.changeRoom(subAction);
        else if(playerAction == 'attackThreat') {
          if(this.Threat) { // If the threat is still present. //
            if(subAction == 'Bribe') {
              if(PLAYER.wealth > 50) PLAYER.wealth -= 50; // A bribe will remove 50 coins, regardless of it's effect. //
              else {
                alert('You do not have enough gold to bribe.');
                return;
              }
            }
            /* If the action is valid for that threat & if the action was a bribe - ensure that they had enough gold coins. */
            if(this.Threat.action == subAction) {
              if(subAction != 'Bribe') delete this.Threat;
              else if(PLAYER.wealth >= 50) delete this.Threat;
            } else alert('That had no effect on the threat.');
            this.drawRoom();
          }
        }
        this.resetSubActions();
      } else alert('You cannot perform this action here...');
    };

    /* Hide any popup menus & mark invalid options as inactive. */
    this.resetSubActions = function() {
      let elements = document.querySelector('#changeRoom').children[0].children;
      for(let i = 0; i < elements.length; i++)
        if(elements[i].classList.contains('subAction')) elements[i].classList.add('inactive');
      document.querySelector('#changeRoom > .subActions').removeAttribute('style');
      document.querySelector('#attackThreat > .subActions').removeAttribute('style');
    };

    this.collectTreasure = function() {
      if(!this.Threat) {
        if(this.Treasure.type != 'key') PLAYER.wealth += this.Treasure.value;
        else PLAYER.hasKey = true;
        delete this.Treasure;
        this.drawRoom();
      } else alert('You must first defeat the threat!');
    };
  };
}
