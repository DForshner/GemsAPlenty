// Board module
// Represents the game board and allows other modules to
// interact with the game state.
//
jewel.board = (function() {
  // Private

  var settings,
  jewels,
  cols,
  rows,
  baseScore,
  numJewelTypes;

  // Initializes board
  // boardLayout (optional) - Use predefined layout when filling board.
  function init(settings, callback, opts) {
    settings = settings;
    numJewelTypes = settings.numJewelTypes;
    baseScore = settings.baseScore;
    cols = settings.cols;
    rows = settings.rows;

    if (opts["boardLayout"]) {
      jewels = opts["boardLayout"];
    }
    else {
      fillBoard();
    }

    callback();
  }

  // Init grid and fill it with random jewels
  function fillBoard() {
    var x, y;
    // Init x array 
    jewels = [];
    for (x = 0; x < cols; x++) {
      // Init one y array per x array
      jewels[x] = [];
      for (y = 0; y < rows; y++) {
        type = randomJewel();
        // Keep picking randome jewels until the chain condition is not
        // met. 
        while (
          (type === getJewel(x-1, y) && type === getJewel(x-2,y) )
          || (type === getJewel(x, y-1) && type === getJewel(x, y-2) )
        )
        {
          type = randomJewel();
        }
        jewels[x][y] = type;
      }
    }
    
    // recursivly fill if board has no moves
    if (!hasMoves()) {
      fillBoard();
    }
  }

  function randomJewel() {
    return Math.floor(Math.random() * numJewelTypes);
  }

  function print() {
    var str = "";
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        str += getJewel(x,y) + " ";
      }
      str += "\r\n";
    }
    console.log(str);
  }

  // Gets jewel type at position on board.
  // Returns -1 if invalid position.
  function getJewel(x ,y) {
    // Check that position is not out of bounds.
    if (x < 0 || x > cols - 1 || y < 0 || y > rows-1) {
      console.log("Requested position " + x + "," + y + " is out of bounds.");
      return -1;
    }
  
    return jewels[x][y];
  }

  // Tests if jewel is part of a chain.
  // Returns longest chain that includes jewel.
  function checkChain(x, y) {
    var type = getJewel(x,y),
    left = 0, right = 0,
    down = 0, up = 0;

    // look right
    while (type === getJewel(x + right + 1, y)) {
      right++;
    }

    // look left
    while (type === getJewel(x - left - 1, y)) {
      left++;
    }

    // look up
    while (type === getJewel(x, y + up + 1)) {
      up++;
    }

    // look down
    while (type === getJewel(x, y - down - 1)){
      down++;
    }

    // Return largest of either left/right or up/down.
    return Math.max(left + 1 + right, up + 1 + down);
  }

  // Returns true if (x1,y1) can be swapped with (x2,y2) to 
  // form new match.
  // 1) Positions must be adjacent.
  // 2) Has to increase a chain.
  function canSwap(x1, y1, x2, y2) {
    var type1 = getJewel(x1, y2);
    var type2 = getJewel(x2, y2);
    var chain;

    // Are positions adjacent?
    if (!isAdjacent(x1, y1, x2, y2)) {
      return false;
    }

    // temporarily swap positions
    jewels[x1][y1] = type2;
    jewels[x2][y2] = type1;

    // Check that new chain lengths would 
    // valid.
    chain = (checkChain(x2, y2) > 2
             || checkChain(x1, y1) > 2);

    // Return to original positions.
    jewels[x1][y1] = type1;
    jewels[x2][y2] = type2;

    return chain;
  }

  // Returns true if two sets of coordinates are adjacent.
  function isAdjacent(x1, y1, x2, y2) {
    var dx = Math.abs(x1 - x2);
    var dy = Math.abs(y1 - y2);
    return (dx + dy === 1);
  }

  // Loop through board looking for chains
  // Returns at 2d map of chain lengths
  function getChains() {
    var x,y;
    var chains = [];

    for (x = 0; x < cols; x++) {
      chains[x] = [];
      for (y = 0; y < rows; y++) {
        chains[x][y] = checkChain(x,y);
      }
    }

    return chains;
  }

  // Removes jewels from board and adds new ones where neccessary.
  // Collects data about moved/removed jewels in the moved/removed
  // arrays.
  function check(events) {
    var chains = getChains(),
    hadChains = false, var score = 0,
    removed = [], moved = [], gaps = [];
    
    for (var x = 0; x < cols; x++) {
      gaps[x] = 0; // Set current column gaps to zero

      for (var y = rows - 1; y >= 0; y--) {
        if (chains[x][y] > 2) {
          hadChains = true;
          gaps[x]++;
          removed.push({
            x : x,
            y : y,
            type : getJewel(x,y)
          });

          // Add points to score.
          score += baseScore *
            Math.pow(2, (chains[x][y] - 3));
        }
        // If there are gaps push jewels down
        else if (gaps[x] > 0 ) {
          moved.push({
            tox : x,
            toY : y + gaps[x],
            fromX : x,
            fromY : y,
            type : getJewel(x,y)
          });
          jewels.[x][y + gaps[x]] = getJewel(x,y);
        }
      }

      // Create new jewels to fill any gaps in the current column
      for(var y = 0; y < gaps[x]; y++) {
        jewels[x][y] = randomJewel();
        moved.push({
          toX : x,
          toY : y,
          fromX : x,
          fromY : y - gaps[x],
          type : jewels[x][y]
        });
      }

      // Events returns a list of all events that took place
      // to the caller.
      events = events || []; // If not exist already create

      // Recursivly call function as long as the current
      // pass found new chains.
      if (hadChains) {
        events.push({
          type : "remove",
          data : removed
        }, {
          type : "score",
          data : score
        }, {
          type : "move",
          data : moved
        });

        // refill the board if there are no moves left.
        if (!hasMoves()) {
          fillBoard();
          events.push({
            type : "refill",
            data : getBoard()
          });
        }

        return check(events);
      } else {
        // No chains where found during this pass.
        return events;
      }
    }
  }

  // Returns true if there is at least one match that can
  // be made.
  function hasMoves() {
    for (var x = 0; x < cols; x++) {
      for (var y = 0; y < rows; y++) {
        if (canJewelMove(x,y)) {
          return true;
        }
      }
    }
    return false;
  }

  // Returns true if (x,y) is a valid position and if the jewel
  // at (x,y) can be swapped with a neighbore.
  function canMove(x,y) {
    return (
      (x > 0 && canSwap(x,y,x-1,y))
      || (x < cols-1 && canSwap(x,y,x+1,y))
      || (y > 0 && canSwap(x,y,x,y-1))
      || (y < rows-1 && canSwap(x,y,x,y+1)) 
    );
  }

  // Creates copy of board
  function getBoard() {
    var copy = [], x;

    for(x = 0; x < cols; x++) {
      copy[x] = jewels[x].slice(0);
    }

    return copy;
  }

  // if possible, swaps (x1,y1) and (x2,y2) and calls
  // the callback function with a list of events.
  function swap(x1, y1, x2, y2) {
    var temp, events;

    if (canSwap(x1,y1,x2,y2)) {
      // swap the jewels
      temp = getJewel(x1,y1);
      jewels[x1][y1] = getJewel(x2,y2);
      jewels[x2][y2] = temp;

      // Check the board and get list of events
      events = check();

      callback(events);
    } else {
      callback(events);
    }
  }

  return {
    // Public

    init : init,
    print : print,
    getJewel : getJewel,
    checkChain : checkChain,
    canSwap : canSwap,
    isAdjacent : isAdjacent,
    getChains : getChains,
    swap : swap,
  };

})();
