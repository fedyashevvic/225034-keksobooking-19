'use strict';
(function () {
  var PriceFilterRange = {
    low: 'low',
    middle: 'middle',
    high: 'high',
    lowLimit: 10000,
    highLimit: 50000
  };
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var housingFeaturesCheckboxes = document.querySelectorAll('#housing-features input');

  var isSimilar = function (type, field, arr) {
    if (type !== 'any') {
      arr = arr.filter(function (it) {
        return it.offer[field] === (isNaN(type) ? type : parseInt(type, 10));
      });
    }
    return arr;
  };

  var applyFilters = function () {
    var offerType = housingTypeSelect.value;
    var priceFilter = housingPriceSelect.value;
    var roomsFilter = housingRoomsSelect.value;
    var guestsFilter = housingGuestsSelect.value;
    var similarPins = window.advertisments;

    similarPins = isSimilar(offerType, 'type', similarPins);
    similarPins = isSimilar(roomsFilter, 'rooms', similarPins);
    similarPins = isSimilar(guestsFilter, 'guests', similarPins);

    for (var i = 0; i < housingFeaturesCheckboxes.length; i++) {
      if (housingFeaturesCheckboxes[i].checked) {
        similarPins = similarPins.filter(function (it) {
          return it.offer.features.includes(housingFeaturesCheckboxes[i].value);
        });
      }
    }

    switch (priceFilter) {
      case PriceFilterRange.low:
        similarPins = similarPins.filter(function (it) {
          return it.offer.price < PriceFilterRange.lowLimit;
        });
        break;
      case PriceFilterRange.middle:
        similarPins = similarPins.filter(function (it) {
          return it.offer.price > PriceFilterRange.lowLimit && it.offer.price < PriceFilterRange.highLimit;
        });
        break;
      case PriceFilterRange.high:
        similarPins = similarPins.filter(function (it) {
          return it.offer.price > PriceFilterRange.highLimit;
        });
        break;
    }
    return similarPins;
  };

  window.filter = {
    applyFilters: applyFilters,
  };
})();
