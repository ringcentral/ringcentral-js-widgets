"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPage = void 0;
var _LoginPanel = require("../../components/LoginPanel");
var _phoneContext = require("../../lib/phoneContext");
var LoginPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.loginUI;
})(_LoginPanel.LoginPanel);
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map
