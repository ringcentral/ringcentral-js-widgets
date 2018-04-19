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

var _moduleActionTypes = require('ringcentral-integration/enums/moduleActionTypes');

var _moduleActionTypes2 = _interopRequireDefault(_moduleActionTypes);

var _proxyActionTypes = require('ringcentral-integration/enums/proxyActionTypes');

var _proxyActionTypes2 = _interopRequireDefault(_proxyActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Enum2.default([].concat((0, _toConsumableArray3.default)((0, _keys2.default)(_moduleActionTypes2.default)), (0, _toConsumableArray3.default)((0, _keys2.default)(_proxyActionTypes2.default)), ['syncClosed', 'syncMinimized', 'syncSize', 'syncFocus', 'syncPosition', 'showAdapter']), 'adapterModuleCore');
//# sourceMappingURL=baseActionTypes.js.map
