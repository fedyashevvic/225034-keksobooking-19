'use strict';

(function () {
  var titleInput = document.querySelector('input#title');
  var roomSelect = document.querySelector('#room_number');
  var capasitySelect = document.querySelector('#capacity');
  var apartmentTypeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var checkInSelect = document.querySelector('#timein');
  var checkOutSelect = document.querySelector('#timeout');
  var NumberOfRoomsTemplate = {
    one: 'При данном кол-ве комнат поместится только 1 человек',
    two: 'При данном кол-ве комнат поместится до 2х человек',
    three: 'При данном кол-ве комнат поместится до 3х человек',
    other: 'При данном кол-ве комнат, допустим только вариант "Не для гостей"',
    zeroNum: '0',
    oneNum: '1',
    twoNum: '2',
    threeNum: '3',
    handredNum: '100'
  };
  var PriceTemplate = {
    bungalo: 'bungalo',
    flat: 'flat',
    house: 'house',
    palace: 'palace',
    min: 'min',
    placeholder: 'placeholder',
    zeroPrice: '0',
    thousandPrice: '1000',
    fiveThousandPrice: '5000',
    tenThousandPrice: '10000',
  };

  var numberOfRoomsHandler = function () {
    var valid = true;
    if (roomSelect.value === NumberOfRoomsTemplate.oneNum && capasitySelect.value !== NumberOfRoomsTemplate.oneNum) {
      capasitySelect.setCustomValidity(NumberOfRoomsTemplate.one);
      valid = false;
    } else if (roomSelect.value === NumberOfRoomsTemplate.twoNum && (capasitySelect.value === NumberOfRoomsTemplate.threeNum || capasitySelect.value === NumberOfRoomsTemplate.zeroNum)) {
      capasitySelect.setCustomValidity(NumberOfRoomsTemplate.two);
      valid = false;
    } else if (roomSelect.value === NumberOfRoomsTemplate.threeNum && capasitySelect.value === NumberOfRoomsTemplate.zeroNum) {
      capasitySelect.setCustomValidity(NumberOfRoomsTemplate.three);
      valid = false;
    } else if (roomSelect.value === NumberOfRoomsTemplate.handredNum && capasitySelect.value !== NumberOfRoomsTemplate.zeroNum) {
      capasitySelect.setCustomValidity(NumberOfRoomsTemplate.other);
      valid = false;
    } else {
      capasitySelect.setCustomValidity('');
    }
    return valid;
  };

  capasitySelect.addEventListener('change', numberOfRoomsHandler);
  roomSelect.addEventListener('change', numberOfRoomsHandler);

  var minPriceHandler = function () {
    if (apartmentTypeSelect.value === PriceTemplate.bungalo) {
      priceInput.setAttribute(PriceTemplate.min, PriceTemplate.zeroPrice);
    } else if (apartmentTypeSelect.value === PriceTemplate.flat) {
      priceInput.setAttribute(PriceTemplate.min, PriceTemplate.thousandPrice);
    } else if (apartmentTypeSelect.value === PriceTemplate.house) {
      priceInput.setAttribute(PriceTemplate.min, PriceTemplate.fiveThousandPrice);
      priceInput.setAttribute(PriceTemplate.placeholder, PriceTemplate.fiveThousandPrice);
    } else if (apartmentTypeSelect.value === PriceTemplate.palace) {
      priceInput.setAttribute(PriceTemplate.min, PriceTemplate.tenThousandPrice);
      priceInput.setAttribute(PriceTemplate.placeholder, PriceTemplate.tenThousandPrice);
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

  var validateForm = function (condition, el) {
    if (condition) {
      el.style.border = '2px solid red';
      el.addEventListener('mousedown', function () {
        el.style.border = '1px solid #d9d9d3';
      });
    }
  };

  var validationHandler = function () {
    var minTitleInputLength = titleInput.getAttribute('minlength');
    var minInputPrice = priceInput.getAttribute('min');
    var maxInputPrice = priceInput.getAttribute('max');

    validateForm(titleInput.value.length < minTitleInputLength, titleInput);
    validateForm(numberOfRoomsHandler() === false, capasitySelect);
    validateForm(priceInput.valueAsNumber < minInputPrice || priceInput.valueAsNumber > maxInputPrice || !priceInput.value, priceInput);
  };

  document.querySelector('.ad-form__submit').addEventListener('click', validationHandler);

})();
