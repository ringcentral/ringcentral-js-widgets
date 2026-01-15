"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasClickToCallPermission = void 0;
var _callingOptions = require("./callingOptions");
var hasClickToCallPermission = exports.hasClickToCallPermission = function hasClickToCallPermission(_ref) {
  var callWith = _ref.callWith,
    ringoutEnabled = _ref.ringoutEnabled,
    webphoneEnabled = _ref.webphoneEnabled;
  var browser = _callingOptions.callingOptions.browser,
    softphone = _callingOptions.callingOptions.softphone,
    ringout = _callingOptions.callingOptions.ringout,
    jupiter = _callingOptions.callingOptions.jupiter;
  // And without RingOut and Webphone permissions, it won't work on Softphone either.
  return (callWith === browser || callWith === softphone || callWith === jupiter) && webphoneEnabled || (callWith === softphone || callWith === ringout || callWith === jupiter) && ringoutEnabled;
};
//# sourceMappingURL=hasClickToCallPermission.js.map
