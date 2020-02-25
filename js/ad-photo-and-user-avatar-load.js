'use strict';

(function () {

  var photoChooserElement = document.querySelector('#images');
  var previewPhotoElement = document.querySelector('.ad-form__photo');
  var avatarChooserElement = document.querySelector('#avatar');
  var previewAvatarElement = document.querySelector('.ad-form-header__preview');

  var loadPhoto = function (elementPreview, elementChooser) {
    var file = elementChooser.files[0];
    var reader = new FileReader();

    var onReaderLoaded = function () {
      elementPreview.querySelector('img').src = reader.result;
      elementPreview.querySelector('img').hidden = false;
      reader.removeEventListener('load', onReaderLoaded);
    };

    reader.addEventListener('load', onReaderLoaded);

    reader.readAsDataURL(file);
  };

  var onPhotoChooserChanged = function () {

    loadPhoto(previewPhotoElement, photoChooserElement);

  };

  var onAvatarChooserChanged = function () {

    loadPhoto(previewAvatarElement, avatarChooserElement);

  };


  window.adPhotoAndUserAvatarLoad = {
    addListeners: function () {
      avatarChooserElement.addEventListener('change', onAvatarChooserChanged);
      photoChooserElement.addEventListener('change', onPhotoChooserChanged);
    },
    removeListeners: function () {
      avatarChooserElement.removeEventListener('change', onAvatarChooserChanged);
      photoChooserElement.removeEventListener('change', onPhotoChooserChanged);
    }
  };

})();
