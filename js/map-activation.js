'use strict';

(function () {
  var formInputs = document.querySelectorAll('.ad-form fieldset');
  var filtersFormSelects = document.querySelectorAll('.map__filters select');
  var filtersFormFieldsets = document.querySelectorAll('.map__filters fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  var mainForm = document.querySelector('.ad-form');
  var mapElement = document.querySelector('.map');
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
    var renderedPins = document.querySelectorAll('button[type="button"].map__pin');
    window.data.hidePinElements(renderedPins, true);
    changeInputsCondition(formInputs, true);
    changeInputsCondition(filtersFormSelects, true);
    changeInputsCondition(filtersFormFieldsets, true);
    mainPin.setAttribute('style', 'left:' + defaultPositions.x + '; top:' + defaultPositions.y);
    mainPinPosition(mainPinWidth, mainPinHeight);
    mapElement.classList.add('map--faded');
    mainForm.classList.add('ad-form--disabled');
  };
  disablePage();

  var activatePage = function () {
    var renderedPins = document.querySelectorAll('button[type="button"].map__pin');
    if (renderedPins.length) {
      changeInputsCondition(filtersFormSelects, false);
      changeInputsCondition(filtersFormFieldsets, false);
      window.data.hidePinElements(renderedPins, false);
    }
    mainPinPosition(mainPinWidth, window.utils.ACTIVE_PIN_HEIGHT);
    changeInputsCondition(formInputs, false);
    mapElement.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
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
