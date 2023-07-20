"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _rateLimitThrottle = require("./rateLimitThrottle");
Object.keys(_rateLimitThrottle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _rateLimitThrottle[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _rateLimitThrottle[key];
    }
  });
});
//# sourceMappingURL=index.js.map
