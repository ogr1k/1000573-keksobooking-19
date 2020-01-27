'use strict';
var AD_QUANTITY = 8;
var AVATAR_IMAGE_FIRST_DIGIT = 0;
var ADS_TITLES = ['Лучшее в мире жилье', 'Бюджетный вариант', 'Для семейной пары с детьми'];
var OFFER_PRICE_MAX = 1000000;
var OFFER_PRICE_MIN = 1;
var OFFERS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_QUANTITY_MIN = 1;
var ROOMS_QUANTITY_MAX = 5;
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
var FIRST_ELEMENT = 0;

var mapPinElement = document.querySelector('.map');
mapPinElement.classList.remove('map--faded');
var adTemplateElement = document.querySelector('#pin').content;
var mapPinsElement = document.querySelector('.map__pins');

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};


var getRandomArrayLength = function (items) {
  var randomLengthArray = items.slice(getRandomInteger(FIRST_ELEMENT, items));
  return randomLengthArray;
};


var getRandomElement = function (minElement, elements) {
  return elements[getRandomInteger(minElement, elements.length)];
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
        title: getRandomElement(FIRST_ELEMENT, ADS_TITLES),
        address: 'randomLocationX' + 'randomLocationY',
        price: getRandomInteger(OFFER_PRICE_MIN, OFFER_PRICE_MAX),
        type: getRandomElement(FIRST_ELEMENT, OFFERS_TYPES),
        rooms: getRandomInteger(ROOMS_QUANTITY_MIN, ROOMS_QUANTITY_MAX),
        checkin: getRandomElement(FIRST_ELEMENT, CHECKINS_TIMES),
        checkout: getRandomElement(FIRST_ELEMENT, CHECKOUTS_TIMES),
        features: getRandomArrayLength(FEATURES),
        description: getRandomElement(FIRST_ELEMENT, OFFERS_DESCIPTIONS),
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
