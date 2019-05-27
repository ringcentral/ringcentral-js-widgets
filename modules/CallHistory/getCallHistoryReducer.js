"use strict";

require("core-js/modules/es6.array.find-index");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEndedCallsReducer = getEndedCallsReducer;
exports.getSearchInputReducer = getSearchInputReducer;
exports.getCallsFilterReducer = getCallsFilterReducer;
exports["default"] = getCallHistoryReducer;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.filter");

var _redux = require("redux");

var _ramda = require("ramda");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_CLEAN_TIME = 24 * 60 * 60 * 1000; // 1day

function getEndedCallsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        endedCalls = _ref.endedCalls,
        timestamp = _ref.timestamp;

    switch (type) {
      case types.addEndedCalls:
        {
          var newState = state.slice();
          (0, _ramda.forEach)(function (call) {
            var callWithDuration = _objectSpread({}, call, {
              duration: Math.floor((timestamp - call.startTime) / 1000)
            });

            var idx = (0, _ramda.findIndex)(function (item) {
              return item.sessionId === call.sessionId;
            }, newState);

            if (idx > -1) {
              // replace old one if found
              newState[idx] = callWithDuration;
            } else {
              newState.push(callWithDuration);
            }
          }, endedCalls);
          return newState;
        }

      case types.removeEndedCalls:
        return state.filter(function (call) {
          return !endedCalls.find(function (shouldRemove) {
            return shouldRemove.sessionId === call.sessionId;
          }) || // clean current overdue ended call (default clean time: 1day).
          new Date().getTime() - call.startTime > DEFAULT_CLEAN_TIME;
        });

      case types.resetSuccess:
        return [];

      default:
        return state;
    }
  };
}

function getSearchInputReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        _ref2$input = _ref2.input,
        input = _ref2$input === void 0 ? '' : _ref2$input;

    switch (type) {
      case types.updateSearchInput:
        return input;

      case types.resetSuccess:
        return '';

      default:
        return state;
    }
  };
}

function getCallsFilterReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        _ref3$data = _ref3.data,
        data = _ref3$data === void 0 ? [] : _ref3$data;

    switch (type) {
      case types.filterSuccess:
        return data;

      default:
        return state;
    }
  };
}
/* istanbul ignore next: unnecessary to test getModuleStatusReducer */


function getCallHistoryReducer(types, reducers) {
  return (0, _redux.combineReducers)(_objectSpread({}, reducers, {
    searchInput: getSearchInputReducer(types),
    filterCalls: getCallsFilterReducer(types),
    status: (0, _getModuleStatusReducer["default"])(types)
  }));
}
//# sourceMappingURL=getCallHistoryReducer.js.map
