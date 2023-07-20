"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _AudioSettings = require("./AudioSettings");
Object.keys(_AudioSettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AudioSettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AudioSettings[key];
    }
  });
});
var _AudioSettings2 = require("./AudioSettings.interface");
Object.keys(_AudioSettings2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AudioSettings2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AudioSettings2[key];
    }
  });
});
var _audioSettingsErrors = require("./audioSettingsErrors");
Object.keys(_audioSettingsErrors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _audioSettingsErrors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _audioSettingsErrors[key];
    }
  });
});
//# sourceMappingURL=index.js.map
