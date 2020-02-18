'use strict';

(function () {
  var numberOfData = 8;
  var mapWidth = document.querySelector('.map').clientWidth;

  var fragment = document.createDocumentFragment();
  var similarBlock = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPinElement = function (data) {
    var pinElement = similarBlock.cloneNode(true);
    var positioning = 'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
    pinElement.setAttribute('style', positioning);
    pinElement.querySelector('img').setAttribute('src', data.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', data.offer.title);
    fragment.appendChild(pinElement);
  };
  var hidePinElements = function (collection, boolean) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].hidden = boolean;
    }
  };
  var renderPinItem = function (data) {
    for (var i = 0; i < numberOfData; i++) {
      renderPinElement(data[i]);
      window.card.renderPinDetails(data, i);
    }
    document.querySelector('.map__pins').appendChild(fragment);
    hidePinElements((document.querySelectorAll('button[type="button"].map__pin')), true);
  };

  var loadSuccessHandler = function (data) {
    window.data.renderPinItem(data);
  };
  var loadErrorHandler = function (error) {
    var errorMessage = document.createElement('div');
    errorMessage.style = 'position: absolte; width: 100%; background: red; color: #fff; text-align: center;';
    errorMessage.textContent = error;
    document.querySelector('main').before(errorMessage);
  };
  window.backend.load(loadSuccessHandler, loadErrorHandler);

  window.data = {
    renderPinItem: renderPinItem,
    mapWidth: mapWidth,
    hidePinElements: hidePinElements
  };
})();
