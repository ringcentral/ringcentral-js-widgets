"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPage = void 0;

var _LoginPanel = require("../../components/LoginPanel");

var _connectModule = require("../../lib/connectModule");

var LoginPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.loginUI;
})(_LoginPanel.LoginPanel);
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map
