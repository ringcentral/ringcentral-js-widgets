"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionConfigPage = void 0;
var _SessionConfigPanel = require("../../components/SessionConfigPanel");
var _connectModule = require("../../lib/connectModule");
var SessionConfigPage = exports.SessionConfigPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evAgentSessionUI;
})(_SessionConfigPanel.SessionConfigPanel);
//# sourceMappingURL=SessionConfigPage.js.map
