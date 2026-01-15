"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerAndCallsTabContainer = void 0;
var _TabContentView = require("../../components/TabContentView");
var _phoneContext = require("../../lib/phoneContext");
var DialerAndCallsTabContainer = exports.DialerAndCallsTabContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.dialerAndCallsTabUI;
})(_TabContentView.TabContentView);
//# sourceMappingURL=index.js.map
