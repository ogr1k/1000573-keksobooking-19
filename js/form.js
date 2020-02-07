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

  var roomsCapacityOptionsElements = document.querySelector('#capacity').querySelectorAll('option');
  var typeValue;


  var disableOptions = function (elements, arrayLengths) {
    for (var i = 0; i < arrayLengths; i++) {
      if (!elements[i].hasAttribute('disabled')) {
        elements[i].setAttribute('disabled', 'disabled');
      }
    }
  };

  disableOptions(roomsCapacityOptionsElements, (roomsCapacityOptionsElements.length - 1));

  window.form = {
    roomNumberElement: document.querySelector('#room_number'),
    roomCapacityElement: document.querySelector('#capacity'),
    checkoutSelectElement: document.querySelector('#timeout'),
    checkinSelectElement: document.querySelector('#timein'),
    typeElement: document.querySelector('#type'),
    priceInputElement: document.querySelector('#price'),
    titleInputElement: document.querySelector('#title'),
    submitButton: document.querySelector('.ad-form__submit'),

    onRoomNumberSelectorChanged: function () {
      disableOptions(roomsCapacityOptionsElements, roomsCapacityOptionsElements.length);
      var roomNumberValue = window.form.roomNumberElement.value;

      for (var i = 0; i < roomsOptionsToBeEnabled[roomNumberValue].length; i++) {
        var index = roomsOptionsToBeEnabled[roomNumberValue][i];
        roomsCapacityOptionsElements[index].removeAttribute('disabled');
      }
      window.form.roomCapacityElement.selectedIndex = roomsOptionsToBeEnabled[roomNumberValue][0];
    },

    onCheckinTimeSelectorChanged: function () {
      window.form.checkoutSelectElement.value = window.form.checkinSelectElement.value;
    },


    onCheckoutTimeSelectorChanged: function () {
      window.form.checkinSelectElement.value = window.form.checkoutSelectElement.value;
    },

    onRoomTypeChange: function () {
      typeValue = window.form.typeElement.value;
      window.form.priceInputElement.min = minPriceForTypes[typeValue];
      window.form.priceInputElement.placeholder = minPriceForTypes[typeValue];
    },

    onSubmitButtonClick: function () {
      if (!window.form.titleInputElement.checkValidity()) {
        window.form.titleInputElement.style.borderColor = 'red';
      }
      if (!window.form.priceInputElement.checkValidity()) {
        window.form.priceInputElement.style.borderColor = 'red';
      }
    },

    onInputChanged: function (evt) {
      if (evt.target.checkValidity()) {
        evt.target.style.borderColor = 'silver';
      }
    }
  };
})();
