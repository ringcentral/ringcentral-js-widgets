"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EvAuthAlert;

var _ramda = require("ramda");

var _enums = require("../../../enums");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function EvAuthAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale;
  return _i18n["default"].getString(message, currentLocale);
}

EvAuthAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return (0, _ramda.contains)(message, [_enums.messageTypes.NO_AGENT, _enums.messageTypes.CONNECT_ERROR, _enums.messageTypes.UNEXPECTED_AGENT, _enums.messageTypes.INVALID_BROWSER, _enums.messageTypes.CONNECT_TIMEOUT, _enums.messageTypes.OPEN_SOCKET_ERROR, _enums.messageTypes.EXISTING_LOGIN_ENGAGED]);
};
//# sourceMappingURL=EvAuthAlert.js.map
