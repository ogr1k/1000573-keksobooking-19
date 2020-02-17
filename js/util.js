'use strict';

(function () {


  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.key === window.constants.ESC_KEY) {
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
