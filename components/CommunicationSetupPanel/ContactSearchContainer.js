"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _phoneContext = require("../../lib/phoneContext");
var _ContactSearchPanel = require("../ContactSearchPanel");
var _default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.contactSearchUI;
})(_ContactSearchPanel.ContactSearchPanel);
exports["default"] = _default;
//# sourceMappingURL=ContactSearchContainer.js.map
