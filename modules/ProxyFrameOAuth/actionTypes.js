'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _Enum = require('ringcentral-integration/lib/Enum');

var _Enum2 = _interopRequireDefault(_Enum);

var _baseActionTypes = require('../../lib/OAuthBase/baseActionTypes');

var _baseActionTypes2 = _interopRequireDefault(_baseActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Enum2.default([].concat((0, _toConsumableArray3.default)((0, _keys2.default)(_baseActionTypes2.default)), ['setupProxy', 'proxyRetry']), 'proxyFrameOAuth');
//# sourceMappingURL=actionTypes.js.map
