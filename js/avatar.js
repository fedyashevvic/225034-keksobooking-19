'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarFileChooser = document.querySelector('#avatar');
  var photosFileChooser = document.querySelector('#images');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photosPreview = document.querySelector('.ad-form__photo img');

  var previewChangeHandler = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (evt.target === avatarFileChooser) {
          avatarPreview.src = reader.result;
        } else {
          photosPreview.src = reader.result;
          photosPreview.hidden = false;
        }
      });
      reader.readAsDataURL(file);
    }
  };
  avatarFileChooser.addEventListener('change', previewChangeHandler);
  photosFileChooser.addEventListener('change', previewChangeHandler);

})();
