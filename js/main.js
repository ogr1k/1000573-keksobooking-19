'use strict';
var AD_QUANTITY = 8;
var AVATAR_IMAGE_FIRST_DIGIT = 0;
var ADS_TITLES = ['Лучшее в мире жилье', 'Бюджетный вариант', 'Для семейной пары с детьми'];
var OFFER_PRICE_MAX = 1000000;
var OFFER_PRICE_MIN = 1;
var OFFERS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFERS_TYPES_TRANSLATION = {'palace': 'Дворец',
  'flat': 'квартира',
  'house': 'дом',
  'bungalo': 'бунгало'};
var ROOMS_QUANTITY_MIN = 1;
var ROOMS_QUANTITY_MAX = 5;
var GUESTS_QUANTITY_MIN = 0;
var GUESTS_QUANTITY_MAX = 7;
var CHECKINS_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUTS_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFERS_DESCIPTIONS = ['отличные аппартаменты!', 'Без домашних животных!'];
var OFFERS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_X_MAX = 1200;
var LOCATION_X_MIN = 0;
var LOCATION_Y_MAX = 630;
var LOCATION_Y_MIN = 130;
var BUTTON_MAP_PIN_WIDTH = 50;
var BUTTON_MAP_PIN_HEIGHT = 70;


var mapPinElement = document.querySelector('.map');
mapPinElement.classList.remove('map--faded');
var adTemplateElement = document.querySelector('#pin').content;
var mapPinsElement = document.querySelector('.map__pins');

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};


var getRandomArrayLength = function (items) {
  return items.slice(getRandomInteger(0, items.length));
};


var getRandomElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};


var ads = [];
var createAdsList = function (objectCount) {
  for (var i = 0; i < objectCount; i++) {
    var randomLocationX = getRandomInteger(LOCATION_X_MIN, LOCATION_X_MAX);
    var randomLocationY = getRandomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX);
    ads.push({
      author: {
        avatar: 'img/avatars/user' + AVATAR_IMAGE_FIRST_DIGIT + (i + 1) + '.png'
      },

      offer: {
        title: getRandomElement(ADS_TITLES),
        address: randomLocationX + ' , ' + randomLocationY,
        price: getRandomInteger(OFFER_PRICE_MIN, OFFER_PRICE_MAX),
        type: getRandomElement(OFFERS_TYPES),
        rooms: getRandomInteger(ROOMS_QUANTITY_MIN, ROOMS_QUANTITY_MAX),
        guests: getRandomInteger(GUESTS_QUANTITY_MIN, GUESTS_QUANTITY_MAX),
        checkin: getRandomElement(CHECKINS_TIMES),
        checkout: getRandomElement(CHECKOUTS_TIMES),
        features: getRandomArrayLength(FEATURES),
        description: getRandomElement(OFFERS_DESCIPTIONS),
        photos: getRandomArrayLength(OFFERS_PHOTOS)
      },
      location: {
        x: randomLocationX,
        y: randomLocationY
      }
    });
  }
};


createAdsList(AD_QUANTITY);


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
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderAdPin(ads[i]));
  }
  mapPinsElement.appendChild(fragment);
};

createAdPinsFragment();

var infoTemplateElement = document.querySelector('#card').content;
var infoElement = infoTemplateElement.cloneNode(true);

var getInfoAdElement = function (element) {
  infoElement.querySelector('.popup__avatar').src = element.author.avatar;
  infoElement.querySelector('.popup__title').textContent = element.offer.title;
  infoElement.querySelector('.popup__text--address').textContent = element.offer.address;
  infoElement.querySelector('.popup__text--price').textContent = element.offer.price + ' Р/ночь';
  infoElement.querySelector('.popup__type').textContent = OFFERS_TYPES_TRANSLATION[element.offer.type];
  infoElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  infoElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ' , выезд до ' + element.offer.checkout;
  if (element.offer.features.length === 0) {
    infoElement.querySelector('.popup__features').hidden = true;
  } else {
    if (FEATURES.length !== element.offer.features.length) {
      for (var i = (FEATURES.length - 1); i >= element.offer.features.length; i--) {
        infoElement.querySelector('.popup__features').children[i].remove();
      }
    }
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
    for (var j = 1; j < element.offer.photos.length; j++) {
      var newPhoto = photoELement.cloneNode(true);
      newPhoto.src = element.offer.photos[j];
      photoELement.after(newPhoto);
    }
  }


  return infoElement;
};

document.querySelector('.map__filters-container').before(getInfoAdElement(ads[0]));
