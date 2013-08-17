//
// Module containing game logic 
//
jewel.game = (function() {

  var dom = jewel.dom;
  var $ = dom.$;

  // Displays screen.  If there is a currently active screen
  // it is hidden.
  function showScreen(screenID) {

    // Remove active screen
    var activeScreen = $("#game .screen.active")[0];
    var screen = $("#" + screenID)[0];
    if (activeScreen) {
      dom.removeClass(activeScreen, "active");
    }

    // Run new screen module
    jewel.screens[screenID].run();
    // Display new screen html 
    dom.addClass(screen, "active");
  }

  function setup() {
    // disable native touchmove behavior to prevent overscroll
    dom.bind(document, "touchmove", function(event) {
     event.preventDefault();
    });

    // hide the address bar on Android devices by increasing the
    // height of the page to force the browser to hide the bar.
    if (/Android/.test(navigator.userAgent)) {
      $("html")[0].style.height = "200%";
      setTimeout(function() {
        window.scrollTo(0,1);
      }, 0);
    }
  }
  
  return {
    // Public methods
    showScreen : showScreen,
    setup : setup,
  };

})();
