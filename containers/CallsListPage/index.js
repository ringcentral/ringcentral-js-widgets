"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CallsListPage = void 0;
var _CallsListPanel = _interopRequireDefault(require("../../components/CallsListPanel"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CallsListPage = exports.CallsListPage = exports["default"] = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callsListUI;
})(_CallsListPanel["default"]);
//# sourceMappingURL=index.js.map
