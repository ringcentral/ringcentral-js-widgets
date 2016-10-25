'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.getDataReducer = getDataReducer;
exports.getStorageKeyReducer = getStorageKeyReducer;
exports.getStatusReducer = getStatusReducer;
exports.default = getStorageReducer;

var _redux = require('redux');

var _Enum = require('../../lib/Enum');

var _storageActionTypes = require('./storageActionTypes');

var _storageActionTypes2 = _interopRequireDefault(_storageActionTypes);

var _storageStatus = require('./storageStatus');

var _storageStatus2 = _interopRequireDefault(_storageStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDataReducer(prefix) {
  var types = (0, _Enum.prefixEnum)({ enumMap: _storageActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        data = _ref.data,
        key = _ref.key,
        value = _ref.value;

    var result = void 0;
    switch (type) {

      case types.init:
        return data;

      case types.set:
        return (0, _extends4.default)({}, state, (0, _defineProperty3.default)({}, key, value));

      case types.remove:
        result = (0, _extends4.default)({}, state);
        delete result[key];
        return result;

      case types.load:
        return data;

      case types.reset:
        return {};

      default:
        return state;
    }
  };
}

function getStorageKeyReducer(prefix) {
  var types = (0, _Enum.prefixEnum)({ enumMap: _storageActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        storageKey = _ref2.storageKey;

    switch (type) {

      case types.init:
        return storageKey;

      case types.reset:
        return null;

      default:
        return state;
    }
  };
}

function getStatusReducer(prefix) {
  var types = (0, _Enum.prefixEnum)({ enumMap: _storageActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _storageStatus2.default.pending;
    var _ref3 = arguments[1];
    var type = _ref3.type;

    switch (type) {

      case types.init:
        return _storageStatus2.default.ready;

      case types.reset:
        return _storageStatus2.default.pending;

      default:
        return state;
    }
  };
}

function getStorageReducer(prefix) {
  return (0, _redux.combineReducers)({
    data: getDataReducer(prefix),
    storageKey: getStorageKeyReducer(prefix),
    status: getStatusReducer(prefix)
  });
}
//# sourceMappingURL=getStorageReducer.js.map
