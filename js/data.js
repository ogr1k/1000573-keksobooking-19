'use strict';

(function () {
  var AD_QUANTITY = 8;
  var AVATAR_IMAGE_FIRST_DIGIT = 0;
  var ADS_TITLES = ['Лучшее в мире жилье', 'Бюджетный вариант', 'Для семейной пары с детьми'];
  var OFFER_PRICE_MAX = 1000000;
  var OFFER_PRICE_MIN = 1;
  var OFFERS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
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

  var interimAds = [];
  var createAdsList = function (objectCount) {
    for (var i = 0; i < objectCount; i++) {
      var randomLocationX = getRandomInteger(LOCATION_X_MIN, LOCATION_X_MAX);
      var randomLocationY = getRandomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX);
      interimAds.push({
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
  window.ads = interimAds;
})();
