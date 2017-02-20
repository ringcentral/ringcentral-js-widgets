'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getSettingsReducer = getSettingsReducer;
exports.getValidityReducer = getValidityReducer;
exports.getTimestampReducer = getTimestampReducer;
exports.default = getStorageReducer;

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSettingsReducer(actionTypes) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        provider = _ref.provider,
        providerSettings = _ref.providerSettings;

    var newState = (0, _extends3.default)({}, state);
    switch (type) {
      case actionTypes.fetchSuccess:
        newState[provider.providerName] = providerSettings;
        return newState;

      case actionTypes.fetchError:
        delete newState[provider.providerName];
        return newState;

      case actionTypes.reset:
        return {};

      default:
        return state;
    }
  };
}

function getValidityReducer(actionTypes) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref2 = arguments[1];
    var type = _ref2.type,
        provider = _ref2.provider;

    var newState = (0, _extends3.default)({}, state);
    switch (type) {

      case actionTypes.fetch:
        delete newState[provider.providerName];
        return newState;

      case actionTypes.fetchSuccess:
        newState[provider.providerName] = true;
        return newState;

      case actionTypes.fetchError:
        newState[provider.providerName] = false;
        return newState;

      case actionTypes.reset:
        return {};

      default:
        return state;
    }
  };
}

function getTimestampReducer(actionTypes) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        timestamp = _ref3.timestamp;

    switch (type) {

      case actionTypes.fetchSuccess:
      case actionTypes.fetchError:
        return timestamp;

      case actionTypes.reset:
        return 0;

      default:
        return state;
    }
  };
}

function getStorageReducer(actionTypes) {
  return (0, _redux.combineReducers)({
    settings: getSettingsReducer(actionTypes),
    validity: getValidityReducer(actionTypes),
    timestamp: getTimestampReducer(actionTypes)
  });
}
//# sourceMappingURL=getStorageReducer.js.map
