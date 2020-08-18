"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionConfigPage = void 0;

var _SessionConfigPanel = require("../../components/SessionConfigPanel");

var _connectModule = require("../../lib/connectModule");

var SessionConfigPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evAgentSessionUI;
})(_SessionConfigPanel.SessionConfigPanel);
exports.SessionConfigPage = SessionConfigPage;
//# sourceMappingURL=SessionConfigPage.js.map
