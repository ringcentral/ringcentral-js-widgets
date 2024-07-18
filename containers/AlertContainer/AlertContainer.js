"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AnimationAlert = _interopRequireDefault(require("../../components/AnimationAlert"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.alertUI;
})(_AnimationAlert["default"]);
exports["default"] = _default;
//# sourceMappingURL=AlertContainer.js.map
