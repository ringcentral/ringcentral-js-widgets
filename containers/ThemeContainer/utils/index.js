"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _getThemeColor = require("./getThemeColor");
Object.keys(_getThemeColor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getThemeColor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getThemeColor[key];
    }
  });
});
//# sourceMappingURL=index.js.map
