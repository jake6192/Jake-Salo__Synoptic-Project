class Config {
  constructor() {
    this.rooms = {};
    this.keyIsPlaced = null;

    this.startGame = function() {};

    this.createCustomConfig = function() {
      this.keyIsPlaced = false;
      let directions = ['North', 'East', 'South', 'West'];
      let start = confirm('This process will require you to enter a lot of information...\nOnce you begin, you will not be able to stop the process.\n\nAre you ready?');

      if(start) {
        let roomQuantity;
        do { // Repeat until a positive integer has been supplied. //
          roomQuantity = +prompt('How many rooms will your maze have?');
        } while(isNaN(roomQuantity) || roomQuantity < 1 || roomQuantity == "");

        /* Loop through each room and gather property values. */
        for(let i = 0; i < roomQuantity; i++) {
          let room = { // Empty template for a rooms configuration - filled in throughout the following process. //
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
          /* Boolean hasPassage used to validate user input.
          ** Set to true when at least a room has at least one open passage. */
          let hasPassage = false;
          do { // Repeat until 'hasPassage' is true; //
            for(let j = 0; j < directions.length; j++) {
              let passageIsOpen;
              do { // Repeat until a valid RoomID has been supplied (Or an empty string for closed passages). //
                passageIsOpen = prompt(`RoomID ${i}:\nIs the ${directions[j]} passage open?\n\nIf the passage is open, enter the RoomID it will lead to.\nIf it is not open, please leave this field blank.`);
              } while(isNaN(passageIsOpen) || passageIsOpen >= roomQuantity || passageIsOpen < 0);
              if(passageIsOpen != "") {
                hasPassage = true;
                room.Passages[directions[j]].passageIsOpen = true;
                room.Passages[directions[j]].isExitPassage = false;
                room.Passages[directions[j]].connectingRoomID = +passageIsOpen;
              } else room.Passages[directions[j]].passageIsOpen = false;
            }
            if(!hasPassage) alert('You need at least one passage in a room.');
          } while(!hasPassage);
          // END PASSAGES


          // THREATS
          /* The threats array contains all available threats to the player. */
          let threat, threats = ["bomb", "guard dog", "troll", "dragon", "dungeon master"];
          do { // Repeat until a valid threat has been supplied. //
            threat = prompt('What threat will be in this room?\nPlease enter one of the following:\nbomb, guard dog, troll, dragon, dungeon master.').toLowerCase();
            if(!threats.includes(threat)) alert('Invalid threat type - Please try again.');
          } while(!threats.includes(threat));
          room.Threat.type = threat;
          /* Retrieve the correct action that can defeat the chosen threat. */
          room.Threat.action = this.getThreatAction(threat);
          // END THREATS


          // TREASURE
          let treasure, treasures = ['gold', 'key'];
          do { // Repeat until a valid treasure type has been supplied. //
            treasure = prompt("What treasure will be in this room?\n'gold', or the 'key' for the exit?").toLowerCase();
            if(!treasures.includes(treasure)) alert('Invalid treasure type - Pleasy try again.');
          } while(!treasures.includes(treasure));
          room.Treasure.type = treasure; // Set the treasure type. //
          if(treasure == 'gold') {
            let value;
            do { // Repeat until a positive integer has been supplied. //
              value = prompt('How much gold?');
              if(isNaN(value)) alert('Not a number... Try again.');
              if(value <= 0) alert('Must be more than 0!');
            } while(isNaN(value) || value <= 0);
            room.Treasure.value = +value; // Set the value of gold for that room. //
          } else if(treasure == 'key' && this.keyIsPlaced) {
            /* If a player trys to place a key in a room after the key
            ** has already been placed - then force treasure type to gold. */
            let value;
            do { // Repeast until a positive integer has been supplied. //
              value = prompt('key already placed. This room must contain gold - How much?');
              if(isNaN(value)) alert('Not a number... Try again.');
            } while(isNaN(value));
            room.Treasure.type = 'gold';
            room.Treasure.value = +value;
          } else this.keyIsPlaced = true; // User input can only be 'key' at this point. //
          // END TREASURE


          /* Add the user generated room to the configuration rooms array. */
          this.rooms[i] = room;
        }


        // IF MISSING KEY
        if(!this.keyIsPlaced) {
          let roomID;
          do { // Repeat until valid RoomID has been supplied. //
            roomID = prompt('You have not placed the key for the exit!\n\nWhich room will the key be in? Enter the RoomID here.');
          } while(isNaN(roomID) || roomID >= roomQuantity || roomID < 0);
          this.rooms[roomID].Treasure.type = 'key'; // Set treasure type to key. //
          delete this.rooms[roomID].Treasure.value; // Previous treasure would have been old, so remove value. //
        }
        // END MISSING KEY


        // EXIT ROOM
        let exitRoomID, roomIsValid = false, passageisValid = false;
        do { // Repeat until a passage is selected which is not connected to another room already. //
          do { // Repeat until a positive integer has been supplied. //
            exitRoomID = prompt('What RoomID will the exit passage be in?\nThis passage cannot be connected to another room.');
          } while(isNaN(exitRoomID) || exitRoomID >= roomQuantity || exitRoomID < 0);
          /* Check that there is at least one unused passage in the selected room. */
          if(this.rooms[exitRoomID].Passages.North.passageIsOpen == false
          || this.rooms[exitRoomID].Passages.East.passageIsOpen == false
          || this.rooms[exitRoomID].Passages.South.passageIsOpen == false
          || this.rooms[exitRoomID].Passages.West.passageIsOpen == false) roomIsValid = true;
          if(!roomIsValid) alert('That room has no free passages, please choose another.');
        } while(!roomIsValid);
        // END EXIT ROOM


        // EXIT PASSAGE
        let exitPassageDir;
        do { // Repeat until a valid passage direction has been selected. //
          exitPassageDir = prompt('What passage leads to the exit?\nNorth, East, South or West?').toLowerCase();
          exitPassageDir = exitPassageDir.charAt(0).toUpperCase() + exitPassageDir.slice(1); // Capitalize user input properly. //
          try {
            if( !this.rooms[exitRoomID].Passages[exitPassageDir].passageIsOpen ) passageisValid = true;
          } catch(e) { // Handle the scenario that an invalid direction is entered. //
            if (e instanceof TypeError) passageisValid = false;
          }
          if(!passageisValid) alert('Invalid Passage direction, or it already leads to another room - please try again.');
        } while(!passageisValid);
        this.rooms[exitRoomID].Passages[exitPassageDir].isExitPassage = true;
        this.rooms[exitRoomID].Passages[exitPassageDir].passageIsOpen = true;
        // END EXIT PASSAGE
      }
    };

    this.getThreatAction = function(threat) {
      switch(threat) {
        case "bomb": return 'Defuse';
        case "guard dog": return 'Offer Food';
        case "troll": return 'Fight';
        case "dragon": return 'Fight';
        case "dungeon master": return 'Bribe';
      }
    };
  };
}
