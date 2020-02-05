'use strict';

var numberOfData = 8;
var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var titles = [undefined, 'Новая квартира', 'Прямо в центре города', 'Пентхаус в небоскребе', 'Двухкомнатная квартира после ремонта', 'Студия в новостройке', 'Большая квартира у метро', 'Квартира для кодеров'];
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

var hideElement = function (el) {
  el.style.display = 'none';
};

var setNewData = function (data, key) {
  if (data) {
    key.textContent = data;
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

  setNewData(data[key].offer.title, title);
  setNewData(data[key].offer.address, address);
  setNewData(data[key].offer.price, price);
  price.textContent += '₽/ночь';

  defineApartnemtType(data[key].offer.type, type);

  setNewData(data[key].offer.rooms, houseCapasity);
  setNewData(data[key].offer.guests, houseCapasity);
  houseCapasity.textContent = data[key].offer.rooms + ' комнаты для ' + data[key].offer.guests + ' гостей.';

  setNewData(data[key].offer.checkin, checkInTime);
  checkInTime.textContent = 'Заезд после ' + data[key].offer.checkin + ', выезд до ' + data[key].offer.checkout + '.';

  setFeatures(data[key].offer.features, featuresItems, pinDetailsElement);

  setNewData(data[key].offer.description, description);

  setPhotos(data[key].offer.photos, apartPhotos, pinDetailsElement);

  setNewData(data[key].author.avatar, avatar);
  avatar.setAttribute('src', data[key].author.avatar);

  document.querySelector('.map__filters-container').before(pinDetailsElement);
};

generateBookingData();
renderPinItem(bookingData);
renderPinDetails(bookingData, 0);

