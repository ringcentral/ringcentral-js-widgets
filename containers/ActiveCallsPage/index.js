"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActiveCallsPanel = _interopRequireDefault(require("../../components/ActiveCallsPanel"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.activeCallsUI;
})(_ActiveCallsPanel["default"]);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
