"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _enums = require("../../../../enums");

var _transferEvents$START;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_transferEvents$START = {}, _defineProperty(_transferEvents$START, _enums.transferEvents.START, 'Call transfer in progress'), _defineProperty(_transferEvents$START, _enums.transferErrors.TRANSFER_ERROR, 'Call transfer is failed.'), _defineProperty(_transferEvents$START, _enums.transferSuccesses.TRANSFER_CONNECTED, 'Call transfer is connected'), _defineProperty(_transferEvents$START, _enums.transferSuccesses.SEND_VOICEMAIL_SUCCESS, 'Send voicemail is succeed'), _defineProperty(_transferEvents$START, _enums.transferErrors.SEND_VOICEMAIL_ERROR, 'Send voicemail is failed'), _transferEvents$START);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map