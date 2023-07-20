"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Ringtone = require("./Ringtone");
Object.keys(_Ringtone).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Ringtone[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Ringtone[key];
    }
  });
});
//# sourceMappingURL=index.js.map
