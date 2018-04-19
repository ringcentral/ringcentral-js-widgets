'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

exports.default = getStorageReducer;

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCallsMappingReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        call = _ref.call,
        sessionId = _ref.sessionId;

    switch (type) {
      case types.update:
        return (0, _extends5.default)({}, state, (0, _defineProperty3.default)({}, sessionId, (0, _extends5.default)({}, state[sessionId], call)));
      case types.cleanUp:
        return {};
      default:
        return state;
    }
  };
}

function getTasksMappingReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref2 = arguments[1];
    var type = _ref2.type,
        task = _ref2.task,
        sessionId = _ref2.sessionId;

    switch (type) {
      case types.update:
        return (0, _extends5.default)({}, state, (0, _defineProperty3.default)({}, sessionId, (0, _extends5.default)({}, state[sessionId], task)));
      case types.cleanUp:
        return {};
      default:
        return state;
    }
  };
}

function getShowLogSectionReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref3 = arguments[1];
    var type = _ref3.type;

    switch (type) {
      case types.showLogSection:
        return true;
      case types.hideLogSection:
        return false;
      default:
        return state;
    }
  };
}

function getCurrentSessionIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        sessionId = _ref4.sessionId;

    switch (type) {
      case types.showLogSection:
        return sessionId;
      case types.hideLogSection:
        return null;
      default:
        return state;
    }
  };
}

function getStorageReducer(types) {
  return (0, _redux.combineReducers)({
    calls: getCallsMappingReducer(types),
    tasks: getTasksMappingReducer(types),
    show: getShowLogSectionReducer(types),
    currentSessionId: getCurrentSessionIdReducer(types)
  });
}
//# sourceMappingURL=getStorageReducer.js.map
