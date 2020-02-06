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

  var ENTER_KEY = 'Enter';
  var LEFT_BUTTON_MOUSE = 0;

  var MAIN_PIN_HALF_WIDTH = 32;
  var MAIN_PIN_HEIGHT_WITHOUT_POINTER = 31;

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
  var mapPinsElement = document.querySelector('.map__pins');
  var adressInputElement = document.querySelector('#address');
  var mainMapPinElement = document.querySelector('.map__pin--main');

  adressInputElement.value = (mainMapPinElement.offsetTop + MAIN_PIN_HEIGHT_WITHOUT_POINTER) + ', ' + (mainMapPinElement.offsetLeft + MAIN_PIN_HALF_WIDTH);

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

  var setActiveCondition = function () {
    window.pininfo.createAdPinsFragment();
    formElement.classList.remove('ad-form--disabled');
    mapPinElement.classList.remove('map--faded');
    for (var i = 0; i < fieldsetElements.length; i++) {
      fieldsetElements[i].removeAttribute('disabled');
    }
    // setAdress(BUTTON_MAIN_MAP_PIN_WIDTH_HEIGHT, MAIN_MAP_PIN_POINTER_HEIGHT);
    formMapElement.querySelector('fieldset').removeAttribute('disabled');
    for (var j = 0; j < mapSelectFieldsetElements.length; j++) {
      mapSelectFieldsetElements[j].removeAttribute('disabled');
    }
    mainMapPinElement.removeEventListener('mousedown', onMainPinMousedown);
    mainMapPinElement.removeEventListener('keydown', onMainPinKeydown);
    roomNumberElement.addEventListener('change', onRoomNumberSelectorChanged);
    checkinSelectElement.addEventListener('change', onCheckinTimeSelectorChanged);
    checkoutSelectElement.addEventListener('change', onCheckoutTimeSelectorChanged);
    typeElement.addEventListener('change', onRoomTypeChange);
    submitButton.addEventListener('click', onSubmitButtonClick);
    titleInputElement.addEventListener('input', onInputChanged);
    priceInputElement.addEventListener('input', onInputChanged);

    window.mapPinsElements = mapPinsElement.querySelectorAll('button:not(.map__pin--main)');
    window.pininfo.addPinsClickListener();
  };

  var onMainPinMousedown = function (evt) {
    if (evt.button === LEFT_BUTTON_MOUSE) {
      setActiveCondition();
    }
  };

  mainMapPinElement.addEventListener('mousedown', onMainPinMousedown);

  var onMainPinKeydown = function (evt) {
    if (evt.key === ENTER_KEY) {
      setActiveCondition();
    }
  };

  mainMapPinElement.addEventListener('keydown', onMainPinKeydown);

  var roomNumberElement = document.querySelector('#room_number');
  var roomCapacityElement = document.querySelector('#capacity');
  var roomsCapacityOptionsElements = roomCapacityElement.querySelectorAll('option');


  var disableOptions = function (elements, arrayLengths) {
    for (var i = 0; i < arrayLengths; i++) {
      if (!elements[i].hasAttribute('disabled')) {
        elements[i].setAttribute('disabled', 'disabled');
      }
    }
  };

  disableOptions(roomsCapacityOptionsElements, (roomsCapacityOptionsElements.length - 1)); // disable options for 100 rooms

  var onRoomNumberSelectorChanged = function () {
    disableOptions(roomsCapacityOptionsElements, roomsCapacityOptionsElements.length);
    var roomNumberValue = roomNumberElement.value;

    for (var i = 0; i < roomsOptionsToBeEnabled[roomNumberValue].length; i++) {
      var index = roomsOptionsToBeEnabled[roomNumberValue][i];
      roomsCapacityOptionsElements[index].removeAttribute('disabled');
    }
    roomCapacityElement.selectedIndex = roomsOptionsToBeEnabled[roomNumberValue][0];
  };

  var checkoutSelectElement = document.querySelector('#timeout');
  var checkinSelectElement = document.querySelector('#timein');


  var onCheckinTimeSelectorChanged = function () {
    checkoutSelectElement.value = checkinSelectElement.value;
  };


  var onCheckoutTimeSelectorChanged = function () {
    checkinSelectElement.value = checkoutSelectElement.value;
  };

  var typeElement = document.querySelector('#type');
  var priceInputElement = document.querySelector('#price');
  var typeValue;
  var onRoomTypeChange = function () {
    typeValue = typeElement.value;
    priceInputElement.min = minPriceForTypes[typeValue];
    priceInputElement.placeholder = minPriceForTypes[typeValue];
  };

  var titleInputElement = document.querySelector('#title');
  var submitButton = document.querySelector('.ad-form__submit');
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

  window.mapPinsElements = [];
})();
