'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscriptionEventTypes = exports.subscriptionEvents = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _subscriptionStatus = require('./subscription-status');

var _subscriptionStatus2 = _interopRequireDefault(_subscriptionStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventDefinition = (0, _extends3.default)({
  message: '/restapi/v1.0/account/~/extension/~/message-store',
  presence: '/restapi/v1.0/account/~/extension/~/presence',
  telephony: '/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true',
  line: '/restapi/v1.0/account/~/extension/~/presence/line',
  linePresence: '/restapi/v1.0/account/~/extension/~/presence/line/presence',
  lineTelephony: '/restapi/v1.0/account/~/extension/~/presence/line/presence?detailedTelephonyState=true'
}, _subscriptionStatus2.default);

var subscriptionEvents = exports.subscriptionEvents = new _keyValueMap2.default(eventDefinition);

var eventTypeDefinition = {
  notification: 'NOTIFICATION',
  statusChanged: 'STATUS_CHANGED'
};

var subscriptionEventTypes = exports.subscriptionEventTypes = new _keyValueMap2.default(eventTypeDefinition);
//# sourceMappingURL=subscription-events.js.map
