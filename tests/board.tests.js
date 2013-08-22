// Setup Test Fakes 
this.fake2x2Settings = {
    rows : 2,
    cols : 2,
    baseScore : 10,
    numJewelTypes : 3,
};
// 21
// 01
this.fake2x2BoardLayout = [ [0,2], [1,1] ];

this.fake4x4Settings = {
  rows : 4,
  cols : 4,
  baseScore : 10,
  numJewelTypes : 3,
};

// 0123
// 0132
// 0123
// 0111
this.fake4x4BoardLayout = [ [0,0,0,0], [1,1,1,1], [1,2,3,2], [1,3,2,3] ];

test("init_WhenInitBoardUsingPreMadeBoardLayout_ExpectLayoutUsed", function() {
  // Arrange
  jewel.board.init(fake2x2Settings, function(){}, { 'boardLayout' : fake2x2BoardLayout}); 
  // Act & Assert
  equal(jewel.board.getJewel(0,0), 0);
  equal(jewel.board.getJewel(0,1), 2);
  equal(jewel.board.getJewel(1,0), 1);
  equal(jewel.board.getJewel(1,1), 1);
});

test("getJewel_WhenInit2x2Board_ExpectJewelAtPosition1x1", function() {
  // Arrange
  jewel.board.init(fake4x4Settings, function(){}, {});
  // Act
  var result = jewel.board.getJewel(1,1)
  // Assert
  notEqual(result, -1);
});

test("getJewel_WhenInit2x2Board_ExpectNoJewelAtPosition4x1", function () {
  // Arrange
  jewel.board.init(fake4x4Settings, function(){}, {});
  // Act
  var result = jewel.board.getJewel(4,1)
  // Assert
  equal(result, -1);
});

test("checkChain_When3ChainExists_Expect3", function() {
  // Arrange
  jewel.board.init(fake4x4Settings, function(){}, { 'boardLayout' : fake4x4BoardLayout});
  // Act
  var result = jewel.board.checkChain(3,0)
  // Assert
  equal(result, 3);
});

test("checkChain_When4And3ChainExists_Expect4", function () {
  // Arrange
  jewel.board.init(fake4x4Settings, function(){}, { 'boardLayout' : fake4x4BoardLayout});
  // Act
  var result = jewel.board.checkChain(1,0)
  // Assert
  equal(result, 4);
});


test("canSwap_WhenSwapWouldIncreaseChainLength_ExpectTrue", function () {
  // Arrange
  jewel.board.init(fake4x4Settings, function(){}, { 'boardLayout' : fake4x4BoardLayout});
  // Act
  var result = jewel.board.canSwap(2,2,3,2)
  // Assert
  equal(result, true);
});

test("canSwap_WhenSwapCreatsChainLengthLessThanTwo_ExpectFalse", function () {
  // Arrange
  jewel.board.init(fake4x4Settings, function(){}, { 'boardLayout' : fake4x4BoardLayout});
  // Act
  var result = jewel.board.canSwap(2,0,2,1)
  // Assert
  equal(result, false);
});

test("isAdjacent_WhenInitAdjacentJewels_ExpectTrue", function () {
  // Arrange
  jewel.board.init(fake4x4Settings, function(){}, {}); 
  // Act
  var result = jewel.board.isAdjacent(0,0,0,1)
  // Assert
  equal(result, true);
});

test("isAdjacent_WhenInitAdjacentJewels_ExpectFalse", function () {
  // Arrange
  jewel.board.init(fake4x4Settings, function(){}, {}); 
  // Act
  var result = jewel.board.isAdjacent(0,0,1,1)
  // Assert
  equal(result, false);
});

test("getChains_WhenGetFor2x2Board_ExpectMapOfChainLengthsReturned", function () {
  // Arrange
  jewel.board.init(fake2x2Settings, function(){}, { 'boardLayout' : fake2x2BoardLayout}); 
  // Act
  var result = jewel.board.getChains();
  // Assert
  equal(result[0][0],1);
  equal(result[0][1],1);
  equal(result[1][0],2);
  equal(result[1][1],2);
});


