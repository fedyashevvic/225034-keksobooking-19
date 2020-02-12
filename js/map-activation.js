'use strict';

(function () {
  var formInputs = document.querySelectorAll('.ad-form fieldset');
  var filtersFormInputes = document.querySelectorAll('.map__filters input');
  var filtersFormSelects = document.querySelectorAll('.map__filters select');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinWidth = (mainPin.clientWidth / 2);
  var mainPinHeight = (mainPin.clientHeight / 2);

  var mainPinPosition = function (x, y) {
    var currentPinPosition = Math.round((mainPin.offsetLeft + (x))) + '; ' + Math.round((mainPin.offsetTop + (y)));
    document.querySelector('input#address').value = currentPinPosition;
  };


  var changeInputsCondition = function (collection, boolean) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = boolean;
    }
  };

  var disablePage = function () {
    changeInputsCondition(formInputs, true);
    changeInputsCondition(filtersFormInputes, true);
    changeInputsCondition(filtersFormSelects, true);
    mainPinPosition(mainPinWidth, mainPinHeight);
  };
  disablePage();

  var activatePage = function () {
    window.data.renderPinItem(window.data.bookingData);
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
    mainPin: mainPin
  };
})();
