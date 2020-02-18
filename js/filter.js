'use strict';

(function () {

  var ANY_TYPE_FILTER_VALUE = 'any';
  var MIDDLE_PRICE_FILTER_VALUE = 'middle';
  var HIGH_PRICE_FILTER_VALUE = 'high';
  var LOW_PRICE_FILTER_VALUE = 'low';

  var typeFilterElement = document.querySelector('#housing-type');
  var priceFilterElement = document.querySelector('#housing-price');
  var roomFilterElement = document.querySelector('#housing-rooms');
  var geustFilterElement = document.querySelector('#housing-guests');
  var wifiInputlement = document.querySelector('#filter-wifi');
  var dishWashFilterElement = document.querySelector('#filter-dishwasher');
  var parkingFilterElement = document.querySelector('#filter-parking');
  var washerFilterElement = document.querySelector('#filter-washer');
  var elevatorFilterElement = document.querySelector('#filter-elevator');
  var conditionerFilterElement = document.querySelector('#filter-conditioner');

  var filteredElements = [];

  var pushElement = function (element) {
    filteredElements.push(element);
  };

  var setCheckboxesFilter = function (element, filterElement, action) {
    if (filterElement.checked) {
      for (var i = 0; i < element.offer.features.length; i++) {
        if (element.offer.features[i] === filterElement.value) {
          action(element);
          break;
        }
      }
    } else {
      action(element);
    }
  };

  var setConditionerFilter = function (element) {
    setCheckboxesFilter(element, conditionerFilterElement, pushElement);
  };

  var setElevatorFilter = function (element) {
    setCheckboxesFilter(element, elevatorFilterElement, setConditionerFilter);
  };

  var setWasherFilter = function (element) {
    setCheckboxesFilter(element, washerFilterElement, setElevatorFilter);
  };


  var setParkingFilter = function (element) {

    setCheckboxesFilter(element, parkingFilterElement, setWasherFilter);
  };


  var setDishWashFilter = function (element) {

    setCheckboxesFilter(element, dishWashFilterElement, setParkingFilter);
  };

  var setWifiFilter = function (element) {
    setCheckboxesFilter(element, wifiInputlement, setDishWashFilter);
  };

  var setGuestFilter = function (element) {
    if (geustFilterElement.value === ANY_TYPE_FILTER_VALUE) {
      setWifiFilter(element);
    }


    if (Number(geustFilterElement.value) === element.offer.guests) {
      setWifiFilter(element);
    }
  };


  var setRoomFilter = function (element) {
    if (roomFilterElement.value === ANY_TYPE_FILTER_VALUE) {
      setGuestFilter(element);
    }


    if (Number(roomFilterElement.value) === element.offer.rooms) {
      setGuestFilter(element);
    }
  };

  var setPriceFilter = function (element) {

    if (priceFilterElement.value === ANY_TYPE_FILTER_VALUE) {
      setRoomFilter(element);
    }
    if (priceFilterElement.value === LOW_PRICE_FILTER_VALUE && element.offer.price <= 10000) {
      setRoomFilter(element);
    }
    if (priceFilterElement.value === HIGH_PRICE_FILTER_VALUE && element.offer.price >= 50000) {
      setRoomFilter(element);
    }
    if (priceFilterElement.value === MIDDLE_PRICE_FILTER_VALUE && element.offer.price < 50000 && element.offer.price > 10000) {
      setRoomFilter(element);
    }

  };


  var setFilterContainer = function () {

    window.util.removePinsElements();


    for (var i = 0; i < window.map.adsWithOfferField.length; i++) {
      if (filteredElements.length >= window.constants.MAX_PINS_ON_MAP) {
        break;
      }

      if (typeFilterElement.value === ANY_TYPE_FILTER_VALUE) {

        setPriceFilter(window.map.adsWithOfferField[i]);
      }

      if (typeFilterElement.value === window.map.adsWithOfferField[i].offer.type) {

        setPriceFilter(window.map.adsWithOfferField[i]);

      }
    }


    window.pins.removePopUp();
    window.pins.setPinsActiveCondition(filteredElements);


    filteredElements = [];
  };


  var onTypeFilterChanged = window.debounce(function () {
    setFilterContainer();
  });

  var onPriceFilterChanged = window.debounce(function () {
    setFilterContainer();
  });

  var onRoomFilterChanged = window.debounce(function () {
    setFilterContainer();
  });

  var onGeustFilterChanged = window.debounce(function () {
    setFilterContainer();
  });

  var onWifiFilterChecked = window.debounce(function () {
    setFilterContainer();
  });

  var onDishwashFilterChecked = window.debounce(function () {
    setFilterContainer();
  });

  var onParkingFilterChecked = window.debounce(function () {
    setFilterContainer();
  });

  var onWasherFilterChecked = window.debounce(function () {
    setFilterContainer();
  });

  var onElevatorFilterChecked = window.debounce(function () {
    setFilterContainer();
  });

  var onConditionerFilterChecked = window.debounce(function () {
    setFilterContainer();
  });

  window.filter = {
    addListeners: function () {
      typeFilterElement.addEventListener('change', onTypeFilterChanged);
      priceFilterElement.addEventListener('change', onPriceFilterChanged);
      roomFilterElement.addEventListener('change', onRoomFilterChanged);
      geustFilterElement.addEventListener('change', onGeustFilterChanged);
      wifiInputlement.addEventListener('change', onWifiFilterChecked);
      dishWashFilterElement.addEventListener('change', onDishwashFilterChecked);
      parkingFilterElement.addEventListener('change', onParkingFilterChecked);
      washerFilterElement.addEventListener('change', onWasherFilterChecked);
      elevatorFilterElement.addEventListener('change', onElevatorFilterChecked);
      conditionerFilterElement.addEventListener('change', onConditionerFilterChecked);
    },
    removeListeners: function () {
      typeFilterElement.removeEventListener('change', onTypeFilterChanged);
      priceFilterElement.removeEventListener('change', onPriceFilterChanged);
      roomFilterElement.removeEventListener('change', onRoomFilterChanged);
      geustFilterElement.removeEventListener('change', onGeustFilterChanged);
      wifiInputlement.removeEventListener('change', onWifiFilterChecked);
      dishWashFilterElement.removeEventListener('change', onDishwashFilterChecked);
      parkingFilterElement.removeEventListener('change', onParkingFilterChecked);
      washerFilterElement.removeEventListener('change', onWasherFilterChecked);
      elevatorFilterElement.removeEventListener('change', onElevatorFilterChecked);
      conditionerFilterElement.removeEventListener('change', onConditionerFilterChecked);
    }
  };
})();

