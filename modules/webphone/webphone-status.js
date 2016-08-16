'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = {
  // For registering
  preRegister: 'PRE_REGISTER',
  registerSuccessed: 'REGISTER_SUCCESSED',
  registerFailed: 'REGISTER_FAILED',
  // For callout and active call
  callConnecting: 'CALL_CONNECTING',
  callConnected: 'CALL_CONNECTED',
  callFailed: 'CALL_FAILED',
  // For incoming call
  callIncoming: 'CALL_INCOMING'
};

exports.default = new _keyValueMap2.default(definition);
//# sourceMappingURL=webphone-status.js.map
