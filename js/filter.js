'use strict';

(function () {

  var MAX_PINS_ON_MAP = 5;
  var ANY_TYPE_FILTER_VALUE = 'any';

  var typeFilterElement = document.querySelector('#housing-type');

  var onTypeFilterChanged = function () {

    window.util.removePinsElements();

    var filteredTypesElements = [];

    if (typeFilterElement.value === ANY_TYPE_FILTER_VALUE) {
      filteredTypesElements = window.map.ads.slice(0, MAX_PINS_ON_MAP);
    }

    for (var i = 0; i < window.map.ads.length; i++) {
      if (filteredTypesElements.length >= MAX_PINS_ON_MAP) {
        break;
      }
      if (typeFilterElement.value === window.map.ads[i].offer.type) {
        filteredTypesElements.push(window.map.ads[i]);
      }
    }


    window.pins.removePopUp();
    window.pins.setPinsActiveCondition(filteredTypesElements);
  };

  window.filter = {
    removeTypeListener: function () {
      typeFilterElement.removeEventListener('change', onTypeFilterChanged);
    },
    onTypeFilterChanged: onTypeFilterChanged,
    addTypeListener: function () {
      typeFilterElement.addEventListener('change', onTypeFilterChanged);
    },
  };
})();

