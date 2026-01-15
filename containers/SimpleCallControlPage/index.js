"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleCallControlPage = void 0;
var _SimpleCallControlPanel = require("../../components/SimpleCallControlPanel");
var _phoneContext = require("../../lib/phoneContext");
var SimpleCallControlPage = exports.SimpleCallControlPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.simpleCallControlUI;
})(_SimpleCallControlPanel.SimpleCallControlPanel);
//# sourceMappingURL=index.js.map
