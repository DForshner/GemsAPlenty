//
// Module containing game logic 
//
jewel.game = (function() {

  var dom = jewel.dom;
  var $ = dom.$;

  // Displays screen.  If there is a currently active screen
  // it is hidden.
  function showScreen(screenID) {
    var activeScreen = $("#game .screen.active")[0];
    var screen = $("#" + screenID)[0];

    if (activeScreen) {
      dom.removeClass(screen, "active");
    }
    dom.addClass(screen, "active");
  }

  return {
    // Public methods
    showScreen : showScreen
  };

})();
