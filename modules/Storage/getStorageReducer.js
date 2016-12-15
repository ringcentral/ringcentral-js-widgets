'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.getStatusReducer = getStatusReducer;
exports.getDataReducer = getDataReducer;
exports.getStorageKeyReducer = getStorageKeyReducer;
exports.default = getStorageReducer;

var _redux = require('redux');

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _moduleStatus2.default.pending;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.init:
        return _moduleStatus2.default.ready;
      case types.reset:
        return _moduleStatus2.default.resetting;
      case types.resetSuccess:
        return _moduleStatus2.default.pending;
      default:
        return state;
    }
  };
}

function getDataReducer(_ref2) {
  var types = _ref2.types,
      reducers = _ref2.reducers;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
      case types.init:
        return action.data;
      case types.sync:
        return (0, _extends4.default)({}, state, (0, _defineProperty3.default)({}, action.key, action.value));
      case types.resetSuccess:
        return {};
      default:
        {
          var newState = {};
          var hasChange = false;
          // compute new substates and check for changes
          /* eslint-disable guard-for-in */
          for (var key in reducers) {
            newState[key] = reducers[key](state[key], action);
            if (newState[key] !== state[key]) hasChange = true;
          }
          return hasChange ? newState : state;
        }
    }
  };
}

function getStorageKeyReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        storageKey = _ref3.storageKey;

    switch (type) {

      case types.init:
        return storageKey;

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}

function getStorageReducer(_ref4) {
  var types = _ref4.types,
      reducers = _ref4.reducers;

  return (0, _redux.combineReducers)({
    status: getStatusReducer(types),
    data: getDataReducer({ types: types, reducers: reducers }),
    storageKey: getStorageKeyReducer(types)
  });
}
//# sourceMappingURL=getStorageReducer.js.map
