"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EvCallDispositionAlert;

var _ramda = require("ramda");

var _logTypes = require("../../../enums/logTypes");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function EvCallDispositionAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale;
  return _i18n["default"].getString(message, currentLocale);
}

EvCallDispositionAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return (0, _ramda.contains)(message, [_logTypes.logTypes.CALL_DISPOSITION_FAILURE, _logTypes.logTypes.CALL_DISPOSITION_SUCCESS]);
};
//# sourceMappingURL=EvCallDispositionAlert.js.map
