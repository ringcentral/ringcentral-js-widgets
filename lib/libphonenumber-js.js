"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _libphonenumberJs = require("libphonenumber-js");
Object.keys(_libphonenumberJs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _libphonenumberJs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _libphonenumberJs[key];
    }
  });
});
//# sourceMappingURL=libphonenumber-js.js.map
