'use strict';

var numberOfData = 8;
var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var titles = ['Уютный дом', 'Новая квартира', 'Прямо в центре города', 'Пентхаус в небоскребе', 'Двухкомнатная квартира после ремонта', 'Студия в новостройке', 'Большая квартира у метро', 'Квартира для кодеров'];
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
var similarPinDetailsBlock = document.querySelector('#card').content.querySelector('.map__card');
var fragment = document.createDocumentFragment();

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

generateBookingData();
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
  document.querySelector('.map').classList.remove('map--faded');
};

var renderPinDetails = function (data, key) {
  var pinDetailsElement = similarPinDetailsBlock.cloneNode(true);
  pinDetailsElement.querySelector('.popup__title').textContent = data[key].offer.title;
  pinDetailsElement.querySelector('.popup__text--address').textContent = data[key].offer.address;
  pinDetailsElement.querySelector('.popup__text--price').textContent = data[key].offer.price + '₽/ночь';
  switch (data[key].type) {
    case 'flat':
      pinDetailsElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalo':
      pinDetailsElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      pinDetailsElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'palace':
      pinDetailsElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
  }
  pinDetailsElement.querySelector('.popup__text--capacity').textContent = data[key].offer.rooms + ' комнаты для ' + data[key].offer.guests + ' гостей.';
  pinDetailsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data[key].offer.checkin + ', выезд до ' + data[key].offer.checkout + '.';
  pinDetailsElement.querySelector('.popup__description').textContent = data[key].offer.description;
  pinDetailsElement.querySelector('.popup__photos').querySelector('img').setAttribute('src', data[key].offer.photos[0]);
  for (var i = 1; i < data[key].offer.photos.length; i++) {
    var photo = pinDetailsElement.querySelector('.popup__photos').cloneNode(true);
    photo.querySelector('img').setAttribute('src', data[key].offer.photos[i]);
    pinDetailsElement.appendChild(photo);
  }
  pinDetailsElement.querySelector('.popup__avatar').setAttribute('src', data[key].author.avatar);
  document.querySelector('.map__filters-container').before(pinDetailsElement);
};

renderPinItem(bookingData);
renderPinDetails(bookingData, 0);

