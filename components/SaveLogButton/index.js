"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;
var _SaveLogButton = _interopRequireDefault(require("./SaveLogButton"));
var _getButtonStatus = require("./getButtonStatus");
Object.keys(_getButtonStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _getButtonStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getButtonStatus[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = _SaveLogButton["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map
