'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _Enum = require('../../lib/Enum');

var _Enum2 = _interopRequireDefault(_Enum);

var _moduleActionTypes = require('../../enums/moduleActionTypes');

var _moduleActionTypes2 = _interopRequireDefault(_moduleActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Enum2.default([].concat((0, _toConsumableArray3.default)((0, _keys2.default)(_moduleActionTypes2.default)), ['initLoad', 'loadSuccess', 'loadReset']), 'recentCalls');
//# sourceMappingURL=actionTypes.js.map
