import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

function getAvailableDevicesReducer(types) {
  return (state = [], { type, devices = [] }) => {
    switch (type) {
      case types.setAvailableDevices:
        return devices;
      case types.getUserMediaError:
      case types.reset:
        return [];
      default:
        return state;
    }
  };
}
export function getUserMediaReducer(types) {
  return (state = false, { type }) => {
    switch (type) {
      case types.getUserMediaSuccess:
        return true;
      case types.getUserMediaError:
        return false;
      default:
        return state;
    }
  };
}

export default function getCallingSettingsReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    availableDevices: getAvailableDevicesReducer(types),
    userMedia: getUserMediaReducer(types),
  });
}
