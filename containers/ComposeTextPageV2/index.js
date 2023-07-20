"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeTextPage = void 0;
var _ComposeTextPanelV = require("../../components/ComposeTextPanelV2");
var _phoneContext = require("../../lib/phoneContext");
var ComposeTextPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.composeTextUI;
})(_ComposeTextPanelV.ComposeTextPanel);
exports.ComposeTextPage = ComposeTextPage;
//# sourceMappingURL=index.js.map
