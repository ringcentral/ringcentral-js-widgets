"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ContactDetails = require("./ContactDetails");
Object.keys(_ContactDetails).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ContactDetails[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ContactDetails[key];
    }
  });
});
//# sourceMappingURL=index.js.map
