"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataReducer = getDataReducer;
exports.getTokenReducer = getTokenReducer;
exports.getTimestampReducer = getTimestampReducer;
exports.getLocalTimestampReducer = getLocalTimestampReducer;
exports["default"] = getCallLogReducer;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.for-each");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));

var _callLogHelpers = require("../../lib/callLogHelpers");

var _removeUri = _interopRequireDefault(require("../../lib/removeUri"));

var _callActions = _interopRequireDefault(require("../../enums/callActions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function processRecords() {
  var records = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var supplementRecords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ids = {};
  var output = [];

  function processCall(call) {
    if (!ids[call.id] && call.action !== _callActions["default"].findMe) {
      output.push((0, _callLogHelpers.normalizeStartTime)((0, _removeUri["default"])(call)));
      ids[call.id] = true;
    }
  }

  records.forEach(processCall);
  supplementRecords.forEach(processCall);
  return output;
}

function getDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        _ref$records = _ref.records,
        records = _ref$records === void 0 ? [] : _ref$records,
        _ref$supplementRecord = _ref.supplementRecords,
        supplementRecords = _ref$supplementRecord === void 0 ? [] : _ref$supplementRecord,
        daySpan = _ref.daySpan;

    switch (type) {
      case types.init:
        {
          var cutOffTime = (0, _getDateFrom["default"])(daySpan).getTime();
          return state.filter(function (call) {
            return call.startTime > cutOffTime;
          });
        }

      case types.fSyncSuccess:
      case types.iSyncSuccess:
        {
          var indexMap = {};
          var newState = [];

          var _cutOffTime = (0, _getDateFrom["default"])(daySpan).getTime(); // filter old calls


          state.forEach(function (call) {
            if (call.startTime > _cutOffTime) {
              indexMap[call.id] = newState.length;
              newState.push(call);
            }
          });
          processRecords(records, supplementRecords).forEach(function (call) {
            if (call.startTime > _cutOffTime) {
              if (indexMap[call.id] > -1) {
                // replace the current data with new data
                newState[indexMap[call.id]] = call;
              } else {
                indexMap[call.id] = newState.length;
                newState.push(call);
              }
            }
          });
          newState.sort(_callLogHelpers.sortByStartTime);
          return newState;
        }

      case types.resetSuccess:
        return [];

      default:
        return state;
    }
  };
}

function getTokenReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        syncToken = _ref2.syncToken;

    switch (type) {
      case types.iSyncSuccess:
      case types.fSyncSuccess:
        return syncToken;

      case types.resetSuccess:
      case types.clearToken:
        return null;

      default:
        return state;
    }
  };
}

function getTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        timestamp = _ref3.timestamp;

    switch (type) {
      case types.fSyncSuccess:
      case types.iSyncSuccess:
        return timestamp;

      case types.resetSuccess:
      case types.clearToken:
        return null;

      default:
        return state;
    }
  };
}

function getLocalTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        localTimestamp = _ref4.localTimestamp;

    switch (type) {
      case types.fSyncSuccess:
      case types.iSyncSuccess:
        return localTimestamp;

      case types.resetSuccess:
      case types.clearToken:
        return null;

      default:
        return state;
    }
  };
}
/* istanbul ignore next: unnecessary to test getModuleStatusReducer */


function getCallLogReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _redux.combineReducers)(_objectSpread({}, reducers, {
    status: (0, _getModuleStatusReducer["default"])(types)
  }));
}
//# sourceMappingURL=getCallLogReducer.js.map
