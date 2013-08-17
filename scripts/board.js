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

  function init(settings, callback) {
    settings = settings;
    numJewelTypes = settings.numbJewelTypes;
    baseScore = settings.baseScore;
    cols = settings.cols;
    rows = settings.rows;

    fillBoard();
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
        jewels[x][y] = randomJewel();
      }
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
      console.error("Requested position is out of bounds.");
      return -1;
    }
  
    return jewels[x][y];
  }

  return {
    // Public

    init : init,
    print : print,
    getJewel : getJewel,
  };

})();
