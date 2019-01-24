class Config {
  constructor() {
    this.rooms = {};
    this.keyIsPlaced = false;

    this.startGame = function() {};

    this.startCustomConfig = function() {
      let directions = ['North', 'East', 'South', 'West'];
      let start = confirm('This process will require you to enter a lot of information...\nAre you ready?');
      if(start) {
        let roomQuantity = +prompt('How many rooms will your maze have?');
        if(roomQuantity != "") {
          for(let i = 0; i < roomQuantity; i++) {
            let room = {
              "Passages": {
                "North": {},
                "East": {},
                "South": {},
                "West": {}
              },
              "Treasure": {},
              "Threat": {}
            };


            // PASSAGES

            let hasPassage = false;
            do {
              for(let j = 0; j < directions.length; j++) {
                let passageIsOpen = prompt(`RoomID ${i}:\nIs the ${directions[j]} passage open?\n\nIf the passage is open, enter the RoomID it will lead to.\nIf it is not open, please leave this field blank.`);
                if(passageIsOpen != "") {
                  hasPassage = true;
                  room.Passages[directions[j]].passageIsOpen = true;
                  room.Passages[directions[j]].isExitPassage = false;
                  room.Passages[directions[j]].connectingRoomID = +passageIsOpen;
                } else room.Passages[directions[j]].passageIsOpen = false;
              }
              if(!hasPassage) alert('You need at least one passage in a room.');
            } while(!hasPassage);


            // THREATS

            let threat, threats = ["Bomb", "Guard Dog", "Troll", "Dragon", "Dungeon Master"];
            do {
              threat = prompt('What threat will be in this room?\nPlease enter one of the following:\nBomb, Guard Dog, Troll, Dragon, Dungeon Master.');
              if(!threats.includes(threat)) alert('Invalid threat type - Please try again.');
            } while(!threats.includes(threat));
            room.Threat.type = threat;
            room.Threat.action = this.getThreatAction(threat);


            // TREASURE

            let treasure, treasures = ['Gold', 'Key'];
            do {
              treasure = prompt("What treasure will be in this room?\n'Gold', or the 'Key' for the exit?");
              if(!treasures.includes(treasure)) alert('Invalid treasure type - Pleasy try again.');
            } while(!treasures.includes(treasure));
            room.Treasure.type = treasure;
            if(treasure == 'Gold') {
              let value;
              do {
                value = prompt('How much Gold?');
                if(isNaN(value)) alert('Not a number... Try again.');
              } while(isNaN(value));
              room.Treasure.value = +value;
            } else if(treasure == 'Key' && this.keyIsPlaced) {
              let value;
              do {
                value = prompt('Key already placed. This room must contain Gold - How much?');
                if(isNaN(value)) alert('Not a number... Try again.');
              } while(isNaN(value));
              room.Treasure.type = 'Gold';
              room.Treasure.value = +value;
            } else this.keyIsPlaced = true;



            this.rooms[i] = room;
          }


          // EXIT PASSAGE

          let exitRoomID, roomIsValid = false, passageisValid = false;
          do {
            exitRoomID = prompt('What RoomID will the exit passage be in?\nThis passage cannot be connected to another room.');
            if(this.rooms[exitRoomID].Passages.North.passageIsOpen == false
            || this.rooms[exitRoomID].Passages.East.passageIsOpen == false
            || this.rooms[exitRoomID].Passages.South.passageIsOpen == false
            || this.rooms[exitRoomID].Passages.West.passageIsOpen == false) roomIsValid = true;
            if(!roomIsValid) alert('That room has no free passages, please choose another.');
          } while(!roomIsValid);

          let exitPassageDir;
          do {
            exitPassageDir = prompt('What passage leads to the exit?\nNorth, East, South or West?');
            if( !this.rooms[exitRoomID].Passages[exitPassageDir].passageIsOpen ) passageisValid = true;
            if(!passageisValid) alert('Passage already leads to another room - please choose another direction.');
          } while(!passageisValid);
          this.rooms[exitRoomID].Passages[exitPassageDir].isExitPassage = true;
          this.rooms[exitRoomID].Passages[exitPassageDir].passageIsOpen = true;
        }
      }
    };

    this.getThreatAction = function(threat) {
      switch(threat) {
        case "Bomb": return 'Defuse';
        case "Guard Dog": return 'Offer Food';
        case "Troll": return 'Fight';
        case "Dragon": return 'Fight';
        case "Dungeon Master": return 'Bribe';
      }
    };
  };
}
