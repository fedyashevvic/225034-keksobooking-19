'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var DATA_SEND_URL = 'https://js.dump.academy/keksobooking';
  var CODE_SUCCESS = 200;
  var TIMEOUT_LIMIT = 10000;

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

    xhr.timeout = TIMEOUT_LIMIT;
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Сервер недоступен, попробуйте позже!');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка сети, попробуйте позже!');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос занял слишком много времени, проверьте скорость Вашего соединения!');
    });

    xhr.timeout = TIMEOUT_LIMIT;
    xhr.open('POST', DATA_SEND_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
