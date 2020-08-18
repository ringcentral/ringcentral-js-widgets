"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.subscriptionHints = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var subscriptionHints = _ObjectMap.ObjectMap.fromObject({
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

exports.subscriptionHints = subscriptionHints;
var _default = subscriptionHints;
exports["default"] = _default;
//# sourceMappingURL=subscriptionHints.js.map
