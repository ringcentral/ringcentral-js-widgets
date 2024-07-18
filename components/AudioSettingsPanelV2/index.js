"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _AudioSettingsPanel = require("./AudioSettingsPanel.interface");
Object.keys(_AudioSettingsPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AudioSettingsPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AudioSettingsPanel[key];
    }
  });
});
var _AudioSettingsPanel2 = require("./AudioSettingsPanel");
Object.keys(_AudioSettingsPanel2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AudioSettingsPanel2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AudioSettingsPanel2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
