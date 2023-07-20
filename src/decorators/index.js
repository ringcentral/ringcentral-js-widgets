"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _time = require("./time");
Object.keys(_time).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _time[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _time[key];
    }
  });
});
//# sourceMappingURL=index.js.map
