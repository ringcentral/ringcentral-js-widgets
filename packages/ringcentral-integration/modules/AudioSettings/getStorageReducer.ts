import { find } from 'ramda';
import { combineReducers } from 'redux';

function getOutputDeviceIdReducer(types) {
  return (
    state = 'default',
    { type, devices = [], outputDeviceId = state },
  ) => {
    switch (type) {
      case types.setData: {
        return outputDeviceId;
      }
      case types.setAvailableDevices:
      case types.getUserMediaError: {
        const isDeviceExist = find(
          (device) =>
            device.deviceId === state && device.kind === 'audiooutput',
          devices,
        );
        if (isDeviceExist) {
          return state;
        }
        // For Firefox, don't have default device id
        const hasDefaultDevice = find(
          (device) =>
            device.deviceId === 'default' && device.kind === 'audiooutput',
          devices,
        );
        const firstDevice = find(
          (device) => device.kind === 'audiooutput',
          devices,
        );
        if (!hasDefaultDevice && firstDevice) {
          return firstDevice.deviceId;
        }
        return 'default';
      }
      default:
        return state;
    }
  };
}

function getInputDeviceIdReducer(types) {
  return (state = 'default', { type, devices = [], inputDeviceId = state }) => {
    switch (type) {
      case types.setData: {
        return inputDeviceId;
      }
      case types.setAvailableDevices:
      case types.getUserMediaError: {
        if (
          find(
            (device) =>
              device.deviceId === state && device.kind === 'audioinput',
            devices,
          )
        ) {
          return state;
        }
        // For Firefox, don't have default device id
        const hasDefaultDevice = find(
          (device) =>
            device.deviceId === 'default' && device.kind === 'audioinput',
          devices,
        );
        const firstDevice = find(
          (device) => device.kind === 'audioinput',
          devices,
        );
        if (!hasDefaultDevice && firstDevice) {
          return firstDevice.deviceId;
        }
        return 'default';
      }
      default:
        return state;
    }
  };
}

function getDialButtonVolumeReducer(types) {
  return (state = 1, { type, dialButtonVolume = state }) => {
    if (type === types.setData) {
      return Math.min(1, Math.max(0, dialButtonVolume));
    }
    return state;
  };
}
function getDialButtonMutedReducer(types) {
  return (state = false, { type, dialButtonMuted = state }) => {
    if (type === types.setData) {
      return !!dialButtonMuted;
    }
    return state;
  };
}
function getRingtoneVolumeReducer(types) {
  return (state = 0.3, { type, ringtoneVolume = state }) => {
    if (type === types.setData) {
      return Math.min(1, Math.max(0, ringtoneVolume));
    }
    return state;
  };
}
function getRingtoneMutedReducer(types) {
  return (state = false, { type, ringtoneMuted = state }) => {
    if (type === types.setData) {
      return !!ringtoneMuted;
    }
    return state;
  };
}
function getCallVolumeReducer(types) {
  return (state = 1, { type, callVolume = state }) => {
    if (type === types.setData) {
      return Math.min(1, Math.max(0.1, callVolume));
    }
    return state;
  };
}

export function getHasAutoPromptedReducer(types) {
  return (state = false, { type }) => {
    switch (type) {
      case types.autoPrompted:
        return true;
      default:
        return state;
    }
  };
}

export default function getStorageReducer(types) {
  return combineReducers({
    dialButtonVolume: getDialButtonVolumeReducer(types),
    dialButtonMuted: getDialButtonMutedReducer(types),
    ringtoneVolume: getRingtoneVolumeReducer(types),
    ringtoneMuted: getRingtoneMutedReducer(types),
    callVolume: getCallVolumeReducer(types),
    outputDeviceId: getOutputDeviceIdReducer(types),
    inputDeviceId: getInputDeviceIdReducer(types),
    hasAutoPrompted: getHasAutoPromptedReducer(types),
  });
}
