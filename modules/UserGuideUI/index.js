"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _UserGuideUI = require("./UserGuideUI");
Object.keys(_UserGuideUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _UserGuideUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _UserGuideUI[key];
    }
  });
});
var _UserGuideUI2 = require("./UserGuideUI.interface");
Object.keys(_UserGuideUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _UserGuideUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _UserGuideUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
