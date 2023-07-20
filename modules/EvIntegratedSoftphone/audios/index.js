"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _audio = require("./audio");
Object.keys(_audio).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _audio[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _audio[key];
    }
  });
});
//# sourceMappingURL=index.js.map
