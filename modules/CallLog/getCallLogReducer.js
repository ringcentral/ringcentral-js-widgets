'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _removeUri = require('../../lib/removeUri');

var _removeUri2 = _interopRequireDefault(_removeUri);

var _callActions = require('../../enums/callActions');

var _callActions2 = _interopRequireDefault(_callActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processRecords() {
  var records = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var supplementRecords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var ids = {};
  var output = [];
  function processCall(call) {
    if (!ids[call.id] && call.action !== _callActions2.default.findMe) {
      output.push((0, _callLogHelpers.normalizeStartTime)((0, _removeUri2.default)(call)));
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
          var indexMap = {};
          var newState = [];
          var _cutOffTime = (0, _getDateFrom2.default)(daySpan).getTime();
          // filter old calls
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
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
    status: (0, _getModuleStatusReducer2.default)(types)
  }));
}
//# sourceMappingURL=getCallLogReducer.js.map
