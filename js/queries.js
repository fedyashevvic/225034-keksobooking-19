'use strict';
(function () {
  var newHouseForm = document.querySelector('form.ad-form');
  var resetButton = document.querySelector('button.ad-form__reset');
  var mainBlock = document.querySelector('main');
  var avatarPreviewImg = newHouseForm.querySelector('.ad-form-header__preview img');
  var photosPreviewImg = newHouseForm.querySelector('.ad-form__photo img');
  var defailtAvatarSrc = 'img/muffin-grey.svg';
  var errorMessageStyle = 'position: absolte; width: 100%; background: red; color: #fff; text-align: center;';

  var loadSuccessHandler = function (data) {
    window.advertisments = data;
    window.data.renderPinItem(window.advertisments);
  };
  var loadErrorHandler = function (error) {
    var errorMessage = document.createElement('div');
    errorMessage.style = errorMessageStyle;
    errorMessage.textContent = error;
    mainBlock.before(errorMessage);
  };
  window.backend.query(window.backend.GET, window.backend.DATA_URL, loadSuccessHandler, loadErrorHandler);

  var showSuccessScreen = function () {
    resetPageHandler();
    var successWindow = document.querySelector('#success').content.querySelector('div.success').cloneNode(true);
    mainBlock.append(successWindow);
    window.addEventListener('click', function () {
      successWindow.remove();
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ESC) {
        successWindow.remove();
      }
    });
  };

  var showErrorScreen = function () {
    resetPageHandler();
    var errorWindow = document.querySelector('#error').content.querySelector('div.error').cloneNode(true);
    mainBlock.append(errorWindow);
    window.addEventListener('click', function (evt) {
      if (evt.target !== document.querySelector('.error__message')) {
        errorWindow.remove();
      }
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ESC) {
        errorWindow.remove();
      }
    });
  };

  newHouseForm.addEventListener('submit', function (evt) {
    window.backend.query(window.backend.POST, window.backend.DATA_SEND_URL, showSuccessScreen, showErrorScreen, new FormData(newHouseForm));
    evt.preventDefault();
  });

  var resetPageHandler = function () {
    window.data.mapFiltersForm.reset();
    newHouseForm.reset();
    avatarPreviewImg.src = defailtAvatarSrc;
    photosPreviewImg.hidden = true;
    window.data.updatePins();
    window.activation.disablePage();
  };

  resetButton.addEventListener('click', resetPageHandler);

})();
