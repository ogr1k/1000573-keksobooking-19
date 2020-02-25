'use strict';

(function () {

  var DATA_EXCHANGE_FORMAT = 'json';
  var SUCCESSFULL_REQUEST_CODE = 200;


  window.request = function (onSuccess, onError, url, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = DATA_EXCHANGE_FORMAT;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESSFULL_REQUEST_CODE) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open(method, url);
    xhr.send(data);
  };
})();
