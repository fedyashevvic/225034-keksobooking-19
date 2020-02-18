'use strict';

(function () {
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
      window.card.renderPinDetails(bookingData, i);
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };

  generateBookingData();

  window.data = {
    bookingData: bookingData,
    renderPinItem: renderPinItem,
    mapWidth: mapWidth
  };
})();
