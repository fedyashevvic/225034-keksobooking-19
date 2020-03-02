'use strict';

(function () {
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var housingFeaturesCheckboxes = document.querySelectorAll('#housing-features input');

  var applyFilters = function () {
    var offerType = housingTypeSelect.value;
    var priceFilter = housingPriceSelect.value;
    var roomsFilter = housingRoomsSelect.value;
    var guestsFilter = housingGuestsSelect.value;
    var similarPins = window.advertisments;

    for (var i = 0; i < housingFeaturesCheckboxes.length; i++) {
      if (housingFeaturesCheckboxes[i].checked) {
        similarPins = similarPins.filter(function (it) {
          return it.offer.features.includes(housingFeaturesCheckboxes[i].value);
        });
      }
    }

    if (offerType !== 'any') {
      similarPins = similarPins.filter(function (it) {
        return it.offer.type === offerType;
      });
    }

    if (roomsFilter !== 'any') {
      similarPins = similarPins.filter(function (it) {
        return it.offer.rooms === parseInt(roomsFilter, 10);
      });
    }

    if (guestsFilter !== 'any') {
      similarPins = similarPins.filter(function (it) {
        return it.offer.guests === parseInt(guestsFilter, 10);
      });
    }

    switch (priceFilter) {
      case 'low':
        similarPins = similarPins.filter(function (it) {
          return it.offer.price < 10000;
        });
        break;
      case 'middle':
        similarPins = similarPins.filter(function (it) {
          return it.offer.price > 10000 && it.offer.price < 50000;
        });
        break;
      case 'high':
        similarPins = similarPins.filter(function (it) {
          return it.offer.price > 50000;
        });
        break;
    }
    return similarPins;
  };

  window.filter = {
    applyFilters: applyFilters,
  };
})();
