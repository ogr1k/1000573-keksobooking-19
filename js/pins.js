'use strict';
(function () {
  var BUTTON_MAP_PIN_WIDTH = 50;
  var BUTTON_MAP_PIN_HEIGHT = 70;
  var MAX_PINS_ON_MAP = 5;

  var mapPinsElement = document.querySelector('.map__pins');
  var adTemplateElement = document.querySelector('#pin').content;
  var filtersContainerElements = document.querySelector('.map__filters-container');
  var pinPopUp;

  var removePopUpAndEscapeListener = function () {
    pinPopUp.remove();
    document.removeEventListener('keydown', window.pins.onDocumentKeydown);
  };

  window.pins = {
    removePinPopUp: function () {
      if (pinPopUp !== undefined) {
        pinPopUp.remove();
      }
    },
    mapPinsElements: [],
    onDocumentKeydown: function (evt) {
      window.util.isEscEvent(evt, removePopUpAndEscapeListener);
    },
    setPinsActiveCondition: function (elements) {

      var renderAdPin = function (ad) {
        var adElement = adTemplateElement.cloneNode(true);
        var mapPinStyle = 'left:' + (ad.location.x - (BUTTON_MAP_PIN_WIDTH / 2)) + 'px; top: ' + (ad.location.y - BUTTON_MAP_PIN_HEIGHT) + 'px;';
        adElement.querySelector('img').src = ad.author.avatar;
        adElement.querySelector('img').alt = ad.offer.title;
        adElement.querySelector('.map__pin').style.cssText = mapPinStyle;

        return adElement;
      };

      var createAdPinsFragment = function (adsElements) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < adsElements.length; i++) {
          fragment.appendChild(renderAdPin(adsElements[i]));
        }
        mapPinsElement.appendChild(fragment);
      };
      var maxPinsElements = elements.slice(0, MAX_PINS_ON_MAP);
      createAdPinsFragment(maxPinsElements);

      window.pins.mapPinsElements = mapPinsElement.querySelectorAll('button:not(.map__pin--main)');


      var addClickListener = function (i) {
        window.pins.mapPinsElements[i].addEventListener('click', function () {
          window.pins.removePinPopUp();
          var pinWithActiveClass = mapPinsElement.querySelector('.map__pin--active');
          if (pinWithActiveClass !== null) {
            pinWithActiveClass.classList.remove('map__pin--active');
          }
          window.pins.mapPinsElements[i].classList.add('map__pin--active');
          pinPopUp = window.getInfoAdElement(maxPinsElements[i]).children[0];

          filtersContainerElements.before(pinPopUp);
          var mapPopUpCloseElement = document.querySelector('.popup__close');
          mapPopUpCloseElement.addEventListener('click', function () {
            removePopUpAndEscapeListener();
          });
          document.addEventListener('keydown', window.pins.onDocumentKeydown);
        });
      };


      var addPinsClickListener = function () {
        for (var i = 0; i < maxPinsElements.length; i++) {
          addClickListener(i);
        }
      };
      addPinsClickListener();

    }
  };
})();
