"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _SettingGroup = require("./SettingGroup");
Object.keys(_SettingGroup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SettingGroup[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SettingGroup[key];
    }
  });
});
//# sourceMappingURL=index.js.map
