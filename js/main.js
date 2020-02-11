'use strict';

<<<<<<< HEAD
(function () {
  var ACTIVE_PIN_HEIGHT = 84;
  var ESC = 'Escape';
  var ENTER = 'Enter';

  window.utils = {
    ACTIVE_PIN_HEIGHT: ACTIVE_PIN_HEIGHT,
    ESC: ESC,
    ENTER: ENTER
  };
})();
=======
// utils

var ACTIVE_PIN_HEIGHT = 84;
var ESC = 'Escape';


// arra data rendering

var numberOfData = 8;
var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var titles = ['Лучшая квартира в городе', 'Новая квартира', 'Прямо в центре города', 'Пентхаус в небоскребе', 'Двухкомнатная квартира после ремонта', 'Студия в новостройке', 'Большая квартира у метро', 'Квартира для кодеров'];
var prices = [300, 400, 500, 600, 700, 800, 900];
var types = ['palace', 'flat', 'house', 'bungalo'];
var rooms = [1, 2, 3, 4, 5];
var checkInOutTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapWidth = document.querySelector('.map').clientWidth;
var pinWidth = 25;
var pinHeight = 70;
var bookingData = [];
var fragment = document.createDocumentFragment();
var similarBlock = document.querySelector('#pin').content.querySelector('.map__pin');

var getRamdomElement = function (arr) {
  var elNum = Math.round(Math.random() * (arr.length - 1));
  return arr[elNum];
};

var getRandomUniqueElement = function (arr) {
  var elNum = Math.round(Math.random() * (arr.length - 1));
  var currEl = arr[elNum];
  arr.splice(elNum, 1);
  return currEl;
};

var getRandomArray = function (arr) {
  var oldArr = arr.slice().sort();
  var newArr = [];
  var numberOfFeatures = Math.round(Math.random() * (oldArr.length - 1));
  for (var j = 0; j <= numberOfFeatures; j++) {
    var currentIndex = Math.round(Math.random() * (oldArr.length - 1));
    newArr.push(oldArr[currentIndex]);
    oldArr.splice(currentIndex, 1);
  }
  return newArr;
};

var getLocationObj = function (yFirstPosition, ySecondPositions) {
  var location = {
    'x': Math.round(Math.random() * mapWidth - pinWidth),
    'y': Math.round((Math.random() * (ySecondPositions - yFirstPosition) + yFirstPosition) - pinHeight),
  };
  return location;
};

var generateBookingData = function () {
  for (var i = 0; i < numberOfData; i++) {
    var location = getLocationObj(130, 630);
    var currentData = {
      author: {
        avatar: 'img/avatars/user' + getRandomUniqueElement(avatars) + '.png',
      },
      offer: {
        title: getRandomUniqueElement(titles),
        address: location.x + ', ' + location.y,
        price: getRamdomElement(prices),
        type: getRamdomElement(types),
        rooms: getRamdomElement(rooms),
        guests: getRamdomElement(rooms),
        checkin: getRamdomElement(checkInOutTimes),
        checkout: getRamdomElement(checkInOutTimes),
        features: getRandomArray(features),
        description: getRamdomElement(titles),
        photos: getRandomArray(photos),
      },
      location: location,
    };
    bookingData.push(currentData);
  }
};

var renderPinElement = function (data) {
  var pinElement = similarBlock.cloneNode(true);
  var positioning = 'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
  pinElement.setAttribute('style', positioning);
  pinElement.querySelector('img').setAttribute('src', data.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', data.offer.title);
  fragment.appendChild(pinElement);
};


var renderPinItem = function (data) {
  for (var i = 0; i < numberOfData; i++) {
    renderPinElement(data[i]);
    renderPinDetails(bookingData, i);
  }
  document.querySelector('.map__pins').appendChild(fragment);
};

generateBookingData();

// page activation

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
  renderPinItem(bookingData);
  mainPinPosition(mainPinWidth, ACTIVE_PIN_HEIGHT);
  changeInputsCondition(formInputs, false);
  changeInputsCondition(filtersFormInputes, false);
  changeInputsCondition(filtersFormSelects, false);
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  openPinDetails();
};

// map and pin details

var openPinDetails = function () {
  var pins = document.querySelectorAll('button[type="button"].map__pin');
  var cards = document.querySelectorAll('.map__card');
  var openedCard;

  for (var i = 0; i < pins.length; i++) {
    (function (pin, card) {
      pin.addEventListener('click', function () {
        if (openedCard) {
          openedCard.classList.add('hidden');
        }
        card.classList.remove('hidden');
        openedCard = card;
        openedCard.querySelector('button.popup__close').addEventListener('click', function () {
          openedCard.classList.add('hidden');
        });
        document.addEventListener('keydown', function (evt) {
          if (evt.key === ESC) {
            openedCard.classList.add('hidden');
          }
        });
      });
    })(pins[i], cards[i]);
  }
};
mainPin.addEventListener('mousedown', function (evt) {
  if (!evt.button) {
    activatePage();
  }
});
mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
});

// card rendering
var similarPinDetailsBlock = document.querySelector('#card').content.querySelector('.map__card');

var hideElement = function (el) {
  el.style.display = 'none';
};

var setNewData = function (data, key, addText) {
  if (data) {
    key.textContent = addText;
  } else {
    hideElement(key);
  }
};

var defineApartnemtType = function (data, key) {
  switch (data) {
    case 'flat':
      key.textContent = 'Квартира';
      break;
    case 'bungalo':
      key.textContent = 'Бунгало';
      break;
    case 'house':
      key.textContent = 'Дом';
      break;
    case 'palace':
      key.textContent = 'Дворец';
      break;
    default:
      key.style.display = 'none';
  }
};

var setPhotos = function (data, key, parent) {
  if (data) {
    key.querySelector('img').setAttribute('src', data[0]);
    for (var i = 1; i < data.length; i++) {
      var photo = parent.querySelector('.popup__photos').cloneNode(true);
      photo.querySelector('img').setAttribute('src', data[i]);
      parent.appendChild(photo);
    }
  } else {
    hideElement(key);
  }
};

var setFeatures = function (data, key, parent) {
  for (var j = 0; j < key.length; j++) {
    key[j].remove();
  }
  if (data) {
    for (var k = 0; k < data.length; k++) {
      var newFeature = document.createElement('li');
      var currentClass = 'popup__feature--' + data[k];
      newFeature.classList.add('popup__feature', currentClass);
      parent.querySelector('.popup__features').appendChild(newFeature);
    }
  }
};

var setAvatar = function (data, key) {
  if (data) {
    key.setAttribute('src', data);
  } else {
    hideElement(key);
  }
};

var renderPinDetails = function (data, key) {
  var pinDetailsElement = similarPinDetailsBlock.cloneNode(true);
  var title = pinDetailsElement.querySelector('.popup__title');
  var address = pinDetailsElement.querySelector('.popup__text--address');
  var price = pinDetailsElement.querySelector('.popup__text--price');
  var type = pinDetailsElement.querySelector('.popup__type');
  var houseCapasity = pinDetailsElement.querySelector('.popup__text--capacity');
  var checkInTime = pinDetailsElement.querySelector('.popup__text--time');
  var featuresItems = pinDetailsElement.querySelector('.popup__features').querySelectorAll('li');
  var description = pinDetailsElement.querySelector('.popup__description');
  var apartPhotos = pinDetailsElement.querySelector('.popup__photos');
  var avatar = pinDetailsElement.querySelector('.popup__avatar');
  var priceTextContent = data[key].offer.price + '₽/ночь';
  var checkInTimeTextContent = 'Заезд после ' + data[key].offer.checkin + ', выезд до ' + data[key].offer.checkout + '.';
  var houseCapasityTextContent = data[key].offer.rooms + ' комнаты для ' + data[key].offer.guests + ' гостей.';

  setNewData(data[key].offer.title, title, data[key].offer.title);
  setNewData(data[key].offer.address, address, data[key].offer.address);
  setNewData(data[key].offer.price, price, priceTextContent);
  defineApartnemtType(data[key].offer.type, type);
  setNewData(data[key].offer.rooms, houseCapasity);
  setNewData(data[key].offer.guests, houseCapasity, houseCapasityTextContent);
  setNewData(data[key].offer.checkin, checkInTime, checkInTimeTextContent);
  setFeatures(data[key].offer.features, featuresItems, pinDetailsElement);
  setNewData(data[key].offer.description, description, data[key].offer.description);
  setPhotos(data[key].offer.photos, apartPhotos, pinDetailsElement);
  setAvatar(data[key].author.avatar, avatar);
  pinDetailsElement.classList.add('hidden');

  document.querySelector('.map__filters-container').before(pinDetailsElement);
};

// form validation
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
>>>>>>> 4-2 done
