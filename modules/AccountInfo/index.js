"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _AccountInfo = require("./AccountInfo");
Object.keys(_AccountInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AccountInfo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AccountInfo[key];
    }
  });
});
var _AccountInfo2 = require("./AccountInfo.interface");
Object.keys(_AccountInfo2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AccountInfo2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AccountInfo2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
