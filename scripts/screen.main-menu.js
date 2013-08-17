jewel.screens["main-menu"] = (function() {
  var dom = jewel.dom;
  var game = jewel.game;
  var firstRun = false;

  // Private

  // Attach event handler that shows different screens based
  // on what button the user clicked.
  function setup() {
    dom.bind("#main-menu ul.menu", "click", function(e) {
      if (e.target.nodeName.toLowerCase() === "button") {
        // Determine button name and call the
        // corresponding screen (Event Delegation) 
        var action = e.target.getAttribute("name");
        game.showScreen(action);
      }
    });
  }
 
  function run() {
    if (firstRun) {
      setup();
      firstRun = false;
    }
  }

  return {
    // Public
    run : run
  };

})();
