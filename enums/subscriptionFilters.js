'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HashMap = require('../lib/HashMap');

var _HashMap2 = _interopRequireDefault(_HashMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _HashMap2.default({
  presence: '/account/~/extension/~/presence',
  detailedPresence: '/account/~/extension/~/presence?detailedTelephonyState=true',
  detailedPresenceWithSip: '/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true',
  accountExtension: '/account/~/extension',
  extensionInfo: '/account/~/extension/~'
});
//# sourceMappingURL=subscriptionFilters.js.map
