"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallsOnholdPage = void 0;
var _CallsOnholdPanel = _interopRequireDefault(require("../../components/CallsOnholdPanel"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CallsOnholdPage = exports.CallsOnholdPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callsOnholdUI;
})(_CallsOnholdPanel["default"]);
//# sourceMappingURL=index.js.map
