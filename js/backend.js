'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var DATA_SEND_URL = 'https://js.dump.academy/keksobooking';
  var GET = 'GET';
  var POST = 'POST';
  var CODE_SUCCESS = 200;
  var TIMEOUT_LIMIT = 10000;
  var ErrorMessage = {
    error: 'Сервер недоступен, попробуйте позже!',
    internetError: 'К сожалению, произошел сбой сети, проверьте подключение к интернету!',
    timeoutError: 'К сожалению, запрос не успел выполнится, обновите страницу.'
  };

  var query = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError(ErrorMessage.error);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ErrorMessage.internetError);
    });
    xhr.addEventListener('timeout', function () {
      onError(ErrorMessage.timeoutError);
    });

    xhr.timeout = TIMEOUT_LIMIT;
    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    query: query,
    DATA_URL: DATA_URL,
    DATA_SEND_URL: DATA_SEND_URL,
    GET: GET,
    POST: POST
  };
})();
