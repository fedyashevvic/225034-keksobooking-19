'use strict';

var ACTIVE_PIN_HEIGHT = 84;
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

var similarBlock = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var formInputs = document.querySelectorAll('.ad-form fieldset');
var filtersFormInputes = document.querySelectorAll('.map__filters input');
var filtersFormSelects = document.querySelectorAll('.map__filters select');
var mainPin = document.querySelector('.map__pin--main');
var mainPinWidth = (mainPin.clientWidth / 2);
var mainPinHeight = (mainPin.clientHeight / 2);
var roomSelect = document.querySelector('#room_number');
var capasitySelect = document.querySelector('#capacity');

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
  }
  document.querySelector('.map__pins').appendChild(fragment);
};

generateBookingData();


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

var submitCheckSelect = function () {
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

capasitySelect.addEventListener('change', submitCheckSelect);
roomSelect.addEventListener('change', submitCheckSelect);
