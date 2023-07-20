"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Button = require("./Button");
Object.keys(_Button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Button[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Button[key];
    }
  });
});
//# sourceMappingURL=index.js.map
