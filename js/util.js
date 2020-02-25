'use strict';

(function () {


  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.key === window.constants.ESC_KEY) {
        action();
      }
    },
    removePinsElements: function () {

      window.pins.mapPinsElements.forEach(function (currentValue, index) {
        window.pins.mapPinsElements[index].remove();
      }
      );
    }
  };
})();
