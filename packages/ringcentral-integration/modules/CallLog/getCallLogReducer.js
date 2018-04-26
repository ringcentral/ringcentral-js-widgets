import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import getDateFrom from '../../lib/getDateFrom';
import {
  normalizeStartTime,
  sortByStartTime,
} from '../../lib/callLogHelpers';
import removeUri from '../../lib/removeUri';
import callActions from '../../enums/callActions';


function processRecords(records = [], supplementRecords = []) {
  const ids = {};
  const output = [];
  function processCall(call) {
    if (
      !ids[call.id] &&
      call.action !== callActions.findMe
    ) {
      output.push(normalizeStartTime(removeUri(call)));
      ids[call.id] = true;
    }
  }
  records.forEach(processCall);
  supplementRecords.forEach(processCall);
  return output;
}

export function getDataReducer(types) {
  return (state = [], {
    type, records = [], supplementRecords = [], daySpan
  }) => {
    switch (type) {
      case types.init: {
        const cutOffTime = getDateFrom(daySpan).getTime();
        return state.filter(call => call.startTime > cutOffTime);
      }
      case types.fSyncSuccess:
      case types.iSyncSuccess: {
        const indexMap = {};
        const newState = [];
        const cutOffTime = getDateFrom(daySpan).getTime();
        // filter old calls
        state.forEach((call) => {
          if (call.startTime > cutOffTime) {
            indexMap[call.id] = newState.length;
            newState.push(call);
          }
        });
        processRecords(records, supplementRecords).forEach((call) => {
          if (call.startTime > cutOffTime) {
            if (indexMap[call.id] > -1) {
              // replace the current data with new data
              newState[indexMap[call.id]] = call;
            } else {
              indexMap[call.id] = newState.length;
              newState.push(call);
            }
          }
        });
        newState.sort(sortByStartTime);
        return newState;
      }
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

export function getTokenReducer(types) {
  return (state = null, { type, syncToken }) => {
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

export function getTimestampReducer(types) {
  return (state = null, { type, timestamp }) => {
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
export default function getCallLogReducer(types, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
  });
}
