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
    window.setPinsActiveCondition();
    mainMapPinElement.removeEventListener('mousedown', onMainPinMousedown);
    mainMapPinElement.removeEventListener('keydown', onMainPinKeydown);
    window.setFormActiveCondition();
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
