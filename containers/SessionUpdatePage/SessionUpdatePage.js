"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionUpdatePage = void 0;
var _SessionUpdatePanel = require("../../components/SessionUpdatePanel");
var _connectModule = require("../../lib/connectModule");
var SessionUpdatePage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evAgentSessionUI;
})(_SessionUpdatePanel.SessionUpdatePanel);
exports.SessionUpdatePage = SessionUpdatePage;
//# sourceMappingURL=SessionUpdatePage.js.map
