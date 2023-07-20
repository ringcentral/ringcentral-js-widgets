"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CallingSettingsPenal = require("./CallingSettingsPenal.interface");
Object.keys(_CallingSettingsPenal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallingSettingsPenal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallingSettingsPenal[key];
    }
  });
});
var _CallingSettingsPanel = require("./CallingSettingsPanel");
Object.keys(_CallingSettingsPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallingSettingsPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallingSettingsPanel[key];
    }
  });
});
//# sourceMappingURL=index.js.map
