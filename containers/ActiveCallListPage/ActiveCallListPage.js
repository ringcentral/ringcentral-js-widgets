"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallListPage = void 0;
var _ActiveCallListPanel = require("../../components/ActiveCallListPanel");
var _connectModule = require("../../lib/connectModule");
var ActiveCallListPage = exports.ActiveCallListPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evActiveCallListUI;
})(_ActiveCallListPanel.ActiveCallListPanel);
//# sourceMappingURL=ActiveCallListPage.js.map
