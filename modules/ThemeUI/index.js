"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ThemeUI = require("./ThemeUI");
Object.keys(_ThemeUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ThemeUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ThemeUI[key];
    }
  });
});
//# sourceMappingURL=index.js.map
