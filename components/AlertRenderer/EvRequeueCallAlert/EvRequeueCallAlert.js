"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EvRequeueCallAlert;

var _ramda = require("ramda");

var _enums = require("../../../enums");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function EvRequeueCallAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale;
  return _i18n["default"].getString(message, currentLocale);
}

EvRequeueCallAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return (0, _ramda.contains)(message, [_enums.requeueEvents.FAILURE, _enums.requeueEvents.START, _enums.requeueEvents.SUCCESS]);
};
//# sourceMappingURL=EvRequeueCallAlert.js.map
