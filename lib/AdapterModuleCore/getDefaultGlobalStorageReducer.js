'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getClosedReducer = getClosedReducer;
exports.getMinimizedReducer = getMinimizedReducer;
exports.getSizeReducer = getSizeReducer;
exports.getPositionReducer = getPositionReducer;
exports.default = getDefaultGlobalStorageReducer;

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getClosedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref = arguments[1];
    var type = _ref.type,
        closed = _ref.closed;

    switch (type) {
      case types.syncClosed:
        return !!closed;
      case types.showAdapter:
        return false;
      default:
        return state;
    }
  };
}

function getMinimizedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        minimized = _ref2.minimized;

    switch (type) {
      case types.syncMinimized:
        return !!minimized;
      case types.showAdapter:
        return false;
      default:
        return state;
    }
  };
}

function getSizeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { width: 300, height: 500 };
    var _ref3 = arguments[1];
    var type = _ref3.type,
        _ref3$size = _ref3.size,
        size = _ref3$size === undefined ? {} : _ref3$size;

    switch (type) {
      case types.syncSize:
        return (0, _extends3.default)({}, state, size);
      default:
        return state;
    }
  };
}

function getPositionReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      translateX: null,
      translateY: null,
      minTranslateX: null
    };
    var _ref4 = arguments[1];
    var type = _ref4.type,
        _ref4$position = _ref4.position;
    _ref4$position = _ref4$position === undefined ? {} : _ref4$position;
    var _ref4$position$transl = _ref4$position.translateX,
        translateX = _ref4$position$transl === undefined ? state.translateX : _ref4$position$transl,
        _ref4$position$transl2 = _ref4$position.translateY,
        translateY = _ref4$position$transl2 === undefined ? state.translateY : _ref4$position$transl2,
        _ref4$position$minTra = _ref4$position.minTranslateX,
        minTranslateX = _ref4$position$minTra === undefined ? state.minTranslateX : _ref4$position$minTra;

    if (type === types.syncPosition) {
      return {
        translateX: translateX,
        translateY: translateY,
        minTranslateX: minTranslateX
      };
    }
    return state;
  };
}

function getDefaultGlobalStorageReducer(types) {
  return (0, _redux.combineReducers)({
    closed: getClosedReducer(types),
    minimized: getMinimizedReducer(types),
    size: getSizeReducer(types),
    position: getPositionReducer(types)
  });
}
//# sourceMappingURL=getDefaultGlobalStorageReducer.js.map
