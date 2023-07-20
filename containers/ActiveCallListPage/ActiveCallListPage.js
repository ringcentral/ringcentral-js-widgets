"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallListPage = void 0;
var _ActiveCallListPanel = require("../../components/ActiveCallListPanel");
var _connectModule = require("../../lib/connectModule");
var ActiveCallListPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evActiveCallListUI;
})(_ActiveCallListPanel.ActiveCallListPanel);
exports.ActiveCallListPage = ActiveCallListPage;
//# sourceMappingURL=ActiveCallListPage.js.map
