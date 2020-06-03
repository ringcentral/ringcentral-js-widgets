"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _agentLibrary = _interopRequireDefault(require("./agentLibrary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Close Logger in development,
_agentLibrary["default"].prototype.openConsoleLogger = function () {};

var _default = _agentLibrary["default"];
exports["default"] = _default;
//# sourceMappingURL=agentLibrary.dev.js.map
