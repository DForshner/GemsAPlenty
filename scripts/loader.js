// Create jewel namespace
var jewel = {

  /* Namespaces */
  screens : {}

  /* Game settings */
  settings : {
    rows : 8,
    cols : 8,
    baseScore : 100,
    newJewelTypes : 7, /* Number of diff jewel types */
  }
};

// wait until main doc is loaded
window.addEventListener("load", function() {

  // Start dynamic loading
  Modernizr.load([
    {
      // always load
      load : [
        "scripts/sizzle.js",
        "scripts/dom.js",
        "scripts/game.js",
        "scripts/screen.splash.js",
        "scripts/screen.main-menu.js",
        "scripts/board.js",
      ],

      // Complete callback that happens after scripts are loaded
      // and executed.
      complete : function () {
        console.log("All files loaded"); 

        jewel.game.setup();

        // Show first screen
        jewel.game.showScreen("splash-screen");
      }
    }
  ]);

}, false);
