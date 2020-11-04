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
      ringout = _callingOptions["default"].ringout,
      jupiter = _callingOptions["default"].jupiter; // Without Webphone permissions, it won't work on Jupiter either.
  // And without RingOut and Webphone permissions, it won't work on Softphone either.

  return (callWith === browser || callWith === softphone || callWith === jupiter) && webphoneEnabled || (callWith === softphone || callWith === ringout) && ringoutEnabled;
}
//# sourceMappingURL=permissionsHelper.js.map
