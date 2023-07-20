"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EvSettings = require("./EvSettings");
Object.keys(_EvSettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvSettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvSettings[key];
    }
  });
});
var _EvSettings2 = require("./EvSettings.interface");
Object.keys(_EvSettings2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvSettings2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvSettings2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
