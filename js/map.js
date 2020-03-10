'use strict';

(function () {
  var PositionLimit = {
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
  var Position = function (xPos, yPos) {
    this.x = xPos;
    this.y = yPos;
  };

  var pinOnMovePositionHandler = function (evt) {
    var startPosition = new Position(evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      var currentPosition = new Position(startPosition.x - moveEvt.clientX, startPosition.y - moveEvt.clientY);
      var shiftPositions = new Position(window.activation.mainPin.offsetLeft - currentPosition.x, window.activation.mainPin.offsetTop - currentPosition.y);
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
      setPositionLimits((shiftPositions.x < PositionLimit.xLeft), PositionLimit.xLeft, 'x');
      setPositionLimits((shiftPositions.x > PositionLimit.xRight), PositionLimit.xRight, 'x');
      setPositionLimits((shiftPositions.y < PositionLimit.yTop), PositionLimit.yTop);
      setPositionLimits((shiftPositions.y > PositionLimit.yBottom), PositionLimit.yBottom);

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
    var activePin;

    var closeOpenedCardHendler = function () {
      openedCard.classList.add('hidden');
      activePin.classList.remove('map__pin--active');
    };

    var onEscCloseWindow = function (evt) {
      if (evt.key === window.utils.ESC) {
        closeOpenedCardHendler();
      }
    };

    for (var i = 0; i < pins.length; i++) {
      (function (pin, card) {
        pin.addEventListener('click', function () {
          if (openedCard) {
            closeOpenedCardHendler();
          }
          pin.classList.add('map__pin--active');
          card.classList.remove('hidden');
          openedCard = card;
          activePin = pin;
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
