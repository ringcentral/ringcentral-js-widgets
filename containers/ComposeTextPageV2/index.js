"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeTextPage = void 0;
var _ComposeTextPanelV = require("../../components/ComposeTextPanelV2");
var _phoneContext = require("../../lib/phoneContext");
var ComposeTextPage = exports.ComposeTextPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.composeTextUI;
})(_ComposeTextPanelV.ComposeTextPanel);
//# sourceMappingURL=index.js.map
