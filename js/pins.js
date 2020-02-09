'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var BUTTON_MAP_PIN_WIDTH = 50;
  var BUTTON_MAP_PIN_HEIGHT = 70;

  window.mapPinsElements = [];

  var mapPinsElement = document.querySelector('.map__pins');

  window.setPinsActiveCondition = function () {

    var adTemplateElement = document.querySelector('#pin').content;

    var renderAdPin = function (ad) {
      var adElement = adTemplateElement.cloneNode(true);
      var mapPinStyle = 'left:' + (ad.location.x - (BUTTON_MAP_PIN_WIDTH / 2)) + 'px; top: ' + (ad.location.y - BUTTON_MAP_PIN_HEIGHT) + 'px;';
      adElement.querySelector('img').src = ad.author.avatar;
      adElement.querySelector('img').alt = ad.offer.title;
      adElement.querySelector('.map__pin').style.cssText = mapPinStyle;

      return adElement;
    };

    var createAdPinsFragment = function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.ads.length; i++) {
        fragment.appendChild(renderAdPin(window.ads[i]));
      }
      mapPinsElement.appendChild(fragment);
    };
    createAdPinsFragment();

    window.mapPinsElements = mapPinsElement.querySelectorAll('button:not(.map__pin--main)');

    var pinPopUp;

    var removePopUpAndEscapeListener = function () {
      pinPopUp.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    };


    var onDocumentKeydown = function (evt) {
      if (evt.key === ESC_KEY) {
        removePopUpAndEscapeListener();
      }
    };

    var addClickListener = function (i) {
      window.mapPinsElements[i].addEventListener('click', function () {
        if (pinPopUp !== undefined) {
          pinPopUp.remove();
        }

        pinPopUp = window.getInfoAdElement(window.ads[i]).children[0];

        document.querySelector('.map__filters-container').before(pinPopUp);
        var mapPopUpCloseElement = document.querySelector('.popup__close');
        mapPopUpCloseElement.addEventListener('click', function () {
          removePopUpAndEscapeListener();
        });
        document.addEventListener('keydown', onDocumentKeydown);
      });
    };


    var addPinsClickListener = function () {
      for (var i = 0; i < window.mapPinsElements.length; i++) {
        addClickListener(i);
      }
    };
    addPinsClickListener();
  };
})();
