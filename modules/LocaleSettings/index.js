"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _LocaleSettings = require("./LocaleSettings");
Object.keys(_LocaleSettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _LocaleSettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _LocaleSettings[key];
    }
  });
});
var _LocaleSettings2 = require("./LocaleSettings.interface");
Object.keys(_LocaleSettings2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _LocaleSettings2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _LocaleSettings2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
