"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerAndCallsTabContainer = void 0;

var _TabContentView = require("../../components/TabContentView");

var _phoneContext = require("../../lib/phoneContext");

var DialerAndCallsTabContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.dialerAndCallsTabUI;
})(_TabContentView.TabContentView);
exports.DialerAndCallsTabContainer = DialerAndCallsTabContainer;
//# sourceMappingURL=index.js.map
