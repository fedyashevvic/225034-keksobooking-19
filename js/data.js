'use strict';

(function () {
  var numberOfData;
  var mapWidth = document.querySelector('.map').clientWidth;
  var fragment = document.createDocumentFragment();
  var similarBlock = document.querySelector('#pin').content.querySelector('.map__pin');
  var newHouseForm = document.querySelector('form.ad-form');
  var resetButton = document.querySelector('button.ad-form__reset');
  var mainBlock = document.querySelector('main');
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeSelect = document.querySelector('#housing-type');
  var advertisments = [];


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
    numberOfData = data.length > 5 ? 5 : data.length;
    var currentPins = document.querySelectorAll('button[type="button"].map__pin');
    currentPins.forEach(function (el) {
      el.remove();
    });
    var currentDetails = document.querySelectorAll('article.map__card.popup');
    currentDetails.forEach(function (el) {
      el.remove();
    });
    for (var i = 0; i < numberOfData; i++) {
      renderPinElement(data[i]);
      window.card.renderPinDetails(data, i);
    }
    document.querySelector('.map__pins').appendChild(fragment);
    hidePinElements((document.querySelectorAll('button[type="button"].map__pin')), true);
  };

  var updatePins = function () {
    var offerType = housingTypeSelect.value;

    if (offerType !== 'any') {
      var similarPins = advertisments.filter(function (it) {
        return it.offer.type === offerType;
      });
      window.data.renderPinItem(similarPins);
    }
    hidePinElements((document.querySelectorAll('button[type="button"].map__pin')), false);
    window.map.openPinDetails();
  };


  mapFiltersForm.addEventListener('change', updatePins);

  var loadSuccessHandler = function (data) {
    advertisments = data;
    window.data.renderPinItem(advertisments);
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

  window.data = {
    renderPinItem: renderPinItem,
    mapWidth: mapWidth,
    hidePinElements: hidePinElements
  };
})();
