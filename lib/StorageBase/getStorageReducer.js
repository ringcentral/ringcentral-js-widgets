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
exports.default = getStorageReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateInitialState(reducers) {
  var initialState = {};
  /* eslint-disable guard-for-in */
  for (var key in reducers) {
    initialState[key] = reducers[key](undefined, {});
  }
  return initialState;
}

function getDataReducer(_ref) {
  var types = _ref.types,
      reducers = _ref.reducers;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : calculateInitialState(reducers);
    var action = arguments[1];

    switch (action.type) {
      case types.initSuccess:
        return action.data;
      case types.sync:
        return (0, _extends4.default)({}, state, (0, _defineProperty3.default)({}, action.key, action.value));
      case types.resetSuccess:
        {
          var newState = {};
          // reset the data to initial states
          /* eslint-disable guard-for-in */
          for (var key in reducers) {
            newState[key] = reducers[key](undefined, action);
          }
          return newState;
        }
      default:
        {
          var _newState = {};
          var hasChange = false;
          // compute new substates and check for changes
          /* eslint-disable guard-for-in */
          for (var _key in reducers) {
            _newState[_key] = reducers[_key](state[_key], action);
            if (_newState[_key] !== state[_key]) hasChange = true;
          }
          return hasChange ? _newState : state;
        }
    }
  };
}

function getStorageKeyReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        storageKey = _ref2.storageKey;

    switch (type) {
      case types.initSuccess:
        return storageKey;

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}

function getStorageReducer(_ref3) {
  var types = _ref3.types,
      reducers = _ref3.reducers;

  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    data: getDataReducer({ types: types, reducers: reducers }),
    storageKey: getStorageKeyReducer(types)
  });
}
//# sourceMappingURL=getStorageReducer.js.map
