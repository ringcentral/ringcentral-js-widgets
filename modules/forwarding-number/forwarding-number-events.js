'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _forwardingNumberStatus = require('./forwarding-number-status');

var _forwardingNumberStatus2 = _interopRequireDefault(_forwardingNumberStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _keyValueMap2.default((0, _extends3.default)({}, _forwardingNumberStatus2.default, {
  statusChange: 'STATUS_CHANGE',
  forwardingNumberChange: 'FORWARDING_NUMBER_CHANGE',
  error: 'ERROR'
}));
//# sourceMappingURL=forwarding-number-events.js.map
