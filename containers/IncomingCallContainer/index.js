"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomingCallContainer = void 0;
var _IncomingCallView = require("../../components/IncomingCallView");
var _phoneContext = require("../../lib/phoneContext");
var IncomingCallContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.incomingCallUI;
})(_IncomingCallView.IncomingCallView);
exports.IncomingCallContainer = IncomingCallContainer;
//# sourceMappingURL=index.js.map
