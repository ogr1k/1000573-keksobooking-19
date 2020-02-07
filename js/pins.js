'use strict';

(function () {

  var BUTTON_MAP_PIN_WIDTH = 50;
  var BUTTON_MAP_PIN_HEIGHT = 70;


  var adTemplateElement = document.querySelector('#pin').content;

  window.renderAdPin = function (ad) {
    var adElement = adTemplateElement.cloneNode(true);
    var mapPinStyle = 'left:' + (ad.location.x - (BUTTON_MAP_PIN_WIDTH / 2)) + 'px; top: ' + (ad.location.y - BUTTON_MAP_PIN_HEIGHT) + 'px;';
    adElement.querySelector('img').src = ad.author.avatar;
    adElement.querySelector('img').alt = ad.offer.title;
    adElement.querySelector('.map__pin').style.cssText = mapPinStyle;

    return adElement;
  };

})();
