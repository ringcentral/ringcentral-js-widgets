"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CallsListPage = void 0;
var _CallsListPanel = _interopRequireDefault(require("../../components/CallsListPanel"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CallsListPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callsListUI;
})(_CallsListPanel["default"]);
exports.CallsListPage = exports["default"] = CallsListPage;
//# sourceMappingURL=index.js.map
