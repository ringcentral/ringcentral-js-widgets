"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _HelpTextSection = require("./HelpTextSection");
Object.keys(_HelpTextSection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _HelpTextSection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _HelpTextSection[key];
    }
  });
});
//# sourceMappingURL=index.js.map
