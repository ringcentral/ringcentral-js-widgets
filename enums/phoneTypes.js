"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
Object.keys(_phoneTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _phoneTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _phoneTypes[key];
    }
  });
});
//# sourceMappingURL=phoneTypes.js.map
