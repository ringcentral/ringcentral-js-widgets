"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CallCtrlContainer", {
  enumerable: true,
  get: function get() {
    return _CallCtrlContainer["default"];
  }
});
exports["default"] = void 0;

var _CallCtrlContainer = _interopRequireDefault(require("./CallCtrlContainer"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallCtrlPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callControlUI;
})(_CallCtrlContainer["default"]);
exports["default"] = CallCtrlPage;
//# sourceMappingURL=index.js.map
