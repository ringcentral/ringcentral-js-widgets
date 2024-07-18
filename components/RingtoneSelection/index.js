"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _RingtoneSelection = require("./RingtoneSelection");
Object.keys(_RingtoneSelection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RingtoneSelection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RingtoneSelection[key];
    }
  });
});
//# sourceMappingURL=index.js.map
