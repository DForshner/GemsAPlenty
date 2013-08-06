//
// Helper module for manipulating DOM elements.
//
jewel.dom = (function() {
  // Private
  var $ = Sizzle;

  // Returns true if class is found
  function hasClass(el, clsName) {
    var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$)");
    return regex.test(el.className);
  }

  function addClass(el, clsName) {
    if (!hasClass(el, clsName)) {
      el.className += " " + clsName;
    }
  }

  // Removes CSS class from element
  function removeClass(el, clsName) {
    var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$");
    el.className = el.className.replace(regex, " ");
  }

  return {
    // Public
    $ : $,
    hasClass : hasClass,
    addClass : addClass,
    removeClass : removeClass
  };
})();
