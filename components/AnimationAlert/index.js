"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;
var _AnimationAlert = _interopRequireDefault(require("./AnimationAlert"));
var _AnimationAlertUtils = require("./AnimationAlertUtils");
Object.keys(_AnimationAlertUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _AnimationAlertUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AnimationAlertUtils[key];
    }
  });
});
var _AnimationMessage = require("./AnimationMessage");
Object.keys(_AnimationMessage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _AnimationMessage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AnimationMessage[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = _AnimationAlert["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map
