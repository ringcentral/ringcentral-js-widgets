'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _extensionPhoneNumberStatus = require('./extensionPhoneNumberStatus');

var _extensionPhoneNumberStatus2 = _interopRequireDefault(_extensionPhoneNumberStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _keyValueMap2.default((0, _extends3.default)({}, _extensionPhoneNumberStatus2.default, {
  statusChange: 'STATUS_CHANGE',
  extensionPhoneNumberChange: 'EXTENSION_PHONE_NUMBER_CHANGE',
  error: 'ERROR'
}));
//# sourceMappingURL=extensionPhoneNumberEvents.js.map
