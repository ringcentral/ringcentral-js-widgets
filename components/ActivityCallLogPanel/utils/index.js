"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EditLogSection = require("./EditLogSection");
Object.keys(_EditLogSection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EditLogSection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EditLogSection[key];
    }
  });
});
var _getButtonText = require("./getButtonText");
Object.keys(_getButtonText).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getButtonText[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getButtonText[key];
    }
  });
});
//# sourceMappingURL=index.js.map
