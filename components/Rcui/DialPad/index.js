"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _DialPad = require("./DialPad");
Object.keys(_DialPad).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DialPad[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DialPad[key];
    }
  });
});
//# sourceMappingURL=index.js.map
