"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainViewPage = void 0;
var _MainViewPanel = require("../../components/MainViewPanel");
var _connectModule = require("../../lib/connectModule");
var MainViewPage = exports.MainViewPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.mainViewUI;
})(_MainViewPanel.MainViewPanel);
//# sourceMappingURL=MainViewPage.js.map
