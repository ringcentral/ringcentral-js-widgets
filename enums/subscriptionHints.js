"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscriptionHints = exports["default"] = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var subscriptionHints = exports.subscriptionHints = _ObjectMap.ObjectMap.fromObject({
  limits: 'Limits',
  features: 'Features',
  accountStatus: 'AccountStatus',
  accountSettings: 'AccountSettings',
  companyNumbers: 'CompanyNumbers',
  dialingPlan: 'DialingPlan',
  permissions: 'Permissions',
  profileImage: 'ProfileImage',
  extensionInfo: 'ExtensionInfo',
  videoConfiguration: 'VideoConfiguration'
});
var _default = exports["default"] = subscriptionHints;
//# sourceMappingURL=subscriptionHints.js.map
