import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

export function getCountryCodeReducer(types) {
  return (state = null, { type, countryCode = state }) => {
    if (type === types.setData) return countryCode;
    return state;
  };
}

export function getAreaCodeReducer(types) {
  return (state = '', { type, areaCode = state }) => {
    if (type === types.setData) return areaCode;
    return state;
  };
}

export default function getRegionSettingsReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
  });
}
