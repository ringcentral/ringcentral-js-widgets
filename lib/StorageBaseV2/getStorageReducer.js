"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataReducer = getDataReducer;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.key, action.value));

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
          var hasChange = false; // compute new sub states and check for changes

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
//# sourceMappingURL=getStorageReducer.js.map
