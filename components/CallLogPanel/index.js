"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;
var _CallLogPanel = _interopRequireDefault(require("./CallLogPanel"));
var _CallLogPanel2 = require("./CallLogPanel.interface");
Object.keys(_CallLogPanel2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CallLogPanel2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogPanel2[key];
    }
  });
});
var _CallLog = require("./CallLog.interface");
Object.keys(_CallLog).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CallLog[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLog[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = _CallLogPanel["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map
