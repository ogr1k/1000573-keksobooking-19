'use strict';

(function () {

  var MAIN_MAP_PIN_AND_POINTER_HEIGHT = 84;
  var BUTTON_MAIN_MAP_PIN_HALF_WIDTH = 32;
  var MAX_BLOCK_WIDTH = 1200;
  var MAIN_PIN_HEIGHT_WITHOUT_POINTER = 31;
  var MAX_AVAILABLE_Y_ADRESS = 630;
  var MIN_AVAILABLE_Y_ADRESS = 130;

  var ENTER_KEY = 'Enter';
  var LEFT_BUTTON_MOUSE = 0;

  var mainPinElement = document.querySelector('.map__pin--main');
  var adressInputElement = document.querySelector('#address');

  var formElement = document.querySelector('.ad-form');
  var fieldsetElements = formElement.querySelectorAll('fieldset');


  var mapPinElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var mainMapPinElement = document.querySelector('.map__pin--main');


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
    window.card.createAdPinsFragment();
    formElement.classList.remove('ad-form--disabled');
    mapPinElement.classList.remove('map--faded');
    for (var i = 0; i < fieldsetElements.length; i++) {
      fieldsetElements[i].removeAttribute('disabled');
    }
    formMapElement.querySelector('fieldset').removeAttribute('disabled');
    for (var j = 0; j < mapSelectFieldsetElements.length; j++) {
      mapSelectFieldsetElements[j].removeAttribute('disabled');
    }
    mainMapPinElement.removeEventListener('mousedown', onMainPinMousedown);
    mainMapPinElement.removeEventListener('keydown', onMainPinKeydown);
    window.form.roomNumberElement.addEventListener('change', window.form.onRoomNumberSelectorChanged);
    window.form.checkinSelectElement.addEventListener('change', window.form.onCheckinTimeSelectorChanged);
    window.form.checkoutSelectElement.addEventListener('change', window.form.onCheckoutTimeSelectorChanged);
    window.form.typeElement.addEventListener('change', window.form.onRoomTypeChange);
    window.form.submitButton.addEventListener('click', window.form.onSubmitButtonClick);
    window.form.titleInputElement.addEventListener('input', window.form.onInputChanged);
    window.form.priceInputElement.addEventListener('input', window.form.onInputChanged);

    window.mapPinsElements = mapPinsElement.querySelectorAll('button:not(.map__pin--main)');
    window.card.addPinsClickListener();
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

  adressInputElement.value = (mainPinElement.offsetLeft + BUTTON_MAIN_MAP_PIN_HALF_WIDTH) + ', ' + (mainPinElement.offsetTop + MAIN_PIN_HEIGHT_WITHOUT_POINTER);


  var blockMaxWidthForPin = MAX_BLOCK_WIDTH - BUTTON_MAIN_MAP_PIN_HALF_WIDTH;
  var blockMinWidthForPin = 0 - BUTTON_MAIN_MAP_PIN_HALF_WIDTH;


  var blockMaxHeightForPin = MAX_AVAILABLE_Y_ADRESS - MAIN_MAP_PIN_AND_POINTER_HEIGHT;
  var blockMinHeightForPin = MIN_AVAILABLE_Y_ADRESS - MAIN_MAP_PIN_AND_POINTER_HEIGHT;

  mainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var xPosition;
    var yPosition;

    var setMainPinPosition = function (mouseEvt) {
      var shift = {
        x: startCoords.x - mouseEvt.clientX,
        y: startCoords.y - mouseEvt.clientY
      };

      startCoords = {
        x: mouseEvt.clientX,
        y: mouseEvt.clientY
      };

      yPosition = mainPinElement.offsetTop - shift.y;
      xPosition = mainPinElement.offsetLeft - shift.x;

      yPosition = Math.max(blockMinHeightForPin, Math.min(yPosition, blockMaxHeightForPin));
      xPosition = Math.max(blockMinWidthForPin, Math.min(xPosition, blockMaxWidthForPin));

      mainPinElement.style.top = yPosition + 'px';
      mainPinElement.style.left = xPosition + 'px';

      adressInputElement.value = (xPosition + BUTTON_MAIN_MAP_PIN_HALF_WIDTH) + ', ' + (yPosition + MAIN_MAP_PIN_AND_POINTER_HEIGHT);

    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();


      setMainPinPosition(moveEvt);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      setMainPinPosition(upEvt);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();
