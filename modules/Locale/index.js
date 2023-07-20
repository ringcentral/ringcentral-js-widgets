"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Locale = require("./Locale");
Object.keys(_Locale).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Locale[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Locale[key];
    }
  });
});
var _Locale2 = require("./Locale.interface");
Object.keys(_Locale2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Locale2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Locale2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
