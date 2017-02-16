'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.getDataReducer = getDataReducer;
exports.getTokenReducer = getTokenReducer;
exports.getTimestampReducer = getTimestampReducer;
exports.default = getCallLogReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _getDateFrom = require('../../lib/getDateFrom');

var _getDateFrom2 = _interopRequireDefault(_getDateFrom);

var _callLogHelpers = require('../../lib/callLogHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        _ref$records = _ref.records,
        records = _ref$records === undefined ? [] : _ref$records,
        _ref$supplementRecord = _ref.supplementRecords,
        supplementRecords = _ref$supplementRecord === undefined ? [] : _ref$supplementRecord,
        daySpan = _ref.daySpan;

    switch (type) {
      case types.init:
        {
          var cutOffTime = (0, _getDateFrom2.default)(daySpan).getTime();
          return state.filter(function (call) {
            return call.startTime > cutOffTime;
          });
        }
      case types.fSyncSuccess:
      case types.iSyncSuccess:
        {
          var indexMap = new _map2.default();
          var newState = [];
          var _cutOffTime = (0, _getDateFrom2.default)(daySpan).getTime();
          // filter old calls
          state.forEach(function (call) {
            if (call.startTime > _cutOffTime) {
              indexMap.set(call.id, newState.length);
              newState.push(call);
            }
          });
          // push new records
          records.forEach(function (call) {
            if (call.startTime > _cutOffTime) {
              if (indexMap.has(call.id)) {
                // replace the current data with new data
                newState[indexMap.get(call.id)] = call;
              } else {
                indexMap.set(call.id, newState.length);
                newState.push(call);
              }
            }
          });
          // push supplement records
          supplementRecords.forEach(function (call) {
            if (call.startTime > _cutOffTime) {
              if (indexMap.has(call.id)) {
                // replace the current data with new data
                newState[indexMap.get(call.id)] = call;
              } else {
                indexMap.set(call.id, newState.length);
                newState.push(call);
              }
            }
          });
          newState.sort(_callLogHelpers.sortCallsByStartTime);
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
    var _ref2 = arguments[1];
    var type = _ref2.type,
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
    var _ref3 = arguments[1];
    var type = _ref3.type,
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

/* istanbul ignore next: unnecessary to test getModuleStatusReducer */
function getCallLogReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types)
  });
}
//# sourceMappingURL=getCallLogReducer.js.map
