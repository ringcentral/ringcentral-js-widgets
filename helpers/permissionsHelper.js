"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasClickToCallPermission = hasClickToCallPermission;

var _callingOptions = _interopRequireDefault(require("../modules/CallingSettings/callingOptions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function hasClickToCallPermission(_ref) {
  var callWith = _ref.callWith,
      ringoutEnabled = _ref.ringoutEnabled,
      webphoneEnabled = _ref.webphoneEnabled;
  var browser = _callingOptions["default"].browser,
      softphone = _callingOptions["default"].softphone,
      myphone = _callingOptions["default"].myphone,
      otherphone = _callingOptions["default"].otherphone,
      customphone = _callingOptions["default"].customphone;
  return (callWith === browser || callWith === softphone) && webphoneEnabled || (callWith === softphone || callWith === myphone || callWith === otherphone || callWith === customphone) && ringoutEnabled;
}
//# sourceMappingURL=permissionsHelper.js.map
