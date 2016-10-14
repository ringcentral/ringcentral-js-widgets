'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _authStatus = require('./authStatus');

var _authStatus2 = _interopRequireDefault(_authStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventDefinitions = (0, _extends3.default)({}, _authStatus2.default, {
  authStatusChange: 'AUTH_STATUS_CHANGE',
  error: 'ERROR'
});

exports.default = new _keyValueMap2.default(eventDefinitions);
//# sourceMappingURL=authEvents.js.map
