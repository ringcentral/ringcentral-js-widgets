"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ContactDetailsView = require("../../components/ContactDetailsView");

var _phoneContext = require("../../lib/phoneContext");

var _default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.contactDetailsUI;
})(_ContactDetailsView.ContactDetailsView);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
