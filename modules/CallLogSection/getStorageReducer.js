'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends6 = require('babel-runtime/helpers/extends');

var _extends7 = _interopRequireDefault(_extends6);

exports.default = getStorageReducer;

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCallsMappingReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        identify = _ref.identify;

    switch (type) {
      case types.update:
        return (0, _extends7.default)({}, state, (0, _defineProperty3.default)({}, identify, (0, _extends7.default)({}, state[identify], {
          isEdited: true
        })));
      case types.saving:
        return (0, _extends7.default)({}, state, (0, _defineProperty3.default)({}, identify, (0, _extends7.default)({}, state[identify])));
      case types.saveSuccess:
        return (0, _extends7.default)({}, state, (0, _defineProperty3.default)({}, identify, (0, _extends7.default)({}, state[identify], {
          isEdited: false
        })));
      case types.saveError:
        return (0, _extends7.default)({}, state, (0, _defineProperty3.default)({}, identify, (0, _extends7.default)({}, state[identify], {
          isEdited: true
        })));
      case types.cleanUp:
        return {};
      default:
        return state;
    }
  };
}

function getCallsListReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref2 = arguments[1];
    var type = _ref2.type,
        identify = _ref2.identify;

    switch (type) {
      case types.update:
      case types.saving:
      case types.saveSuccess:
      case types.saveError:
        return (0, _from2.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(state), [identify])));
      case types.cleanUp:
        return [];
      default:
        return state;
    }
  };
}

function getCurrentIdentifyReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        identify = _ref3.identify;

    switch (type) {
      case types.showLogSection:
        return identify;
      case types.closeLogSection:
        return null;
      default:
        return state;
    }
  };
}

function getCurrentNotificationIdentifyReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        identify = _ref4.identify;

    switch (type) {
      case types.showLogNotification:
        return identify;
      case types.closeLogNotification:
        return null;
      default:
        return state;
    }
  };
}

function getNotificationIsExpandReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref5 = arguments[1];
    var type = _ref5.type;

    switch (type) {
      case types.expandNotification:
        return true;
      case types.shrinkNotification:
      case types.closeLogNotification:
        return false;
      default:
        return state;
    }
  };
}

function getStorageReducer(types) {
  return (0, _redux.combineReducers)({
    callsList: getCallsListReducer(types),
    callsMapping: getCallsMappingReducer(types),
    currentIdentify: getCurrentIdentifyReducer(types),
    currentNotificationIdentify: getCurrentNotificationIdentifyReducer(types),
    notificationIsExpand: getNotificationIsExpandReducer(types)
  });
}
//# sourceMappingURL=getStorageReducer.js.map
