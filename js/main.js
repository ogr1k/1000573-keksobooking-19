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

var ENTER_KEY = 'Enter';
var LEFT_BUTTON_MOUSE = 0;
var ESC_KEY = 'Escape';

var DEFAULT_X_POSITION_MAIN_PIN = 570;
var DEFAULT_Y_POSITION_MAIN_PIN = 375;
var BUTTON_MAIN_MAP_PIN_WIDTH_HEIGHT = 65;
var BUTTON_MAIN_MAP_PIN_HALF_WIDTH_HEIGHT = 32;
var MAIN_MAP_PIN_POINTER_HEIGHT = 19;

var NO_GEUSTS_OPTION_INDEX = 3;
var ONE_GEUST_OPTION_INDEX = 2;
var TWO_GEUSTS_OPTION_INDEX = 1;
var THREE_GEUSTS_OPTION_INDEX = 0;

var MIN_PRICE_FOR_BUNGALO = 0;
var MIN_PRICE_FOR_FLAT = 1000;
var MIN_PRICE_FOR_HOUSE = 5000;
var MIN_PRICE_FOR_PALACE = 10000;

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


var formElement = document.querySelector('.ad-form');
var fieldsetElements = formElement.querySelectorAll('fieldset');

var setDisableAttribute = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'disabled');
  }
};

setDisableAttribute(fieldsetElements);
var adressInputElement = document.querySelector('#address');

var setAdress = function (buttonHeight, pointerHeight) {
  adressInputElement.value = Math.round((DEFAULT_X_POSITION_MAIN_PIN + buttonHeight)) + ', ' + Math.round((DEFAULT_Y_POSITION_MAIN_PIN + (BUTTON_MAIN_MAP_PIN_WIDTH_HEIGHT + pointerHeight)));
};

setAdress(BUTTON_MAIN_MAP_PIN_HALF_WIDTH_HEIGHT, 0);


var formMapElement = document.querySelector('.map__filters');
formMapElement.setAttribute('disabled', 'disabled');
var mapSelectFieldsetElements = formMapElement.querySelectorAll('select, fieldset');
setDisableAttribute(mapSelectFieldsetElements);
var mainMapPinElement = document.querySelector('.map__pin--main');
var mapPinsElements;

var setActiveCondition = function () {
  createAdPinsFragment();
  formElement.classList.remove('ad-form--disabled');
  mapPinElement.classList.remove('map--faded');
  for (var i = 0; i < fieldsetElements.length; i++) {
    fieldsetElements[i].removeAttribute('disabled');
  }
  setAdress(BUTTON_MAIN_MAP_PIN_WIDTH_HEIGHT, MAIN_MAP_PIN_POINTER_HEIGHT);
  formMapElement.querySelector('fieldset').removeAttribute('disabled');
  for (var j = 0; j < mapSelectFieldsetElements.length; j++) {
    mapSelectFieldsetElements[j].removeAttribute('disabled');
  }
  mainMapPinElement.removeEventListener('mousedown', onMainPinMousedown);
  mainMapPinElement.removeEventListener('keydown', onMainPinKeydown);
  roomNumberElement.addEventListener('change', onRoomNumberSelectorChanged);
  checkinSelectElement.addEventListener('change', onCheckinTimeSelectorChanged);
  checkoutSelectElement.addEventListener('change', onCheckoutTimeSelectorChanged);
  typeElement.addEventListener('change', onRoomTypeChangePricePerNight);

  mapPinsElements = mapPinsElement.querySelectorAll('button:not(.map__pin--main)');
  addPinsClickListener();
};

var onMainPinMousedown = function (evt) {
  if (evt.button === LEFT_BUTTON_MOUSE) {
    setActiveCondition();
  }
};

mainMapPinElement.addEventListener('mousedown', onMainPinMousedown);

var onMainPinKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
    setActiveCondition();
  }
};

mainMapPinElement.addEventListener('keydown', onMainPinKeydown);

var roomNumberElement = document.querySelector('#room_number');
var roomCapacityElement = document.querySelector('#capacity');
var roomsCapacityOptionsElements = roomCapacityElement.querySelectorAll('option');


var roomsOptionsToBeEnabled = {
  '1': [ONE_GEUST_OPTION_INDEX],
  '2': [TWO_GEUSTS_OPTION_INDEX, ONE_GEUST_OPTION_INDEX],
  '3': [THREE_GEUSTS_OPTION_INDEX, TWO_GEUSTS_OPTION_INDEX, ONE_GEUST_OPTION_INDEX],
  '100': [NO_GEUSTS_OPTION_INDEX]
};

var disableOptions = function (elements, arrayLengths) {
  for (var i = 0; i < arrayLengths; i++) {
    if (!elements[i].hasAttribute('disabled')) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  }
};

disableOptions(roomsCapacityOptionsElements, (roomsCapacityOptionsElements.length - 1)); // disable options for 100 rooms

var onRoomNumberSelectorChanged = function () {
  disableOptions(roomsCapacityOptionsElements, roomsCapacityOptionsElements.length);
  var roomNumberValue = roomNumberElement.value;

  for (var i = 0; i < roomsOptionsToBeEnabled[roomNumberValue].length; i++) {
    var index = roomsOptionsToBeEnabled[roomNumberValue][i];
    roomsCapacityOptionsElements[index].removeAttribute('disabled');
  }
  roomCapacityElement.selectedIndex = roomsOptionsToBeEnabled[roomNumberValue][0];
};

var pinPopUp;

var addPinsClickListener = function () {
  for (var i = 0; i < mapPinsElements.length; i++) {
    addClickListener(i);
  }
};

var addEscapeListener = function (evt) {
  if (evt.key === ESC_KEY) {
    pinPopUp.remove();
    document.removeEventListener('keydown', addEscapeListener);
  }
};

var addClickListener = function (i) {
  mapPinsElements[i].addEventListener('click', function () {
    if (pinPopUp !== undefined) {
      pinPopUp.remove();
    }

    pinPopUp = getInfoAdElement(ads[i]).children[0];

    document.querySelector('.map__filters-container').before(pinPopUp);
    var mapPopUpCloseElement = document.querySelector('.popup__close');
    mapPopUpCloseElement.addEventListener('click', function () {
      pinPopUp.remove();
    });
    document.addEventListener('keydown', addEscapeListener);
  });
};

var checkoutSelectElement = document.querySelector('#timeout');
var checkinSelectElement = document.querySelector('#timein');


var onCheckinTimeSelectorChanged = function () {
  checkoutSelectElement.value = checkinSelectElement.value;
};


var onCheckoutTimeSelectorChanged = function () {
  checkinSelectElement.value = checkoutSelectElement.value;
};

var minPriceForTypes = {
  'bungalo': MIN_PRICE_FOR_BUNGALO,
  'flat': MIN_PRICE_FOR_FLAT,
  'house': MIN_PRICE_FOR_HOUSE,
  'palace': MIN_PRICE_FOR_PALACE
};

var typeElement = document.querySelector('#type');
var priceInputElement = document.querySelector('#price');

var onRoomTypeChangePricePerNight = function () {
  var typeValue = typeElement.value;
  priceInputElement.min = minPriceForTypes[typeValue];
  priceInputElement.placeholder = minPriceForTypes[typeValue];
};


