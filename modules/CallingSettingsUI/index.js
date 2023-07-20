"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CallingSettingsUI = require("./CallingSettingsUI");
Object.keys(_CallingSettingsUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallingSettingsUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallingSettingsUI[key];
    }
  });
});
var _CallingSettingsUI2 = require("./CallingSettingsUI.interface");
Object.keys(_CallingSettingsUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallingSettingsUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallingSettingsUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
