"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ExtensionInfo = require("./ExtensionInfo");
Object.keys(_ExtensionInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionInfo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionInfo[key];
    }
  });
});
var _ExtensionInfo2 = require("./ExtensionInfo.interface");
Object.keys(_ExtensionInfo2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionInfo2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionInfo2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
