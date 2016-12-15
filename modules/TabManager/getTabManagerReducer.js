'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventReducer = getEventReducer;
exports.getStatusReducer = getStatusReducer;
exports.getActiveReducer = getActiveReducer;
exports.default = getTabManagerReducer;

var _redux = require('redux');

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

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

function getStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _moduleStatus2.default.pending;
    var _ref2 = arguments[1];
    var type = _ref2.type;

    switch (type) {
      case types.init:
        return _moduleStatus2.default.ready;
      default:
        return state;
    }
  };
}
function getActiveReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        active = _ref3.active;

    switch (type) {
      case types.init:
      case types.mainTabIdChanged:
        return active;
      default:
        return state;
    }
  };
}

function getTabManagerReducer(types) {
  return (0, _redux.combineReducers)({
    status: getStatusReducer(types),
    active: getActiveReducer(types),
    event: getEventReducer(types)
  });
}
//# sourceMappingURL=getTabManagerReducer.js.map
