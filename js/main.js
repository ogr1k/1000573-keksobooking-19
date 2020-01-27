'use strict';
var AD_QUANTITY = 8;
var AVATARS_IMAGES_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
var AVATAR_IMAGE_FIRST_DIGIT = 0;
var AD_TITLE = 'Лучшее в мире жилье';
var OFFER_PRICE = 1200;
var OFFERS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_QUANTITY = 5;
var CHECKINS_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUTS_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES_LISTS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_DESCIPTION = 'отличные аппартаменты!';
var OFFERS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_ADRESS = '600, 350';
var LOCATION_X_MAX = 1200;
var LOCATION_X_MIN = 200;
var LOCATION_Y_MAX = 630;
var LOCATION_Y_MIN = 130;
var BUTTON_MAP_PIN_WIDTH = 50;
var BUTTON_MAP_PIN_HEIGHT = 70;

var mapPin = document.querySelector('.map');
mapPin.classList.remove('map--faded');
var adTemplateElement = document.querySelector('#pin').content;
var mapPins = document.querySelector('.map__pins');

var getRandomLocation = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomArrayLength = function (array) {
  var randomLengthArray = array.slice();
  randomLengthArray.length = Math.floor(Math.random() * randomLengthArray.length);
  return randomLengthArray;
};

var getRandomIndex = function (array) {
  var rand = Math.random() * array.length;
  return Math.floor(rand);
};

var getRandomElement = function (elements) {
  return elements[getRandomIndex(elements)];
};


var ads = [];
var createAdsList = function (objectCount) {
  for (var i = 0; i < objectCount; i++) {
    ads.push({
      author: {
        avatar: 'img/avatars/user' + AVATAR_IMAGE_FIRST_DIGIT + AVATARS_IMAGES_NUMBERS[i] + '.png'
      },

      offer: {
        title: AD_TITLE,
        address: OFFER_ADRESS,
        price: OFFER_PRICE,
        type: getRandomElement(OFFERS_TYPES),
        rooms: ROOMS_QUANTITY,
        checkin: getRandomElement(CHECKINS_TIMES),
        checkout: getRandomElement(CHECKOUTS_TIMES),
        FEATURES: getRandomArrayLength(FEATURES_LISTS),
        description: OFFER_DESCIPTION,
        photos: getRandomArrayLength(OFFERS_PHOTOS)
      },
      location: {
        x: getRandomLocation(LOCATION_X_MIN, LOCATION_X_MAX),
        y: getRandomLocation(LOCATION_Y_MIN, LOCATION_Y_MAX)
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

var fragment = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderAdPin(ads[i]));
}
mapPins.appendChild(fragment);
