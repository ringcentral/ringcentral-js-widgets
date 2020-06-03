"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _enums = require("../../../../enums");

var _messageTypes$NO_SUPP;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: update wording
var _default = (_messageTypes$NO_SUPP = {}, _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.NO_SUPPORT_COUNTRY, 'Sorry, outbound call to the outside of the U.S. and Canada is not yet supported.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.FAILED_TO_CALL, 'Sorry, the line is busy or is at pending disposition.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.OFFHOOK_INIT_ERROR, 'Internal error offhook init occurred.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.OFFHOOK_TERM_ERROR, 'Internal error offhook term occurred.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.ADD_SESSION_ERROR, 'Internal error add session occurred.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.DROP_SESSION_ERROR, 'Internal error drop session occurred.'), _defineProperty(_messageTypes$NO_SUPP, _enums.messageTypes.HOLD_ERROR, 'Internal error hold/unhold call occurred.'), _messageTypes$NO_SUPP);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
