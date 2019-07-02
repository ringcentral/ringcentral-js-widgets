"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHasAutoPromptedReducer = getHasAutoPromptedReducer;
exports["default"] = getStorageReducer;

var _redux = require("redux");

var _ramda = require("ramda");

function getOutputDeviceIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        _ref$devices = _ref.devices,
        devices = _ref$devices === void 0 ? [] : _ref$devices,
        _ref$outputDeviceId = _ref.outputDeviceId,
        outputDeviceId = _ref$outputDeviceId === void 0 ? state : _ref$outputDeviceId;

    switch (type) {
      case types.setData:
        return outputDeviceId;

      case types.setAvailableDevices:
      case types.getUserMediaError:
        if ((0, _ramda.find)(function (device) {
          return device.deviceId === state && device.kind === 'audiooutput';
        }, devices)) {
          return state;
        } // For Firefox, don't have default device id


        if (state === 'default') {
          var firstDevice = (0, _ramda.find)(function (device) {
            return device.kind === 'audiooutput';
          }, devices);

          if (firstDevice) {
            return firstDevice.deviceId;
          }
        }

        return 'default';

      default:
        return state;
    }
  };
}

function getInputDeviceIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        _ref2$devices = _ref2.devices,
        devices = _ref2$devices === void 0 ? [] : _ref2$devices,
        _ref2$inputDeviceId = _ref2.inputDeviceId,
        inputDeviceId = _ref2$inputDeviceId === void 0 ? state : _ref2$inputDeviceId;

    switch (type) {
      case types.setData:
        return inputDeviceId;

      case types.setAvailableDevices:
      case types.getUserMediaError:
        if ((0, _ramda.find)(function (device) {
          return device.deviceId === state && device.kind === 'audioinput';
        }, devices)) {
          return state;
        } // For Firefox, don't have default device id


        if (state === 'default') {
          var firstDevice = (0, _ramda.find)(function (device) {
            return device.kind === 'audioinput';
          }, devices);

          if (firstDevice) {
            return firstDevice.deviceId;
          }
        }

        return 'default';

      default:
        return state;
    }
  };
}

function getDialButtonVolumeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        _ref3$dialButtonVolum = _ref3.dialButtonVolume,
        dialButtonVolume = _ref3$dialButtonVolum === void 0 ? state : _ref3$dialButtonVolum;

    if (type === types.setData) {
      return Math.min(1, Math.max(0, dialButtonVolume));
    }

    return state;
  };
}

function getDialButtonMutedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        _ref4$dialButtonMuted = _ref4.dialButtonMuted,
        dialButtonMuted = _ref4$dialButtonMuted === void 0 ? state : _ref4$dialButtonMuted;

    if (type === types.setData) {
      return !!dialButtonMuted;
    }

    return state;
  };
}

function getRingtoneVolumeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.3;

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        _ref5$ringtoneVolume = _ref5.ringtoneVolume,
        ringtoneVolume = _ref5$ringtoneVolume === void 0 ? state : _ref5$ringtoneVolume;

    if (type === types.setData) {
      return Math.min(1, Math.max(0, ringtoneVolume));
    }

    return state;
  };
}

function getRingtoneMutedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref6 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref6.type,
        _ref6$ringtoneMuted = _ref6.ringtoneMuted,
        ringtoneMuted = _ref6$ringtoneMuted === void 0 ? state : _ref6$ringtoneMuted;

    if (type === types.setData) {
      return !!ringtoneMuted;
    }

    return state;
  };
}

function getCallVolumeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var _ref7 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref7.type,
        _ref7$callVolume = _ref7.callVolume,
        callVolume = _ref7$callVolume === void 0 ? state : _ref7$callVolume;

    if (type === types.setData) {
      return Math.min(1, Math.max(0.1, callVolume));
    }

    return state;
  };
}

function getHasAutoPromptedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref8 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref8.type;

    switch (type) {
      case types.autoPrompted:
        return true;

      default:
        return state;
    }
  };
}

function getStorageReducer(types) {
  return (0, _redux.combineReducers)({
    dialButtonVolume: getDialButtonVolumeReducer(types),
    dialButtonMuted: getDialButtonMutedReducer(types),
    ringtoneVolume: getRingtoneVolumeReducer(types),
    ringtoneMuted: getRingtoneMutedReducer(types),
    callVolume: getCallVolumeReducer(types),
    outputDeviceId: getOutputDeviceIdReducer(types),
    inputDeviceId: getInputDeviceIdReducer(types),
    hasAutoPrompted: getHasAutoPromptedReducer(types)
  });
}
//# sourceMappingURL=getStorageReducer.js.map
