'use strict';

(function () {
  var roomSelect = document.querySelector('#room_number');
  var capasitySelect = document.querySelector('#capacity');
  var apartmentTypeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var checkInSelect = document.querySelector('#timein');
  var checkOutSelect = document.querySelector('#timeout');


  var numberOfRoomsHandler = function () {
    if (roomSelect.value === '1' && capasitySelect.value !== '1') {
      capasitySelect.setCustomValidity('При данном кол-ве комнат поместится только 1 человек');
    } else if (roomSelect.value === '2' && (capasitySelect.value === '3' || capasitySelect.value === '0')) {
      capasitySelect.setCustomValidity('При данном кол-ве комнат поместится до 2х человек');
    } else if (roomSelect.value === '3' && capasitySelect.value === '0') {
      capasitySelect.setCustomValidity('При данном кол-ве комнат поместится до 3х человек');
    } else if (roomSelect.value === '100' && capasitySelect.value !== '0') {
      capasitySelect.setCustomValidity('При данном кол-ве комнат, допустим только вариант "Не для гостей"');
    } else {
      capasitySelect.setCustomValidity('');
    }
  };

  capasitySelect.addEventListener('change', numberOfRoomsHandler);
  roomSelect.addEventListener('change', numberOfRoomsHandler);

  var minPriceHandler = function () {
    if (apartmentTypeSelect.value === 'bungalo') {
      priceInput.setAttribute('min', '0');
    } else if (apartmentTypeSelect.value === 'flat') {
      priceInput.setAttribute('min', '1000');
    } else if (apartmentTypeSelect.value === 'house') {
      priceInput.setAttribute('min', '5000');
      priceInput.setAttribute('placeholder', '5000');
    } else if (apartmentTypeSelect.value === 'palace') {
      priceInput.setAttribute('min', '10000');
      priceInput.setAttribute('placeholder', '10000');
    }
  };

  apartmentTypeSelect.addEventListener('change', minPriceHandler);

  var checkInOutTimesHandler = function (evt) {
    if (checkInSelect.value !== checkOutSelect.value) {
      checkInSelect.value = evt.target.value;
      checkOutSelect.value = evt.target.value;
    }
  };

  checkInSelect.addEventListener('change', checkInOutTimesHandler);
  checkOutSelect.addEventListener('change', checkInOutTimesHandler);

  var validateForm = function (el) {
    if (!el.value) {
      el.style.border = '2px solid red';
      el.addEventListener('mousedown', function () {
        el.style.border = '1px solid #d9d9d3';
      });
    }
  };

  var validationHandler = function () {
  };

  document.querySelector('.ad-form__submit').addEventListener('click', validationHandler);

})();
