"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _RegionSettingsUI2.RegionSettingsUI;
  }
});
var _RegionSettingsUI = require("./RegionSettingsUI.interface");
Object.keys(_RegionSettingsUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _RegionSettingsUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RegionSettingsUI[key];
    }
  });
});
var _RegionSettingsUI2 = require("./RegionSettingsUI");
Object.keys(_RegionSettingsUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _RegionSettingsUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RegionSettingsUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
