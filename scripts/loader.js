// Create jewel namespace
var jewel = {};

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
      ],

      // Complete callback that happens after scripts are loaded
      // and executed.
      complete : function () {
        console.log("All files loaded"); 
        
        // Show first screen
        jewel.game.showScreen("splash-screen");
      }
    }
  ]);

}, false);
