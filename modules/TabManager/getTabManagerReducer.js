'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventReducer = getEventReducer;
exports.getActiveReducer = getActiveReducer;
exports.default = getTabManagerReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEventReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        event = _ref.event,
        args = _ref.args;

    if (type === types.event) {
      return {
        name: event,
        args: args
      };
    }
    return null;
  };
}
function getActiveReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        active = _ref2.active;

    switch (type) {
      case types.initSuccess:
      case types.mainTabIdChanged:
        return active;
      default:
        return state;
    }
  };
}

function getTabManagerReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    active: getActiveReducer(types),
    event: getEventReducer(types)
  });
}
//# sourceMappingURL=getTabManagerReducer.js.map
