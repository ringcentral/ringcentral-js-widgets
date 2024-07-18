"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CountdownTimer = require("./CountdownTimer");
Object.keys(_CountdownTimer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CountdownTimer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CountdownTimer[key];
    }
  });
});
//# sourceMappingURL=index.js.map
