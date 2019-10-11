"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HashMap = _interopRequireDefault(require("../lib/HashMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var hints = new _HashMap["default"]({
  limits: 'Limits',
  features: 'Features',
  accountStatus: 'AccountStatus',
  accountSettings: 'AccountSettings',
  companyNumbers: 'CompanyNumbers',
  dialingPlan: 'DialingPlan',
  permissions: 'Permissions',
  profileImage: 'ProfileImage',
  extensionInfo: 'ExtensionInfo'
});
var _default = hints;
exports["default"] = _default;
//# sourceMappingURL=subscriptionHints.js.map
