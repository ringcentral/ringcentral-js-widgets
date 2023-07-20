"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _SleepDetector = require("./SleepDetector");
Object.keys(_SleepDetector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SleepDetector[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SleepDetector[key];
    }
  });
});
//# sourceMappingURL=index.js.map
