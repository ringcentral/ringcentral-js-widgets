"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectivityBadgeContainer = void 0;

var _ConnectivityBadge = _interopRequireDefault(require("../../components/ConnectivityBadge"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ConnectivityBadgeContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.connectivityBadgeUI;
})(_ConnectivityBadge["default"]);
exports.ConnectivityBadgeContainer = ConnectivityBadgeContainer;
//# sourceMappingURL=index.js.map
