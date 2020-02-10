'use strict';

(function () {

  var ESC_KEY = 'Escape';

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    }
  };
})();
