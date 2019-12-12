"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HashMap = require("../lib/HashMap");

var _default = (0, _HashMap.createHashMap)({
  presence: '/account/~/extension/~/presence',
  detailedPresence: '/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true&totalActiveCalls',
  extensionInfo: '/account/~/extension/~',
  accountExtension: '/account/~/extension',
  companyContacts: '/account/~/directory/contacts'
});

exports["default"] = _default;
//# sourceMappingURL=subscriptionFilters.js.map
