"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmsCapabilityAlert = void 0;
var _react = _interopRequireDefault(require("react"));
var _i18n = require("./i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SmsCapabilityAlert = exports.SmsCapabilityAlert = function SmsCapabilityAlert(_ref) {
  var phoneNumber = _ref.phoneNumber;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-1"
  }, (0, _i18n.t)('smsCapabilityAlert', {
    phoneNumber: phoneNumber
  }));
};
//# sourceMappingURL=SmsCapabilityAlert.js.map
