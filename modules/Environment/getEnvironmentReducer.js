'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChangeCounterReducer = getChangeCounterReducer;
exports.getServerReducer = getServerReducer;
exports.getEnabledReducer = getEnabledReducer;
exports.default = getEnvironmentReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChangeCounterReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var _ref = arguments[1];
    var type = _ref.type,
        environmentChanged = _ref.environmentChanged;

    if (type === types.setData && environmentChanged) return state + 1;
    return state;
  };
}

function getServerReducer(_ref2) {
  var types = _ref2.types,
      defaultServer = _ref2.defaultServer;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultServer;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        server = _ref3.server;

    if (type === types.setData) return server;
    return state;
  };
}

function getEnabledReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        enabled = _ref4.enabled;

    if (type === types.setData) return enabled;
    return state;
  };
}

function getEnvironmentReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    changeCounter: getChangeCounterReducer(types)
  });
}
//# sourceMappingURL=getEnvironmentReducer.js.map
