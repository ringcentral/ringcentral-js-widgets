'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = {
  pending: 'PENDING', // after init, before status from platform is determined
  notLoggedIn: 'NOT_LOGGED_IN',
  loggingIn: 'LOGGING_IN',
  loggedIn: 'LOGGED_IN',
  loggingOut: 'LOGGING_OUT'
};

exports.default = new _keyValueMap2.default(definition);
//# sourceMappingURL=auth-status.js.map
