"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _LogFieldsInput = require("./LogFieldsInput");
Object.keys(_LogFieldsInput).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _LogFieldsInput[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _LogFieldsInput[key];
    }
  });
});
//# sourceMappingURL=index.js.map
