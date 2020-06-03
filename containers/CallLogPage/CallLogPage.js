"use strict";

require("core-js/modules/es6.object.define-property");

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

var _phoneContext = require("../../lib/phoneContext");

var _CallLogPanel = _interopRequireDefault(require("../../components/CallLogPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallLogPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.CallLogUI;
})(_CallLogPanel["default"]);
exports["default"] = CallLogPage;
//# sourceMappingURL=CallLogPage.js.map
