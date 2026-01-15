"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerPage = void 0;
var _DialerPanel = require("../../components/DialerPanel");
var _connectModule = require("../../lib/connectModule");
var DialerPage = exports.DialerPage = (0, _connectModule.connectModule)(function (phone) {
  return phone.evDialerUI;
})(_DialerPanel.DialerPanel);
//# sourceMappingURL=DialerPage.js.map
