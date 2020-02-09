(function () {
  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    window.ads = xhr.response;
  });

  xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
  xhr.send();

  window.ads = [];
})();
