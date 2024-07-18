"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _CallsPanel = _interopRequireDefault(require("../../components/CallsPanel"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callHistoryUI;
})(_CallsPanel["default"]);
exports["default"] = _default;
//# sourceMappingURL=index.js.map
