'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.PhoneProvider = exports.Provider = undefined;

var _PhoneProvider = require('./PhoneProvider');

var _PhoneProvider2 = _interopRequireDefault(_PhoneProvider);

var _connect = require('./react-redux/src/components/connect');

var _connect2 = _interopRequireDefault(_connect);

var _Provider = require('./react-redux/src/components/Provider');

var _Provider2 = _interopRequireDefault(_Provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Provider = _Provider2.default;
exports.PhoneProvider = _PhoneProvider2.default;
exports.connect = _connect2.default;