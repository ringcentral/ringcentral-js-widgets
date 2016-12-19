'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusReducer = getStatusReducer;
exports.getChangedReducer = getChangedReducer;
exports.getServerReducer = getServerReducer;
exports.getEnabledReducer = getEnabledReducer;
exports.default = getEnvironmentReducer;

var _redux = require('redux');

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _moduleStatus2.default.pending;
    var _ref = arguments[1];
    var type = _ref.type;

    if (type === types.init) return _moduleStatus2.default.ready;
    return state;
  };
}

function getChangedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        environmentChanged = _ref2.environmentChanged;

    if (type === types.setData) return environmentChanged;
    return false;
  };
}

function getServerReducer(_ref3) {
  var types = _ref3.types,
      defaultServer = _ref3.defaultServer;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultServer;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        server = _ref4.server;

    if (type === types.setData) return server;
    return state;
  };
}

function getEnabledReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref5 = arguments[1];
    var type = _ref5.type,
        enabled = _ref5.enabled;

    if (type === types.setData) return enabled;
    return state;
  };
}

function getEnvironmentReducer(types) {
  return (0, _redux.combineReducers)({
    status: getStatusReducer(types),
    changed: getChangedReducer(types)
  });
}
//# sourceMappingURL=getEnvironmentReducer.js.map
