"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EvWorkingStateAlert;

var _ramda = require("ramda");

var _enums = require("../../../enums");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function EvWorkingStateAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale;
  return _i18n["default"].getString(message, currentLocale);
}

EvWorkingStateAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return (0, _ramda.contains)(message, [_enums.messageTypes.INVALID_STATE_CHANGE, _enums.messageTypes.OVER_BREAK_TIME]);
};
//# sourceMappingURL=EvWorkingStateAlert.js.map
