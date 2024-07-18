"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentActivityContainer = void 0;
var _RecentActivityPanel = _interopRequireDefault(require("../../components/RecentActivityPanel"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var RecentActivityContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.recentActivityUI;
})(_RecentActivityPanel["default"]);
exports.RecentActivityContainer = RecentActivityContainer;
//# sourceMappingURL=index.js.map
