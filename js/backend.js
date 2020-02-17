'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var CODE_SUCCESS = 200;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Сервер недоступен, попробуйте позднее!');
      }
    });
    xhr.addEventListener('error', function () {
      onError(500);
    });
    xhr.addEventListener('timeout', function () {
      onError(300);
    });

    xhr.timeout = 10000;
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  var loadSuccessHandler = function (data) {
    window.data.renderPinItem(data);
  };

  load(loadSuccessHandler);

})();
