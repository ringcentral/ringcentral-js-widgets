import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import { TimezoneActionTypes } from './actionTypes';

export function getTimezonesReducer(types: TimezoneActionTypes) {
  return (state = [], { type, timezones }) => {
    if (type === types.updateTimezones) {
      return timezones;
    }
    return state;
  };
}

export function getCacheExpiredAtReducer(types: TimezoneActionTypes) {
  return (state = null, { type, cacheExpiredAt }) => {
    if (type === types.updateCacheExpiredAt) {
      return cacheExpiredAt;
    }
    return state;
  };
}

export default function getReducer(types: TimezoneActionTypes) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    timezones: getTimezonesReducer(types),
    cacheExpiredAt: getCacheExpiredAtReducer(types),
  });
}
