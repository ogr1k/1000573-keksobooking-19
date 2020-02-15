'use strict';

(function () {

  var ESC_KEY = 'Escape';

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },
    removePinsElements: function () {
      for (var i = 0; i < window.pins.mapPinsElements.length; i++) {
        window.pins.mapPinsElements[i].remove();
      }
    }
  };
})();
