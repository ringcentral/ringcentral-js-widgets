import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getChangeCounterReducer(types) {
  return (state = 0, { type, environmentChanged }) => {
    if (type === types.setData && environmentChanged) return state + 1;
    return state;
  };
}

export function getServerReducer({ types, defaultServer }) {
  return (state = defaultServer, { type, server }) => {
    if (type === types.setData) return server;
    return state;
  };
}

export function getRecordingHostReducer({ types, defaultRecordingHost }) {
  return (state = defaultRecordingHost, { type, recordingHost }) => {
    if (type === types.setData) return recordingHost;
    return state;
  };
}

export function getEnabledReducer(types) {
  return (state = false, { type, enabled }) => {
    if (type === types.setData) return enabled;
    return state;
  };
}

export default function getEnvironmentReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    changeCounter: getChangeCounterReducer(types),
  });
}
