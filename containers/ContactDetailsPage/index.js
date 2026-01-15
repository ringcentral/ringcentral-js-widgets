"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ContactDetailsView = require("../../components/ContactDetailsView");
var _phoneContext = require("../../lib/phoneContext");
var _default = exports["default"] = (0, _phoneContext.connectModule)(function (phone) {
  return phone.contactDetailsUI;
})(_ContactDetailsView.ContactDetailsView);
//# sourceMappingURL=index.js.map
