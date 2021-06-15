"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomingCallContainer = void 0;

var _phoneContext = require("../../lib/phoneContext");

var _IncomingCallView = require("../../components/IncomingCallView");

var IncomingCallContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.incomingCallUI;
})(_IncomingCallView.IncomingCallView);
exports.IncomingCallContainer = IncomingCallContainer;
//# sourceMappingURL=index.js.map
