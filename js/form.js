'use strict';

(function () {


  var NO_GEUSTS_OPTION_INDEX = 3;
  var ONE_GEUST_OPTION_INDEX = 2;
  var TWO_GEUSTS_OPTION_INDEX = 1;
  var THREE_GEUSTS_OPTION_INDEX = 0;

  var MIN_PRICE_FOR_BUNGALO = 0;
  var MIN_PRICE_FOR_FLAT = 1000;
  var MIN_PRICE_FOR_HOUSE = 5000;
  var MIN_PRICE_FOR_PALACE = 10000;


  var roomsOptionsToBeEnabled = {
    '1': [ONE_GEUST_OPTION_INDEX],
    '2': [TWO_GEUSTS_OPTION_INDEX, ONE_GEUST_OPTION_INDEX],
    '3': [THREE_GEUSTS_OPTION_INDEX, TWO_GEUSTS_OPTION_INDEX, ONE_GEUST_OPTION_INDEX],
    '100': [NO_GEUSTS_OPTION_INDEX]
  };

  var minPriceForTypes = {
    'bungalo': MIN_PRICE_FOR_BUNGALO,
    'flat': MIN_PRICE_FOR_FLAT,
    'house': MIN_PRICE_FOR_HOUSE,
    'palace': MIN_PRICE_FOR_PALACE
  };

  var formElement = document.querySelector('.ad-form');
  var fieldsetElements = formElement.querySelectorAll('fieldset');


  var mapPinElement = document.querySelector('.map');


  var setDisableAttribute = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  };

  setDisableAttribute(fieldsetElements);


  var formMapElement = document.querySelector('.map__filters');
  formMapElement.setAttribute('disabled', 'disabled');
  var mapSelectFieldsetElements = formMapElement.querySelectorAll('select, fieldset');
  setDisableAttribute(mapSelectFieldsetElements);
  var roomNumberElement = document.querySelector('#room_number');
  var roomCapacityElement = document.querySelector('#capacity');
  var roomsCapacityOptionsElements = roomCapacityElement.querySelectorAll('option');
  var checkoutSelectElement = document.querySelector('#timeout');
  var checkinSelectElement = document.querySelector('#timein');
  var typeElement = document.querySelector('#type');
  var priceInputElement = document.querySelector('#price');
  var typeValue;
  var titleInputElement = document.querySelector('#title');
  var submitButton = document.querySelector('.ad-form__submit');


  window.setFormActiveCondition = function () {
    var disableOptions = function (elements, arrayLengths) {
      for (var l = 0; l < arrayLengths; l++) {
        if (!elements[l].hasAttribute('disabled')) {
          elements[l].setAttribute('disabled', 'disabled');
        }
      }
    };

    disableOptions(roomsCapacityOptionsElements, (roomsCapacityOptionsElements.length - 1));

    formElement.classList.remove('ad-form--disabled');
    mapPinElement.classList.remove('map--faded');
    for (var i = 0; i < fieldsetElements.length; i++) {
      fieldsetElements[i].removeAttribute('disabled');
    }
    formMapElement.querySelector('fieldset').removeAttribute('disabled');
    for (var j = 0; j < mapSelectFieldsetElements.length; j++) {
      mapSelectFieldsetElements[j].removeAttribute('disabled');
    }
    var onRoomNumberSelectorChanged = function () {
      disableOptions(roomsCapacityOptionsElements, roomsCapacityOptionsElements.length);
      var roomNumberValue = roomNumberElement.value;

      for (var k = 0; k < roomsOptionsToBeEnabled[roomNumberValue].length; k++) {
        var index = roomsOptionsToBeEnabled[roomNumberValue][k];
        roomsCapacityOptionsElements[index].removeAttribute('disabled');
      }
      roomCapacityElement.selectedIndex = roomsOptionsToBeEnabled[roomNumberValue][0];
    };
    var onCheckinTimeSelectorChanged = function () {
      checkoutSelectElement.value = checkinSelectElement.value;
    };

    var onCheckoutTimeSelectorChanged = function () {
      checkinSelectElement.value = checkoutSelectElement.value;
    };

    var onRoomTypeChange = function () {
      typeValue = typeElement.value;
      priceInputElement.min = minPriceForTypes[typeValue];
      priceInputElement.placeholder = minPriceForTypes[typeValue];
    };


    var onSubmitButtonClick = function () {
      if (!titleInputElement.checkValidity()) {
        titleInputElement.style.borderColor = 'red';
      }
      if (!priceInputElement.checkValidity()) {
        priceInputElement.style.borderColor = 'red';
      }
    };

    var onInputChanged = function (evt) {
      if (evt.target.checkValidity()) {
        evt.target.style.borderColor = 'silver';
      }
    };


    roomNumberElement.addEventListener('change', onRoomNumberSelectorChanged);
    checkinSelectElement.addEventListener('change', onCheckinTimeSelectorChanged);
    checkoutSelectElement.addEventListener('change', onCheckoutTimeSelectorChanged);
    typeElement.addEventListener('change', onRoomTypeChange);
    submitButton.addEventListener('click', onSubmitButtonClick);
    titleInputElement.addEventListener('input', onInputChanged);
    priceInputElement.addEventListener('input', onInputChanged);

  };
})();

