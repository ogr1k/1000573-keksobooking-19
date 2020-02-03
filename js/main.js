'use strict';
var AD_QUANTITY = 8;
var AVATAR_IMAGE_FIRST_DIGIT = 0;
var ADS_TITLES = ['Лучшее в мире жилье', 'Бюджетный вариант', 'Для семейной пары с детьми'];
var OFFER_PRICE_MAX = 1000000;
var OFFER_PRICE_MIN = 1;
var OFFERS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
/* var OFFERS_TYPES_TRANSLATION = {'palace': 'Дворец',
  'flat': 'квартира',
  'house': 'дом',
  'bungalo': 'бунгало'}; */
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

var ENTER_KEY = 'Enter';

var DEFAULT_X_POSITION_MAIN_PIN = 570;
var DEFAULT_Y_POSITION_MAIN_PIN = 375;
var BUTTON_MAIN_MAP_PIN_WIDTH_HEIGHT = 65;
var MAIN_MAP_PIN_POINTER_HEIGHT = 19;

var mapPinElement = document.querySelector('.map');
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

/* var infoTemplateElement = document.querySelector('#card').content;
var infoElement = infoTemplateElement.cloneNode(true);

var getInfoAdElement = function (element) {
  infoElement.querySelector('.popup__avatar').src = element.author.avatar;
  infoElement.querySelector('.popup__title').textContent = element.offer.title;
  infoElement.querySelector('.popup__text--address').textContent = element.offer.address;
  infoElement.querySelector('.popup__text--price').textContent = element.offer.price + ' Р/ночь';
  infoElement.querySelector('.popup__type').textContent = OFFERS_TYPES_TRANSLATION[element.offer.type];
  infoElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  infoElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ' , выезд до ' + element.offer.checkout;
  for (var i = 0; i < (FEATURES.length); i++) {
    infoElement.querySelector('.popup__features').children[i].style.cssText = 'display: none';
  }

  for (var j = 0; j < element.offer.features.length; j++) {
    infoElement.querySelector('.popup__features').children[j].classList.add('popup__feature--' + element.offer.features[j]);
    infoElement.querySelector('.popup__features').children[j].style.cssText = 'display: inline-block';
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

document.querySelector('.map__filters-container').before(getInfoAdElement(ads[0])); */

var formElement = document.querySelector('.ad-form');
var fieldsetElements = formElement.querySelectorAll('fieldset');

var setDisableAttribute = function () {
  for (var i = 0; i < fieldsetElements.length; i++) {
    fieldsetElements[i].setAttribute('disabled', 'disabled');
  }
};

setDisableAttribute();
var adressInputElement = document.querySelector('#address');

var getAdress = function (divider, pointerHeight) {
  var mainPinAdress = Math.round((DEFAULT_X_POSITION_MAIN_PIN + (BUTTON_MAIN_MAP_PIN_WIDTH_HEIGHT / 2))) + ', ' + Math.round((DEFAULT_Y_POSITION_MAIN_PIN + (BUTTON_MAIN_MAP_PIN_WIDTH_HEIGHT / divider + pointerHeight)));
  return mainPinAdress;
};

adressInputElement.value = getAdress(2, 0);


var formMapElement = document.querySelector('.map__filters');
formMapElement.setAttribute('disabled', 'disabled');
formMapElement.querySelector('fieldset').setAttribute('disabled', 'disabled');
var mapSelectElements = formMapElement.querySelectorAll('select');
var disableMapSelects = function () {
  for (var i = 0; i < mapSelectElements.length; i++) {
    mapSelectElements[i].setAttribute('disabled', 'disabled');
  }
};
disableMapSelects();
var mainMapPinElement = document.querySelector('.map__pin--main');


var setActiveCondition = function () {
  formElement.classList.remove('ad-form--disabled');
  createAdPinsFragment();
  mapPinElement.classList.remove('map--faded');
  for (var i = 0; i < fieldsetElements.length; i++) {
    fieldsetElements[i].removeAttribute('disabled');
    adressInputElement.value = getAdress(1, MAIN_MAP_PIN_POINTER_HEIGHT);
  }

  formMapElement.querySelector('fieldset').removeAttribute('disabled');
  for (var j = 0; j < mapSelectElements.length; j++) {
    mapSelectElements[j].removeAttribute('disabled');
  }

};

var mouseHandler = function (evt) {
  if (evt.button === 0) {
    setActiveCondition();
    mainMapPinElement.removeEventListener('mousedown', mouseHandler);
  }
};

mainMapPinElement.addEventListener('mousedown', mouseHandler);

var keyboardHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    setActiveCondition();
    mainMapPinElement.removeEventListener('keydown', keyboardHandler);
  }
};

mainMapPinElement.addEventListener('keydown', keyboardHandler);

var roomNumberElement = document.querySelector('#room_number');
var roomCapacityElement = document.querySelector('#capacity');
var roomsCapacityOptionsElements = roomCapacityElement.querySelectorAll('option');

var roomsOptionsToBeEnabled = {
  '1': [2],
  '2': [1, 2],
  '3': [0, 1, 2],
  '100': [3]
};

var roomNumberHandler = function () {
  for (var i = 0; i < roomsCapacityOptionsElements.length; i++) {
    if (!roomsCapacityOptionsElements[i].hasAttribute('disabled')) {
      roomsCapacityOptionsElements[i].setAttribute('disabled', 'disabled');
    }
    roomsCapacityOptionsElements[i].removeAttribute('selected');
  }

  var roomNumberValue = roomNumberElement.value;

  for (var j = 0; j < roomsOptionsToBeEnabled[roomNumberValue].length; j++) {
    var index = roomsOptionsToBeEnabled[roomNumberValue][j];
    roomsCapacityOptionsElements[index].removeAttribute('disabled');
  }
  roomsCapacityOptionsElements[index].setAttribute('selected', 'selected');
};

roomNumberElement.addEventListener('change', roomNumberHandler);
