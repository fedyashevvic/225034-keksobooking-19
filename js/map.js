'use strict';

(function () {
  var onMouseDownActivate = function (evt) {
    if (!evt.button) {
      window.activation.activatePage();
    }
  };
  var onKeyDownActivate = function (evt) {
    if (evt.key === 'Enter') {
      window.activation.activatePage();
    }
  };

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
