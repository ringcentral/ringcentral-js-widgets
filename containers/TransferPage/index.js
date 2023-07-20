"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _TransferPanel = _interopRequireDefault(require("../../components/TransferPanel"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.transferUI;
})(_TransferPanel["default"]);
exports["default"] = _default;
//# sourceMappingURL=index.js.map
