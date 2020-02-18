'use strict';

(function () {

  var MAX_PINS_ON_MAP = 5;
  var ANY_TYPE_FILTER_VALUE = 'any';

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
    if (geustFilterElement.value === 'any') {
      setWifiFilter(element);
    }


    if (Number(geustFilterElement.value) === element.offer.guests) {
      setWifiFilter(element);
    }
  };


  var setRoomFilter = function (element) {
    if (roomFilterElement.value === 'any') {
      setGuestFilter(element);
    }


    if (Number(roomFilterElement.value) === element.offer.rooms) {
      setGuestFilter(element);
    }
  };

  var setPriceFilter = function (element) {

    if (priceFilterElement.value === 'any') {
      setRoomFilter(element);
    }
    if (priceFilterElement.value === 'low' && element.offer.price <= 10000) {
      setRoomFilter(element);
    }
    if (priceFilterElement.value === 'high' && element.offer.price >= 50000) {
      setRoomFilter(element);
    }
    if (priceFilterElement.value === 'middle' && element.offer.price < 50000 && element.offer.price > 10000) {
      setRoomFilter(element);
    }

  };


  var changer = function () {

    window.util.removePinsElements();

    var setTypeFilter = function () {

      for (var i = 0; i < window.map.adsWithOfferField.length; i++) {
        if (filteredElements.length >= MAX_PINS_ON_MAP) {
          break;
        }

        if (typeFilterElement.value === ANY_TYPE_FILTER_VALUE) {

          setPriceFilter(window.map.adsWithOfferField[i]);
        }

        if (typeFilterElement.value === window.map.adsWithOfferField[i].offer.type) {

          setPriceFilter(window.map.adsWithOfferField[i]);

        }
      }
    };

    setTypeFilter();

    window.pins.removePopUp();
    window.pins.setPinsActiveCondition(filteredElements);

    filteredElements = [];
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

  var onGeustFilterChanged = function () {
    changer();
  };

  var onWifiFilterChecked = function () {
    changer();
  };

  var onDishwashFilterChecked = function () {
    changer();
  };

  var onParkingFilterChecked = function () {
    changer();
  };

  var onWasherFilterChecked = function () {
    changer();
  };

  var onElevatorFilterChecked = function () {
    changer();
  };

  var onConditionerFilterChecked = function () {
    changer();
  };

  window.filter = {
    removeTypeListener: function () {
      typeFilterElement.removeEventListener('change', onTypeFilterChanged);
    },
    onTypeFilterChanged: onTypeFilterChanged,

    addFilterListeners: function () {
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
    }
  };
})();

