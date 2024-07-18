"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectivityBadgeContainer = void 0;
var _ConnectivityBadge = _interopRequireDefault(require("../../components/ConnectivityBadge"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ConnectivityBadgeContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.connectivityBadgeUI;
})(_ConnectivityBadge["default"]);
exports.ConnectivityBadgeContainer = ConnectivityBadgeContainer;
//# sourceMappingURL=index.js.map
