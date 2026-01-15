"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionUpdatePage = void 0;
var _SessionUpdatePanel = require("../../components/SessionUpdatePanel");
var _connectModule = require("../../lib/connectModule");
var SessionUpdatePage = exports.SessionUpdatePage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evAgentSessionUI;
})(_SessionUpdatePanel.SessionUpdatePanel);
//# sourceMappingURL=SessionUpdatePage.js.map
