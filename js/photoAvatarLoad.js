'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var photoChooserElement = document.querySelector('#images');
  var previewPhotoElement = document.querySelector('.ad-form__photo');
  var avatarChooserElement = document.querySelector('#avatar');
  var previewAvatarElement = document.querySelector('.ad-form-header__preview');
  var file;
  var matches;

  var checkFileTypes = function (element) {
    file = element.files[0];
    var fileName = file.name.toLowerCase();

    matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var onPhotoChooserChanged = function () {

    checkFileTypes(photoChooserElement);


    if (matches !== undefined) {
      var reader = new FileReader();

      var onPhotoReaderLoaded = function () {
        previewPhotoElement.querySelector('img').src = reader.result;
        previewPhotoElement.querySelector('img').hidden = false;
        reader.removeEventListener('load', onPhotoReaderLoaded);
      };

      reader.addEventListener('load', onPhotoReaderLoaded);

      reader.readAsDataURL(file);
      file = undefined;
      matches = undefined;
    }
  };

  var onAvatarChooserChanged = function () {

    checkFileTypes(avatarChooserElement);

    if (matches !== undefined) {
      var reader = new FileReader();

      var onAvatarReaderLoaded = function () {
        previewAvatarElement.querySelector('img').src = reader.result;
        reader.removeEventListener('load', onAvatarReaderLoaded);
      };

      reader.addEventListener('load', onAvatarReaderLoaded);

      reader.readAsDataURL(file);
      file = undefined;
      matches = undefined;
    }
  };


  window.photoAvatarLoad = {
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
