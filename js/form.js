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

  var START_MAIN_PIN_LEFT_POSITION = 570;
  var START_MAIN_PIN_TOP_POSITION = 375;

  var MAX_PINS_ON_MAP = 5;

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

  var adressInputElement = document.querySelector('#address');

  var mapPinsElement = document.querySelector('.map__pins');

  adressInputElement.value = window.map.startAdress;

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


    var onSubmitButtonClick = function () {
      if (!titleInputElement.checkValidity()) {
        titleInputElement.style.borderColor = 'red';
      }
      if (!priceInputElement.checkValidity()) {
        priceInputElement.style.borderColor = 'red';
      }
    };

    var changeBorderColor = function (element) {
      if (element.checkValidity()) {
        element.style.borderColor = 'silver';
      }
    };

    var onRoomTypeChange = function () {
      typeValue = typeElement.value;
      priceInputElement.min = minPriceForTypes[typeValue];
      priceInputElement.placeholder = minPriceForTypes[typeValue];
      changeBorderColor(priceInputElement);
    };

    var onPriceInput = function () {
      changeBorderColor(priceInputElement);
    };

    var onTitleInput = function () {
      changeBorderColor(titleInputElement);
    };

    var mainMapPinElement = document.querySelector('.map__pin--main');

    var removePinsElements = function () {
      for (var l = 0; l < window.pins.mapPinsElements.length; l++) {
        window.pins.mapPinsElements[l].remove();
      }
    };

    var setPageDeactive = function () {
      mapPinElement.classList.add('map--faded');
      formMapElement.setAttribute('disabled', 'disabled');
      formElement.classList.add('ad-form--disabled');
      setDisableAttribute(fieldsetElements);
      setDisableAttribute(mapSelectFieldsetElements);

      formMapElement.reset();
      formElement.reset();

      mainMapPinElement.style.cssText = 'left:' + START_MAIN_PIN_LEFT_POSITION + 'px; top: ' + START_MAIN_PIN_TOP_POSITION + 'px;';

      if (window.pinPopUp !== undefined) {
        window.pinPopUp.remove();
      }

      removePinsElements();

      document.removeEventListener('keydown', window.onDocumentKeydown);

      mainMapPinElement.addEventListener('mousedown', window.map.onMainPinMousedown);
      mainMapPinElement.addEventListener('keydown', window.map.onMainPinKeydown);
      adressInputElement.value = window.map.startAdress;
    };

    var removeMessage = function (element) {
      if (element !== null) {
        element.remove();
      }
    };

    var removeDocumentListeners = function () {
      document.removeEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', onDocumentClick);
    };

    var onDocumentKeydown = function (evt) {
      removeMessage(document.querySelector('.success'));
      removeMessage(document.querySelector('.error'));

      window.util.isEscEvent(evt, removeMessage);


      removeDocumentListeners();
    };

    var onDocumentClick = function () {
      removeMessage(document.querySelector('.success'));
      removeMessage(document.querySelector('.error'));


      removeDocumentListeners();
    };

    var errorButtonElement = document.querySelector('.error__button');

    var onErrorButtonClick = function () {
      removeMessage(document.querySelector('.error'));
      removeDocumentListeners();
      errorButtonElement.removeEventListener('click', onErrorButtonClick);
    };

    var succesTemplate = document.querySelector('#success').content;

    var successHandler = function () {
      var successMessage = succesTemplate.cloneNode(true);
      document.body.appendChild(successMessage.querySelector('div'));

      document.addEventListener('keydown', onDocumentKeydown);
      document.addEventListener('click', onDocumentClick);
      setPageDeactive();
    };

    var errorTemplate = document.querySelector('#error').content;

    var errorHandler = function () {
      var errorMessage = errorTemplate.cloneNode(true);
      var main = document.querySelector('main');
      main.appendChild(errorMessage.querySelector('div'));

      document.addEventListener('keydown', onDocumentKeydown);
      document.addEventListener('click', onDocumentClick);
      errorButtonElement.addEventListener('click', onErrorButtonClick);
    };

    var onSubmitButtonClicked = function (evt) {
      window.upload(new FormData(formElement), successHandler, errorHandler);
      evt.preventDefault();
    };

    var resetButtonElement = document.querySelector('.ad-form__reset');

    resetButtonElement.addEventListener('click', function () {
      setPageDeactive();
    });

    var typeFilterElement = document.querySelector('#housing-type');

    typeFilterElement.addEventListener('change', function () {

      removePinsElements();

      var filteredTypesElements = [];
      for (var k = 0; k < window.map.ads.length; k++) {
        if (filteredTypesElements.length >= MAX_PINS_ON_MAP) {
          break;
        }
        if (typeFilterElement.value === window.map.ads[k].offer.type) {
          filteredTypesElements.push(window.map.ads[k]);
        }
      }


      if (window.pinPopUp !== undefined) {
        window.pinPopUp.remove();
      }

      window.pins.setPinsActiveCondition(filteredTypesElements);
      window.pins.mapPinsElements = mapPinsElement.querySelectorAll('button:not(.map__pin--main)');
    });

    formElement.addEventListener('submit', onSubmitButtonClicked);

    roomNumberElement.addEventListener('change', onRoomNumberSelectorChanged);
    checkinSelectElement.addEventListener('change', onCheckinTimeSelectorChanged);
    checkoutSelectElement.addEventListener('change', onCheckoutTimeSelectorChanged);
    typeElement.addEventListener('change', onRoomTypeChange);
    submitButton.addEventListener('click', onSubmitButtonClick);
    titleInputElement.addEventListener('input', onTitleInput);
    priceInputElement.addEventListener('input', onPriceInput);
  };
})();

