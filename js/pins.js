'use strict';
(function () {
  var BUTTON_MAP_PIN_WIDTH = 50;
  var BUTTON_MAP_PIN_HEIGHT = 70;

  var mapPinsElement = document.querySelector('.map__pins');
  var adTemplateElement = document.querySelector('#pin').content;
  var filtersContainerElements = document.querySelector('.map__filters-container');
  var pinPopUp = null;
  var pinWithActiveClass;

  var removePinActiveClass = function () {
    if (pinWithActiveClass !== undefined) {
      pinWithActiveClass.classList.remove('map__pin--active');
    }
  };

  var removePopUpAndEscapeListener = function () {
    pinPopUp.remove();
    pinPopUp = null;
    document.removeEventListener('keydown', window.pins.onDocumentKeydown);
    removePinActiveClass();
  };


  window.pins = {
    removePopUp: function () {
      if (pinPopUp !== null) {
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

      var createAdPinsFragment = function () {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < elements.length; i++) {
          fragment.appendChild(renderAdPin(elements[i]));
        }
        var result = Array.from(fragment.children);
        mapPinsElement.appendChild(fragment);
        return result;
      };

      window.pins.mapPinsElements = createAdPinsFragment(elements);


      var addClickListener = function (i) {
        window.pins.mapPinsElements[i].addEventListener('click', function () {
          window.pins.removePopUp();


          removePinActiveClass();
          pinWithActiveClass = window.pins.mapPinsElements[i];
          window.pins.mapPinsElements[i].classList.add('map__pin--active');
          pinPopUp = window.getInfoAdElement(elements[i]).children[0];

          filtersContainerElements.before(pinPopUp);
          var mapPopUpCloseElement = document.querySelector('.popup__close');
          mapPopUpCloseElement.addEventListener('click', function () {
            removePopUpAndEscapeListener();
          });
          document.addEventListener('keydown', window.pins.onDocumentKeydown);
        });
      };


      var addPinsClickListeners = function () {
        for (var i = 0; i < elements.length; i++) {
          addClickListener(i);
        }
      };
      addPinsClickListeners();

    }
  };
})();
