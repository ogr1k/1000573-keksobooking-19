'use strict';

(function () {

  var MAIN_MAP_PIN_AND_POINTER_HEIGHT = 84;
  var BUTTON_MAIN_MAP_PIN_HALF_WIDTH = 32;
  var MAX_BLOCK_WIDTH = 1200;
  var BLOCK_MAX_WIDTH_FOR_PIN = MAX_BLOCK_WIDTH - BUTTON_MAIN_MAP_PIN_HALF_WIDTH;
  var BLOCK_MIN_WIDTH_FOR_PIN = 0 - BUTTON_MAIN_MAP_PIN_HALF_WIDTH;
  var BLOCK_MAX_HEIGHT_FOR_PIN = 630;
  var BLOCK_MIN_HEIGHT_FOR_PIN = 130;
  var MAIN_PIN_HEIGHT_WITHOUT_POINTER = 31;

  var mainPinElement = document.querySelector('.map__pin--main');
  var adressInputElement = document.querySelector('#address');

  adressInputElement.value = (mainPinElement.offsetTop + MAIN_PIN_HEIGHT_WITHOUT_POINTER) + ', ' + (mainPinElement.offsetLeft + BUTTON_MAIN_MAP_PIN_HALF_WIDTH);

  mainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var xPosition;
    var yPosition;

    var setMainPinPosition = function (element) {
      var shift = {
        x: startCoords.x - element.clientX,
        y: startCoords.y - element.clientY
      };

      startCoords = {
        x: element.clientX,
        y: element.clientY
      };

      yPosition = mainPinElement.offsetTop - shift.y;
      xPosition = mainPinElement.offsetLeft - shift.x;

      yPosition = Math.max(BLOCK_MIN_HEIGHT_FOR_PIN, Math.min(yPosition, BLOCK_MAX_HEIGHT_FOR_PIN));
      xPosition = Math.max(BLOCK_MIN_WIDTH_FOR_PIN, Math.min(xPosition, BLOCK_MAX_WIDTH_FOR_PIN));

      mainPinElement.style.top = yPosition + 'px';
      mainPinElement.style.left = xPosition + 'px';
      adressInputElement.value = (yPosition + MAIN_MAP_PIN_AND_POINTER_HEIGHT) + ', ' + (xPosition + BUTTON_MAIN_MAP_PIN_HALF_WIDTH);

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

