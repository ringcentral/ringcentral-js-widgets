"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscriptionFilters = exports["default"] = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var subscriptionFilters = _ObjectMap.ObjectMap.fromObject({
  presence: '/restapi/v1.0/account/~/extension/~/presence',
  detailedPresence: '/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true&totalActiveCalls',
  extensionInfo: '/restapi/v1.0/account/~/extension/~',
  accountExtension: '/restapi/v1.0/account/~/extension',
  companyContacts: '/restapi/v1.0/account/~/directory/contacts',
  messageStore: '/restapi/v1.0/account/~/extension/~/message-store',
  telephonySessions: '/restapi/v1.0/account/~/extension/~/telephony/sessions'
});

exports.subscriptionFilters = subscriptionFilters;
var _default = subscriptionFilters;
exports["default"] = _default;
//# sourceMappingURL=subscriptionFilters.js.map
