'use strict';

(function () {

  var MAX_PINS_ON_MAP = 5;

  var typeFilterElement = document.querySelector('#housing-type');

  var onTypeFilterChanged = function () {

    window.util.removePinsElements();

    var filteredTypesElements = [];
    for (var i = 0; i < window.map.ads.length; i++) {
      if (filteredTypesElements.length === MAX_PINS_ON_MAP) {
        break;
      }
      if (typeFilterElement.value === window.map.ads[i].offer.type) {
        filteredTypesElements.push(window.map.ads[i]);
      }
    }


    window.pins.removePinPopUp();

    window.pins.setPinsActiveCondition(filteredTypesElements);
  };

  typeFilterElement.addEventListener('change', onTypeFilterChanged);
  window.filter = {
    removeTypeFilterListener: function () {
      typeFilterElement.removeEventListener('change', onTypeFilterChanged);
    },
  };
})();

