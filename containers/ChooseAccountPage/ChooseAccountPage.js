"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChooseAccountPage = void 0;
var _ChooseAccountPanel = require("../../components/ChooseAccountPanel");
var _connectModule = require("../../lib/connectModule");
var ChooseAccountPage = exports.ChooseAccountPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evChooseAccountUI;
})(_ChooseAccountPanel.ChooseAccountPanel);
//# sourceMappingURL=ChooseAccountPage.js.map
