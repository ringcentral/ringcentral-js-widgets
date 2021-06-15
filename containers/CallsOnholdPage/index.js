"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallsOnholdPage = void 0;

var _phoneContext = require("../../lib/phoneContext");

var _CallsOnholdPanel = _interopRequireDefault(require("../../components/CallsOnholdPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallsOnholdPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callsOnholdUI;
})(_CallsOnholdPanel["default"]);
exports.CallsOnholdPage = CallsOnholdPage;
//# sourceMappingURL=index.js.map
