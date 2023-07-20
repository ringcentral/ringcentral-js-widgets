"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _SleepDetection = require("./SleepDetection");
Object.keys(_SleepDetection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SleepDetection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SleepDetection[key];
    }
  });
});
//# sourceMappingURL=index.js.map
