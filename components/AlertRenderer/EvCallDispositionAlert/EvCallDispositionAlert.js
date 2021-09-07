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
  var _ref$message = _ref.message,
      message = _ref$message.message,
      payload = _ref$message.payload,
      currentLocale = _ref.currentLocale;
  return typeof payload === 'string' ? payload : _i18n["default"].getString(message, currentLocale);
}

EvCallDispositionAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return (0, _ramda.contains)(message, [_logTypes.logTypes.CALL_DISPOSITION_FAILURE, _logTypes.logTypes.CALL_DISPOSITION_SUCCESS, _logTypes.logTypes.CALL_LOG_CREATE_FAILURE, _logTypes.logTypes.CALL_LOG_CREATE_SUCCESS, _logTypes.logTypes.CALL_LOG_UPDATE_FAILURE, _logTypes.logTypes.CALL_LOG_UPDATE_SUCCESS]);
};
//# sourceMappingURL=EvCallDispositionAlert.js.map
