'use strict';

(function () {

  var MAX_PINS_ON_MAP = 5;
  var ANY_TYPE_FILTER_VALUE = 'any';

  var typeFilterElement = document.querySelector('#housing-type');
  var priceFilterElement = document.querySelector('#housing-price');
  var roomFilterElement = document.querySelector('#housing-rooms');
  var filteredTypesElements = [];

  var changer = function () {

    window.util.removePinsElements();

    var setTypeFilter = function () {

      if (typeFilterElement.value === ANY_TYPE_FILTER_VALUE) {
        filteredTypesElements = window.map.adsWithOfferField;
      }

      for (var i = 0; i < window.map.adsWithOfferField.length; i++) {
        // if (filteredTypesElements.length >= MAX_PINS_ON_MAP) {
        //   break;
        // }
        if (typeFilterElement.value === window.map.adsWithOfferField[i].offer.type) {
          if (priceFilterElement.value !== 'any') {
            filteredTypesElements.push(window.map.adsWithOfferField[i]);
          }
          if (priceFilterElement.value === 'low' && window.map.adsWithOfferField[i].offer.price <= 10000) {
            filteredTypesElements.push(window.map.adsWithOfferField[i]);
          }
          if (priceFilterElement.value === 'high' && window.map.adsWithOfferField[i].offer.price >= 50000) {
            filteredTypesElements.push(window.map.adsWithOfferField[i]);
          }
          if (priceFilterElement.value === 'middle' && window.map.adsWithOfferField[i].offer.price < 50000 && filteredTypesElements[i].offer.price > 10000) {
            filteredTypesElements.push(window.map.adsWithOfferField[i]);
          }
        }
      }
    };

    setTypeFilter();
    // // / Фильтр по цене
    //
    //
    // var setPriceFilter = function () {
    //   var filtered1 = [];
    //   for (var i = 0; i < filteredTypesElements.length; i++) {
    //     if (priceFilterElement.value === 'low' && filteredTypesElements[i].offer.price <= 10000) {
    //       filtered1.push(filteredTypesElements[i]);
    //     }
    //
    //     if (priceFilterElement.value === 'high' && filteredTypesElements[i].offer.price >= 50000) {
    //       filtered1.push(filteredTypesElements[i]);
    //     }
    //
    //     if (priceFilterElement.value === 'middle' && filteredTypesElements[i].offer.price < 50000 && filteredTypesElements[i].offer.price > 10000) {
    //       filtered1.push(filteredTypesElements[i]);
    //     }
    //   }
    //
    //   if (priceFilterElement.value !== 'any') {
    //     filteredTypesElements = filtered1;
    //   }
    //
    // };
    //
    // setPriceFilter();
    //
    // // Фильтр комнат
    //
    // var setRoomFilter = function () {
    //   var roomsFilterElements = [];
    //   for (var i = 0; i < filteredTypesElements.length; i++) {
    //     if (Number(roomFilterElement.value) === filteredTypesElements[i].offer.rooms) {
    //       roomsFilterElements.push(filteredTypesElements[i]);
    //     }
    //   }
    //
    //   if (roomFilterElement.value !== 'any') {
    //     filteredTypesElements = roomsFilterElements;
    //   }
    // };
    // setRoomFilter();

    window.pins.removePopUp();
    window.pins.setPinsActiveCondition(filteredTypesElements.splice(0, MAX_PINS_ON_MAP));

    filteredTypesElements = [];
  };

  var onTypeFilterChanged = function () {
    changer();
  };

  var onPriceFilterChanged = function () {
    changer();
  };

  var onRoomFilterChanged = function () {
    changer();
  };


  window.filter = {
    removeTypeListener: function () {
      typeFilterElement.removeEventListener('change', onTypeFilterChanged);
    },
    onTypeFilterChanged: onTypeFilterChanged,
    addTypeListener: function () {
      typeFilterElement.addEventListener('change', onTypeFilterChanged);
    },
    addPriceListener: function () {
      priceFilterElement.addEventListener('change', onPriceFilterChanged);
    },
    addRoomListener: function () {
      roomFilterElement.addEventListener('change', onRoomFilterChanged);
    }
  };
})();

