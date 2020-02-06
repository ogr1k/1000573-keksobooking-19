'use strict';
(function () {
  var BUTTON_MAP_PIN_WIDTH = 50;
  var BUTTON_MAP_PIN_HEIGHT = 70;

  var OFFERS_TYPES_TRANSLATION = {'palace': 'Дворец',
    'flat': 'квартира',
    'house': 'дом',
    'bungalo': 'бунгало'};

  var ESC_KEY = 'Escape';


  var adTemplateElement = document.querySelector('#pin').content;
  var mapPinsElement = document.querySelector('.map__pins');

  var renderAdPin = function (ad) {
    var adElement = adTemplateElement.cloneNode(true);
    var mapPinStyle = 'left:' + (ad.location.x - (BUTTON_MAP_PIN_WIDTH / 2)) + 'px; top: ' + (ad.location.y - BUTTON_MAP_PIN_HEIGHT) + 'px;';
    adElement.querySelector('img').src = ad.author.avatar;
    adElement.querySelector('img').alt = ad.offer.title;
    adElement.querySelector('.map__pin').style.cssText = mapPinStyle;

    return adElement;
  };
  window.pininfo = {
    addPinsClickListener: function () {
      for (var i = 0; i < window.mapPinsElements.length; i++) {
        addClickListener(i);
      }
    },

    createAdPinsFragment: function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.ads.length; i++) {
        fragment.appendChild(renderAdPin(window.ads[i]));
      }
      mapPinsElement.appendChild(fragment);
    }
  };

  var infoTemplateElement = document.querySelector('#card').content;


  var getInfoAdElement = function (element) {
    var infoElement = infoTemplateElement.cloneNode(true);
    infoElement.querySelector('.popup__avatar').src = element.author.avatar;
    infoElement.querySelector('.popup__title').textContent = element.offer.title;
    infoElement.querySelector('.popup__text--address').textContent = element.offer.address;
    infoElement.querySelector('.popup__text--price').textContent = element.offer.price + ' Р/ночь';
    infoElement.querySelector('.popup__type').textContent = OFFERS_TYPES_TRANSLATION[element.offer.type];
    infoElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    infoElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ' , выезд до ' + element.offer.checkout;

    if (element.offer.features.length === 0) {
      infoElement.querySelector('.popup__features').hidden = true;
    }
    infoElement.querySelector('.popup__features').innerHTML = '';

    for (var i = 0; i < element.offer.features.length; i++) {
      var newElement = document.createElement('li');
      newElement.className = 'popup__feature popup__feature--' + element.offer.features[i];
      infoElement.querySelector('.popup__features').appendChild(newElement);
    }

    if (element.offer.description.length === 0) {
      infoElement.querySelector('.popup__description').hidden = true;
    }
    infoElement.querySelector('.popup__description').textContent = element.offer.description;
    if (element.offer.photos.length === 0) {
      infoElement.querySelector('.popup__photos').style.cssText = 'display: none';
    } else {
      var photoELement = infoElement.querySelector('.popup__photo');
      photoELement.src = element.offer.photos[0];
      for (var k = 1; k < element.offer.photos.length; k++) {
        var newPhoto = photoELement.cloneNode(true);
        newPhoto.src = element.offer.photos[k];
        photoELement.after(newPhoto);
      }
    }


    return infoElement;
  };


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

      pinPopUp = getInfoAdElement(window.ads[i]).children[0];

      document.querySelector('.map__filters-container').before(pinPopUp);
      var mapPopUpCloseElement = document.querySelector('.popup__close');
      mapPopUpCloseElement.addEventListener('click', function () {
        removePopUpAndEscapeListener();
      });
      document.addEventListener('keydown', onDocumentKeydown);
    });
  };
})();
