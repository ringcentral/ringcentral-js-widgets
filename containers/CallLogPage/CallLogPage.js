"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CallLogPanel", {
  enumerable: true,
  get: function get() {
    return _CallLogPanel["default"];
  }
});
exports["default"] = void 0;
var _CallLogPanel = _interopRequireDefault(require("../../components/CallLogPanel"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CallLogPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.CallLogUI;
})(_CallLogPanel["default"]);
exports["default"] = CallLogPage;
//# sourceMappingURL=CallLogPage.js.map
