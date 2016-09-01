'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, props, phone) {
  return {
    flip: function flip() {
      var _phone$webphone;

      return (_phone$webphone = phone.webphone).flip.apply(_phone$webphone, arguments);
    },
    flipNumbers: state.common.user.forwardingNumbers.filter(function (number) {
      return number.features.indexOf('CallFlip') > -1;
    })
  };
};