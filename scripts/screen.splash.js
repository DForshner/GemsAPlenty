jewel.screens["splash-screen"] = (function(){
  var game = jewel.game;
  var dom = jewel.dom;
  firstRun = true;

  // Private
  
  function setup() {
    // Setup event handler to change to menu screen 
    // when user clicks.
    dom.bind("#splash-screen", "click", function() {
      game.showScreen("main-menu");
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
