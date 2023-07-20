"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _isASCII = require("./isASCII");
Object.keys(_isASCII).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isASCII[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _isASCII[key];
    }
  });
});
//# sourceMappingURL=index.js.map
