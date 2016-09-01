"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, props, phone) {
  return {
    transfer: function transfer() {
      var _phone$webphone;

      return (_phone$webphone = phone.webphone).transfer.apply(_phone$webphone, arguments);
    }
  };
};