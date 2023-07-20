"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _RegionSettings = require("./RegionSettings");
Object.keys(_RegionSettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RegionSettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RegionSettings[key];
    }
  });
});
var _RegionSettings2 = require("./RegionSettings.interface");
Object.keys(_RegionSettings2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RegionSettings2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RegionSettings2[key];
    }
  });
});
var _regionSettingsMessages = require("./regionSettingsMessages");
Object.keys(_regionSettingsMessages).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _regionSettingsMessages[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _regionSettingsMessages[key];
    }
  });
});
//# sourceMappingURL=index.js.map
