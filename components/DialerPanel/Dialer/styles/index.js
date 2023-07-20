"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _DialerWrapper = require("./DialerWrapper");
Object.keys(_DialerWrapper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DialerWrapper[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DialerWrapper[key];
    }
  });
});
//# sourceMappingURL=index.js.map
