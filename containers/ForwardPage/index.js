"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ForwardPanel = _interopRequireDefault(require("../../components/ForwardPanel"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = (0, _phoneContext.connectModule)(function (phone) {
  return phone.forwardUI;
})(_ForwardPanel["default"]);
//# sourceMappingURL=index.js.map
