'use strict';

(function () {

  var OFFERS_TYPES_TRANSLATION = {'palace': 'Дворец',
    'flat': 'квартира',
    'house': 'дом',
    'bungalo': 'бунгало'};

  var infoTemplateElement = document.querySelector('#card').content;

  window.getInfoAdElement = function (element) {
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
})();


