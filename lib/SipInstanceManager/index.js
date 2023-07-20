"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _SipInstanceManager = require("./SipInstanceManager");
Object.keys(_SipInstanceManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SipInstanceManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SipInstanceManager[key];
    }
  });
});
//# sourceMappingURL=index.js.map
