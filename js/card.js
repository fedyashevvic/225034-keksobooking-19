'use strict';

(function () {
  var ApartmentType = {
    flat: 'flat',
    flatCyr: 'Квартира',
    bungalo: 'bungalo',
    bungaloCyr: 'Бунгало',
    house: 'house',
    houseCyr: 'Дом',
    palace: 'palace',
    palaceCyr: 'Дворец'
  };
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
      case ApartmentType.flat:
        key.textContent = ApartmentType.flatCyr;
        break;
      case ApartmentType.bungalo:
        key.textContent = ApartmentType.bungaloCyr;
        break;
      case ApartmentType.house:
        key.textContent = ApartmentType.houseCyr;
        break;
      case ApartmentType.palace:
        key.textContent = ApartmentType.palaceCyr;
        break;
      default:
        hideElement(key);
    }
  };

  var setPhotos = function (data, key, parent) {
    if (data) {
      data.forEach(function (image) {
        var photo = parent.querySelector('.popup__photos').cloneNode(true);
        photo.querySelector('img').setAttribute('src', image);
        parent.appendChild(photo);
      });
      parent.querySelector('.popup__photos').querySelector('img').remove();
    }
  };

  var setFeatures = function (data, key, parent) {
    key.forEach(function (el) {
      el.remove();
    });
    if (data) {
      data.forEach(function (feature) {
        var newFeature = document.createElement('li');
        var currentClass = 'popup__feature--' + feature;
        newFeature.classList.add('popup__feature', currentClass);
        parent.querySelector('.popup__features').appendChild(newFeature);
      });
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

  window.card = {
    renderPinDetails: renderPinDetails,
  };
})();
