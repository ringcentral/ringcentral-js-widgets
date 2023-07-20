"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ExtensionDevice = require("./ExtensionDevice");
Object.keys(_ExtensionDevice).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionDevice[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionDevice[key];
    }
  });
});
var _ExtensionDevice2 = require("./ExtensionDevice.interface");
Object.keys(_ExtensionDevice2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExtensionDevice2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExtensionDevice2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
