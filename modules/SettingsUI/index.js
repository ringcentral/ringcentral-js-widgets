"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _SettingUI = require("./SettingUI.interface");
Object.keys(_SettingUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SettingUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SettingUI[key];
    }
  });
});
var _SettingsUI = require("./SettingsUI");
Object.keys(_SettingsUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SettingsUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SettingsUI[key];
    }
  });
});
//# sourceMappingURL=index.js.map
