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

  var MAX_PINS_ON_MAP = 5;

  var mainPinElement = document.querySelector('.map__pin--main');
  var adressInputElement = document.querySelector('#address');

  var mainMapPinElement = document.querySelector('.map__pin--main');

  var formMapElement = document.querySelector('.map__filters');
  var mapSelectFieldsetElements = formMapElement.querySelectorAll('select, fieldset');


  var onSuccess = function (response) {
    var ads = response;

    for (var i = 0; i < mapSelectFieldsetElements.length; i++) {
      mapSelectFieldsetElements[i].removeAttribute('disabled');
    }

    for (var j = 0; j < ads.length; j++) {
      if (ads[j].offer !== undefined) {
        window.map.adsWithOfferField.push(ads[j]);
      }
    }

    window.pins.setPinsActiveCondition(window.map.adsWithOfferField.slice(0, MAX_PINS_ON_MAP));
  };

  var onDocumentKeydown = function (evt) {
    var removeErrorMessage = function () {
      document.querySelector('div').hidden = true;
    };
    window.util.isEscEvent(evt, removeErrorMessage);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);

    document.addEventListener('keydown', onDocumentKeydown);
  };


  var setActiveCondition = function () {
    window.load(onSuccess, onError);
    window.setFormActiveCondition();
  };

  var onMainPinMousedown = function (evt) {
    if (evt.button === LEFT_BUTTON_MOUSE) {
      setActiveCondition();
    }
    mainMapPinElement.removeEventListener('mousedown', onMainPinMousedown);
    mainMapPinElement.removeEventListener('keydown', onMainPinKeydown);
  };

  mainMapPinElement.addEventListener('mousedown', onMainPinMousedown);

  var onMainPinKeydown = function (evt) {
    if (evt.key === ENTER_KEY) {
      setActiveCondition();
    }
    mainMapPinElement.removeEventListener('mousedown', onMainPinMousedown);
    mainMapPinElement.removeEventListener('keydown', onMainPinKeydown);
  };

  mainMapPinElement.addEventListener('keydown', onMainPinKeydown);

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

  window.map = {
    startAdress: (mainPinElement.offsetLeft + BUTTON_MAIN_MAP_PIN_HALF_WIDTH) + ', ' + (mainPinElement.offsetTop + MAIN_PIN_HEIGHT_WITHOUT_POINTER),
    adsWithOfferField: [],
    onMainPinMousedown: onMainPinMousedown,
    onMainPinKeydown: onDocumentKeydown,
  };


})();
