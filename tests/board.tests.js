// Setup Test Fakes 
this.fake2x2Settings = {
    rows : 2,
    cols : 2,
    baseScore : 10,
    numJewelTypes : 2,
};

this.fake8x8Settings = {
    rows : 8,
    cols : 8,
    baseScore : 100,
    numJewelTypes : 7,
};

test("WhenInit2x2Board_ExpectJewelAtPosition1x1", function () {
  // Arrange
  jewel.board.init(fake2x2Settings, function(){}); 
  // Act
  var result = jewel.board.getJewel(1,1)
  // Assert
  notEqual(result, -1);
});

test("WhenInit2x2Board_ExpectNoJewelAtPosition3x1", function () {
  // Arrange
  jewel.board.init(fake2x2Settings, function(){}); 
  // Act
  var result = jewel.board.getJewel(3,1)
  // Assert
  equal(result, -1);
});
