"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPage = void 0;
var _LoginPanel = require("../../components/LoginPanel");
var _connectModule = require("../../lib/connectModule");
var LoginPage = exports.LoginPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.loginUI;
})(_LoginPanel.LoginPanel);
//# sourceMappingURL=LoginPage.js.map
