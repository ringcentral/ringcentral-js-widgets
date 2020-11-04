"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPage = void 0;

var _LoginPanel = _interopRequireDefault(require("../../components/LoginPanel"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LoginPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.blockUI;
})(_LoginPanel["default"]);
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map
