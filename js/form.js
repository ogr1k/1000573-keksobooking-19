'use strict';

(function () {


  var NO_GEUSTS_OPTION_INDEX = 3;
  var ONE_GEUST_OPTION_INDEX = 2;
  var TWO_GEUSTS_OPTION_INDEX = 1;
  var THREE_GEUSTS_OPTION_INDEX = 0;

  var MIN_PRICE_FOR_BUNGALO = 0;
  var MIN_PRICE_FOR_FLAT = 1000;
  var MIN_PRICE_FOR_HOUSE = 5000;
  var MIN_PRICE_FOR_PALACE = 10000;

  var START_MAIN_PIN_LEFT_POSITION = 570;
  var START_MAIN_PIN_TOP_POSITION = 375;

  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var UPLOAD_METHOD = 'POST';

  var DEFAULT_FORM_AVATAR_IMAGE = 'img/muffin-grey.svg';


  var roomsOptionsToBeEnabled = {
    '1': [ONE_GEUST_OPTION_INDEX],
    '2': [TWO_GEUSTS_OPTION_INDEX, ONE_GEUST_OPTION_INDEX],
    '3': [THREE_GEUSTS_OPTION_INDEX, TWO_GEUSTS_OPTION_INDEX, ONE_GEUST_OPTION_INDEX],
    '100': [NO_GEUSTS_OPTION_INDEX]
  };

  var minPriceForTypes = {
    'bungalo': MIN_PRICE_FOR_BUNGALO,
    'flat': MIN_PRICE_FOR_FLAT,
    'house': MIN_PRICE_FOR_HOUSE,
    'palace': MIN_PRICE_FOR_PALACE
  };

  var formElement = document.querySelector('.ad-form');
  var fieldsetElements = formElement.querySelectorAll('fieldset');

  var mainMapPinElement = document.querySelector('.map__pin--main');
  var mapPinElement = document.querySelector('.map');

  var adressInputElement = document.querySelector('#address');
  var resetButtonElement = document.querySelector('.ad-form__reset');

  var errorTemplate = document.querySelector('#error').content;
  var succesTemplate = document.querySelector('#success').content;
  var errorButtonElement = errorTemplate.querySelector('.error__button');

  var previewPhotoElement = document.querySelector('.ad-form__photo');
  var previewAvatarElement = document.querySelector('.ad-form-header__preview');

  var main = document.querySelector('main');

  adressInputElement.value = window.map.startAdress;

  var setDisableAttribute = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  };

  setDisableAttribute(fieldsetElements);


  var formMapElement = document.querySelector('.map__filters');
  formMapElement.setAttribute('disabled', 'disabled');
  var mapSelectFieldsetElements = formMapElement.querySelectorAll('select, fieldset');
  setDisableAttribute(mapSelectFieldsetElements);
  var roomNumberElement = document.querySelector('#room_number');
  var roomCapacityElement = document.querySelector('#capacity');
  var roomsCapacityOptionsElements = roomCapacityElement.querySelectorAll('option');
  var checkoutSelectElement = document.querySelector('#timeout');
  var checkinSelectElement = document.querySelector('#timein');
  var typeElement = document.querySelector('#type');
  var priceInputElement = document.querySelector('#price');
  var typeValue;
  var titleInputElement = document.querySelector('#title');
  var submitButton = document.querySelector('.ad-form__submit');


  window.setFormActiveCondition = function () {
    var disableOptions = function (elements, arrayLengths) {
      for (var l = 0; l < arrayLengths; l++) {
        if (!elements[l].hasAttribute('disabled')) {
          elements[l].setAttribute('disabled', 'disabled');
        }
      }
    };

    disableOptions(roomsCapacityOptionsElements, (roomsCapacityOptionsElements.length - 1));


    formElement.classList.remove('ad-form--disabled');
    mapPinElement.classList.remove('map--faded');
    for (var i = 0; i < fieldsetElements.length; i++) {
      fieldsetElements[i].removeAttribute('disabled');
    }
    var onRoomNumberSelectorChanged = function () {
      disableOptions(roomsCapacityOptionsElements, roomsCapacityOptionsElements.length);
      var roomNumberValue = roomNumberElement.value;

      for (var k = 0; k < roomsOptionsToBeEnabled[roomNumberValue].length; k++) {
        var index = roomsOptionsToBeEnabled[roomNumberValue][k];
        roomsCapacityOptionsElements[index].removeAttribute('disabled');
      }
      roomCapacityElement.selectedIndex = roomsOptionsToBeEnabled[roomNumberValue][0];
    };
    var onCheckinTimeSelectorChanged = function () {
      checkoutSelectElement.value = checkinSelectElement.value;
    };

    var onCheckoutTimeSelectorChanged = function () {
      checkinSelectElement.value = checkoutSelectElement.value;
    };

    var changeBorderColor = function (element, check, color) {
      if (element.checkValidity() === check) {
        element.style.borderColor = color;
      }
    };

    var onSubmitButtonClicked = function () {
      changeBorderColor(titleInputElement, false, 'red');
      changeBorderColor(priceInputElement, false, 'red');
    };


    var onRoomTypeChanged = function () {
      typeValue = typeElement.value;
      priceInputElement.min = minPriceForTypes[typeValue];
      priceInputElement.placeholder = minPriceForTypes[typeValue];
      changeBorderColor(priceInputElement, true, 'silver');
    };

    var onPriceInput = function () {
      changeBorderColor(priceInputElement, true, 'silver');
    };

    var onTitleInput = function () {
      changeBorderColor(titleInputElement, true, 'silver');
    };

    var setPageDeactive = function () {
      mapPinElement.classList.add('map--faded');
      formMapElement.setAttribute('disabled', 'disabled');
      formElement.classList.add('ad-form--disabled');
      setDisableAttribute(fieldsetElements);
      setDisableAttribute(mapSelectFieldsetElements);

      formMapElement.reset();
      formElement.reset();

      mainMapPinElement.style.cssText = 'left:' + START_MAIN_PIN_LEFT_POSITION + 'px; top: ' + START_MAIN_PIN_TOP_POSITION + 'px;';
      priceInputElement.placeholder = MIN_PRICE_FOR_BUNGALO;
      previewPhotoElement.querySelector('img').hidden = true;
      previewAvatarElement.querySelector('img').src = DEFAULT_FORM_AVATAR_IMAGE;

      window.pins.removePopUp();

      window.util.removePinsElements();


      mainMapPinElement.addEventListener('mousedown', window.map.onMainPinMousedown);
      mainMapPinElement.addEventListener('keydown', window.map.onMainPinKeydown);
      adressInputElement.value = window.map.startAdress;

      document.removeEventListener('keydown', window.pins.onDocumentKeydown);
      roomNumberElement.removeEventListener('change', onRoomNumberSelectorChanged);
      checkinSelectElement.removeEventListener('change', onCheckinTimeSelectorChanged);
      checkoutSelectElement.removeEventListener('change', onCheckoutTimeSelectorChanged);
      window.filter.removeListener();
      typeElement.removeEventListener('change', onRoomTypeChanged);
      submitButton.removeEventListener('click', onSubmitButtonClicked);
      resetButtonElement.removeEventListener('click', onResetButtonClicked);
      titleInputElement.removeEventListener('input', onTitleInput);
      priceInputElement.removeEventListener('input', onPriceInput);
      window.adPhotoAndUserAvatarLoad.removeListeners();
    };

    var removeMessage = function (element) {
      if (element !== null && element !== undefined) {
        element.remove();
      }
    };

    var removeDocumentListeners = function () {
      document.removeEventListener('keydown', onDocumentKeydownErrorCase);
      document.removeEventListener('keydown', onDocumentKeydownSuccesCase);
      document.removeEventListener('click', onDocumentClickSucccesCase);
      document.removeEventListener('click', onDocumentClickErrorCase);
    };

    var onDocumentKeydownSuccesCase = function (evt) {
      if (evt.key === window.constants.ESC_KEY) {
        removeMessage(document.querySelector('.success'));
        removeDocumentListeners();
      }
    };

    var onDocumentKeydownErrorCase = function (evt) {
      if (evt.key === window.constants.ESC_KEY) {
        removeMessage(document.querySelector('.error'));
        removeDocumentListeners();
      }
    };

    var checkClickEvent = function (evt, selectorMessageText, selectorMessageBlock) {
      var messageText = document.querySelector(selectorMessageText);
      var isClickInside = messageText.contains(evt.target);

      if (!isClickInside) {
        removeMessage(document.querySelector(selectorMessageBlock));
        removeDocumentListeners();
      }

    };

    var onDocumentClickSucccesCase = function (evt) {

      checkClickEvent(evt, '.success__message', '.success');
    };

    var onDocumentClickErrorCase = function (evt) {

      checkClickEvent(evt, '.error__message', '.error');
    };


    var onErrorButtonClick = function () {
      removeMessage(document.querySelector('.error'));
      removeDocumentListeners();
      errorButtonElement.removeEventListener('click', onErrorButtonClick);
    };


    var onSuccess = function () {
      var successMessage = succesTemplate.cloneNode(true);
      main.appendChild(successMessage.querySelector('div'));

      document.addEventListener('keydown', onDocumentKeydownSuccesCase);
      document.addEventListener('click', onDocumentClickSucccesCase);
      setPageDeactive();
    };


    var onError = function () {
      var errorMessage = errorTemplate.cloneNode(true);
      main.appendChild(errorMessage.querySelector('div'));

      document.addEventListener('keydown', onDocumentKeydownErrorCase);
      document.addEventListener('click', onDocumentClickErrorCase);
      errorButtonElement.addEventListener('click', onErrorButtonClick);
    };

    var onFormSubmitted = function (evt) {
      window.request(onSuccess, onError, UPLOAD_URL, UPLOAD_METHOD, new FormData(formElement));
      evt.preventDefault();
    };

    var onResetButtonClicked = function () {
      setPageDeactive();
    };

    resetButtonElement.addEventListener('click', onResetButtonClicked);

    window.adPhotoAndUserAvatarLoad.addListeners();
    window.filter.addListener();
    formElement.addEventListener('submit', onFormSubmitted);
    roomNumberElement.addEventListener('change', onRoomNumberSelectorChanged);
    checkinSelectElement.addEventListener('change', onCheckinTimeSelectorChanged);
    checkoutSelectElement.addEventListener('change', onCheckoutTimeSelectorChanged);
    typeElement.addEventListener('change', onRoomTypeChanged);
    submitButton.addEventListener('click', onSubmitButtonClicked);
    titleInputElement.addEventListener('input', onTitleInput);
    priceInputElement.addEventListener('input', onPriceInput);
  };
})();

