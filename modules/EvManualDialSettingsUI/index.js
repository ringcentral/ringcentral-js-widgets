"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvManualDialSettingsUI = require("./EvManualDialSettingsUI");
Object.keys(_EvManualDialSettingsUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvManualDialSettingsUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvManualDialSettingsUI[key];
    }
  });
});
var _EvManualDialSettingsUI2 = require("./EvManualDialSettingsUI.interface");
Object.keys(_EvManualDialSettingsUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvManualDialSettingsUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvManualDialSettingsUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
