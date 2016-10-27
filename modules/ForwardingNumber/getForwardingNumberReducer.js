'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusReducer = getStatusReducer;
exports.getErrorReducer = getErrorReducer;
exports.default = getAccountInfoReducer;

var _redux = require('redux');

var _Enum = require('../../lib/Enum');

var _forwardingNumberActionTypes = require('./forwardingNumberActionTypes');

var _forwardingNumberActionTypes2 = _interopRequireDefault(_forwardingNumberActionTypes);

var _forwardingNumberStatus = require('./forwardingNumberStatus');

var _forwardingNumberStatus2 = _interopRequireDefault(_forwardingNumberStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStatusReducer(prefix) {
  var prefixedTypes = (0, _Enum.prefixEnum)({ enumMap: _forwardingNumberActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _forwardingNumberStatus2.default.pending;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case prefixedTypes.fetch:
        return _forwardingNumberStatus2.default.fetching;

      case prefixedTypes.init:
      case prefixedTypes.fetchSuccess:
        return _forwardingNumberStatus2.default.ready;

      case prefixedTypes.fetchError:
        return _forwardingNumberStatus2.default.error;

      case prefixedTypes.reset:
        return _forwardingNumberStatus2.default.pending;
      default:
        return state;
    }
  };
}

function getErrorReducer(prefix) {
  var prefixedTypes = (0, _Enum.prefixEnum)({ enumMap: _forwardingNumberActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        error = _ref2.error;

    switch (type) {
      case prefixedTypes.init:
      case prefixedTypes.fetch:
      case prefixedTypes.fetchSuccess:
      case prefixedTypes.reset:
        return null;

      case prefixedTypes.fetchError:
        return error;

      default:
        return state;
    }
  };
}

function getAccountInfoReducer(prefix) {
  return (0, _redux.combineReducers)({
    status: getStatusReducer(prefix),
    error: getErrorReducer(prefix)
  });
}
//# sourceMappingURL=getForwardingNumberReducer.js.map
