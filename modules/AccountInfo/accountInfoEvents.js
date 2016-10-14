'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _accountInfoStatus = require('./accountInfoStatus');

var _accountInfoStatus2 = _interopRequireDefault(_accountInfoStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _keyValueMap2.default((0, _extends3.default)({}, _accountInfoStatus2.default, {
  statusChange: 'STATUS_CHANGE',
  accountInfoChange: 'ACCOUNT_INFO_CHANGE',
  error: 'ERROR'
}));
//# sourceMappingURL=accountInfoEvents.js.map
