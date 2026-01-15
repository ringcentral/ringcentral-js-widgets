"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectivityBadgeContainer = void 0;
var _ConnectivityBadge = _interopRequireDefault(require("../../components/ConnectivityBadge"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ConnectivityBadgeContainer = exports.ConnectivityBadgeContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.connectivityBadgeUI;
})(_ConnectivityBadge["default"]);
//# sourceMappingURL=index.js.map
