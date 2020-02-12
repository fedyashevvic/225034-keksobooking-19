'use strict';

(function () {
  var positionLimits = {
    xLeft: -window.activation.mainPinWidth,
    xRight: (window.data.mapWidth - window.activation.mainPinWidth),
    yTop: 130 - window.utils.ACTIVE_PIN_HEIGHT,
    yBottom: 630 - window.utils.ACTIVE_PIN_HEIGHT
  };

  var onMouseDownActivate = function () {
    if (document.querySelector('.map').classList.contains('map--faded')) {
      window.activation.activatePage();
    }
  };
  var onKeyDownActivate = function (evt) {
    if (evt.key === window.utils.ENTER) {
      window.activation.activatePage();
    }
  };

  var pinOnMovePositionHandler = function (evt) {
    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      var currentPosition = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY
      };
      var shiftPositions = {
        x: window.activation.mainPin.offsetLeft - currentPosition.x,
        y: window.activation.mainPin.offsetTop - currentPosition.y
      };

      var setPositionLimits = function (condition, parametr, id) {
        if (id === 'x') {
          if (condition) {
            shiftPositions.x = parametr;
          }
        } else {
          if (condition) {
            shiftPositions.y = parametr;
          }
        }
      };
      setPositionLimits((shiftPositions.x < positionLimits.xLeft), positionLimits.xLeft, 'x');
      setPositionLimits((shiftPositions.x > positionLimits.xRight), positionLimits.xRight, 'x');
      setPositionLimits((shiftPositions.y < positionLimits.yTop), positionLimits.yTop);
      setPositionLimits((shiftPositions.y > positionLimits.yBottom), positionLimits.yBottom);

      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.activation.mainPinPosition(window.activation.mainPinWidth, window.utils.ACTIVE_PIN_HEIGHT);
      window.activation.mainPin.style.left = shiftPositions.x + 'px';
      window.activation.mainPin.style.top = shiftPositions.y + 'px';
    };
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.activation.mainPin.addEventListener('mousedown', pinOnMovePositionHandler);

  var openPinDetails = function () {
    var pins = document.querySelectorAll('button[type="button"].map__pin');
    var cards = document.querySelectorAll('.map__card');
    var openedCard;

    var closeOpenedCardHendler = function () {
      openedCard.classList.add('hidden');
    };

    var onEscCloseWindow = function (evt) {
      if (evt.key === window.utils.ESC) {
        openedCard.classList.add('hidden');
      }
    };

    for (var i = 0; i < pins.length; i++) {
      (function (pin, card) {
        pin.addEventListener('click', function () {
          if (openedCard) {
            openedCard.classList.add('hidden');
          }
          card.classList.remove('hidden');
          openedCard = card;
          openedCard.querySelector('button.popup__close').addEventListener('click', closeOpenedCardHendler);
          document.addEventListener('keydown', onEscCloseWindow);
        });
      })(pins[i], cards[i]);
    }
  };

  window.activation.mainPin.addEventListener('mousedown', onMouseDownActivate);
  window.activation.mainPin.addEventListener('keydown', onKeyDownActivate);

  window.map = {
    openPinDetails: openPinDetails,
  };
})();
