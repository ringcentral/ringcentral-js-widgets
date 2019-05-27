"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataReducer = getDataReducer;
exports.getStorageKeyReducer = getStorageKeyReducer;
exports["default"] = getStorageReducer;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case types.initSuccess:
        return action.data;

      case types.sync:
        return _objectSpread({}, state, _defineProperty({}, action.key, action.value));

      case types.resetSuccess:
        {
          var newState = {}; // reset the data to initial states

          /* eslint-disable guard-for-in */

          for (var key in reducers) {
            newState[key] = reducers[key](undefined, action);
          }

          return newState;
        }

      default:
        {
          var _newState = {};
          var hasChange = false; // compute new substates and check for changes

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

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
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
    status: (0, _getModuleStatusReducer["default"])(types),
    data: getDataReducer({
      types: types,
      reducers: reducers
    }),
    storageKey: getStorageKeyReducer(types)
  });
}
//# sourceMappingURL=getStorageReducer.js.map
