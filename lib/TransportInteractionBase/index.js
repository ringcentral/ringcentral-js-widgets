"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;
var _TransportInteractionBase = _interopRequireDefault(require("./TransportInteractionBase"));
var _TransportInteractionBase2 = require("./TransportInteractionBase.interface");
Object.keys(_TransportInteractionBase2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TransportInteractionBase2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TransportInteractionBase2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = _TransportInteractionBase["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map
