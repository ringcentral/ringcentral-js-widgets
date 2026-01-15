"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
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
var _default = exports["default"] = _WebRTCNotificationSection.WebRTCNotificationSection;
//# sourceMappingURL=index.js.map
