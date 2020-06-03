"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HashMap = require("../lib/HashMap");

var _default = (0, _HashMap.createHashMap)({
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

exports["default"] = _default;
//# sourceMappingURL=subscriptionHints.js.map
