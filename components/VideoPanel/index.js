"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;
var _VideoPanel = require("./VideoPanel");
Object.keys(_VideoPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _VideoPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VideoPanel[key];
    }
  });
});
var _default = _VideoPanel.VideoPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
