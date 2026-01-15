"use strict";

require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.string.includes.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EvRequeueCallAlert;
var _ramda = require("ramda");
var _enums = require("../../../enums");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function EvRequeueCallAlert(_ref) {
  var message = _ref.message.message,
    currentLocale = _ref.currentLocale;
  return _i18n["default"].getString(message, currentLocale);
}
EvRequeueCallAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return (0, _ramda.includes)(message, [_enums.requeueEvents.FAILURE, _enums.requeueEvents.START, _enums.requeueEvents.SUCCESS]);
};
//# sourceMappingURL=EvRequeueCallAlert.js.map
