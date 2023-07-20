"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;
var _WebRTCNotificationSection = require("./WebRTCNotificationSection");
var _WebRTCNotificationSection2 = require("./WebRTCNotificationSection.interface");
Object.keys(_WebRTCNotificationSection2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _WebRTCNotificationSection2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WebRTCNotificationSection2[key];
    }
  });
});
var _default = _WebRTCNotificationSection.WebRTCNotificationSection;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
