'use strict';
(function () {
  var newHouseForm = document.querySelector('form.ad-form');
  var resetButton = document.querySelector('button.ad-form__reset');
  var mainBlock = document.querySelector('main');

  var loadSuccessHandler = function (data) {
    window.advertisments = data;
    window.data.renderPinItem(window.advertisments);
  };
  var loadErrorHandler = function (error) {
    var errorMessage = document.createElement('div');
    errorMessage.style = 'position: absolte; width: 100%; background: red; color: #fff; text-align: center;';
    errorMessage.textContent = error;
    mainBlock.before(errorMessage);
  };
  window.backend.load(loadSuccessHandler, loadErrorHandler);

  var showSuccessScreen = function () {
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
  var dataSendSuccess = function () {
    newHouseForm.reset();
    window.activation.disablePage();
    showSuccessScreen();
  };
  var dataSendFormError = function () {
    newHouseForm.reset();
    window.activation.disablePage();
    showErrorScreen();
  };
  newHouseForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(newHouseForm), dataSendSuccess, dataSendFormError);
    evt.preventDefault();
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    newHouseForm.reset();
    window.activation.disablePage();
  });

})();
