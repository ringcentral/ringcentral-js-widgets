"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ActiveCallsPanel = _interopRequireDefault(require("../../components/ActiveCallsPanel"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.activeCallsUI;
})(_ActiveCallsPanel["default"]);
exports["default"] = _default;
//# sourceMappingURL=index.js.map
