'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authEventTypes = exports.authEvents = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _loginStatus = require('./login-status');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventDefinitions = (0, _extends3.default)({}, _loginStatus2.default);

var authEvents = exports.authEvents = new _keyValueMap2.default(eventDefinitions);

var eventTypeDefinitions = {
  loginStatusChanged: 'LOGIN_STATUS_CHANGED'
};

var authEventTypes = exports.authEventTypes = new _keyValueMap2.default(eventTypeDefinitions);
//# sourceMappingURL=auth-events.js.map
