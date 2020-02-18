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
        onError('Сервер недоступен, попробуйте позже!');
      }
    });
    xhr.addEventListener('error', function () {
      onError('К сожалению, произошел сбой сети, проверьте подключение к интернету!');
    });
    xhr.addEventListener('timeout', function () {
      onError('К сожалению, запрос не успел выполнится, обновите страницу.');
    });

    xhr.timeout = 10000;
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  window.backend = {
    load: load,
  };
})();
