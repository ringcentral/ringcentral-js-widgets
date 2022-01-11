"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChooseAccountPage = void 0;

var _ChooseAccountPanel = require("../../components/ChooseAccountPanel");

var _connectModule = require("../../lib/connectModule");

var ChooseAccountPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evChooseAccountUI;
})(_ChooseAccountPanel.ChooseAccountPanel);
exports.ChooseAccountPage = ChooseAccountPage;
//# sourceMappingURL=ChooseAccountPage.js.map
