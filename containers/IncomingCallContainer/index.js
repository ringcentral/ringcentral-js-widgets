"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomingCallContainer = void 0;
var _IncomingCallView = require("../../components/IncomingCallView");
var _phoneContext = require("../../lib/phoneContext");
var IncomingCallContainer = exports.IncomingCallContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.incomingCallUI;
})(_IncomingCallView.IncomingCallView);
//# sourceMappingURL=index.js.map
