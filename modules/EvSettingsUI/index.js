"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvSettingsUI = require("./EvSettingsUI");
Object.keys(_EvSettingsUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvSettingsUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvSettingsUI[key];
    }
  });
});
var _EvSettingsUI2 = require("./EvSettingsUI.interface");
Object.keys(_EvSettingsUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvSettingsUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvSettingsUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
