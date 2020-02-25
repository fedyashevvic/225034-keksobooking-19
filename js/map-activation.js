'use strict';

(function () {
  var formInputs = document.querySelectorAll('.ad-form fieldset');
  var filtersFormInputes = document.querySelectorAll('.map__filters input');
  var filtersFormSelects = document.querySelectorAll('.map__filters select');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.clientWidth / 2;
  var mainPinHeight = mainPin.clientHeight / 2;
  var computedStyle = getComputedStyle(mainPin);
  var defaultPositions = {
    x: computedStyle.left,
    y: computedStyle.top
  };

  var mainPinPosition = function (x, y) {
    var currentPinPosition = Math.floor((mainPin.offsetLeft + (x))) + '; ' + Math.round((mainPin.offsetTop + (y)));
    document.querySelector('input#address').value = currentPinPosition;
  };
  var changeInputsCondition = function (collection, boolean) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = boolean;
    }
  };

  var disablePage = function () {
    window.data.hidePinElements((document.querySelectorAll('button[type="button"].map__pin')), true);
    changeInputsCondition(formInputs, true);
    changeInputsCondition(filtersFormInputes, true);
    changeInputsCondition(filtersFormSelects, true);
    mainPin.setAttribute('style', 'left:' + defaultPositions.x + '; top:' + defaultPositions.y);
    mainPinPosition(mainPinWidth, mainPinHeight);
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
  };
  disablePage();

  var activatePage = function () {
    window.data.hidePinElements((document.querySelectorAll('button[type="button"].map__pin')), false);
    mainPinPosition(mainPinWidth, window.utils.ACTIVE_PIN_HEIGHT);
    changeInputsCondition(formInputs, false);
    changeInputsCondition(filtersFormInputes, false);
    changeInputsCondition(filtersFormSelects, false);
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.map.openPinDetails();
  };

  window.activation = {
    activatePage: activatePage,
    disablePage: disablePage,
    mainPin: mainPin,
    mainPinWidth: mainPinWidth,
    mainPinPosition: mainPinPosition
  };
})();
