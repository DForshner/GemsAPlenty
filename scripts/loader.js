// Create jewel namespace
var jewel = {
  screens : {} /* Namespace for different screens */
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
