'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getStorageReducer;

var _redux = require('redux');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOutputDeviceIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
    var _ref = arguments[1];
    var type = _ref.type,
        _ref$devices = _ref.devices,
        devices = _ref$devices === undefined ? [] : _ref$devices,
        _ref$outputDeviceId = _ref.outputDeviceId,
        outputDeviceId = _ref$outputDeviceId === undefined ? state : _ref$outputDeviceId;

    switch (type) {
      case types.setData:
        return outputDeviceId;
      case types.setAvailableDevices:
      case types.getUserMediaError:
        if (_ramda2.default.find(function (device) {
          return device.deviceId === state && device.kind === 'audiooutput';
        }, devices)) {
          return state;
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
    var _ref2 = arguments[1];
    var type = _ref2.type,
        _ref2$devices = _ref2.devices,
        devices = _ref2$devices === undefined ? [] : _ref2$devices,
        _ref2$inputDeviceId = _ref2.inputDeviceId,
        inputDeviceId = _ref2$inputDeviceId === undefined ? state : _ref2$inputDeviceId;

    switch (type) {
      case types.setData:
        return inputDeviceId;
      case types.setAvailableDevices:
      case types.getUserMediaError:
        if (_ramda2.default.find(function (device) {
          return device.deviceId === state && device.kind === 'audioinput';
        }, devices)) {
          return state;
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
    var _ref3 = arguments[1];
    var type = _ref3.type,
        _ref3$dialButtonVolum = _ref3.dialButtonVolume,
        dialButtonVolume = _ref3$dialButtonVolum === undefined ? state : _ref3$dialButtonVolum;

    if (type === types.setData) {
      return Math.min(1, Math.max(0, dialButtonVolume));
    }
    return state;
  };
}
function getDialButtonMutedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        _ref4$dialButtonMuted = _ref4.dialButtonMuted,
        dialButtonMuted = _ref4$dialButtonMuted === undefined ? state : _ref4$dialButtonMuted;

    if (type === types.setData) {
      return !!dialButtonMuted;
    }
    return state;
  };
}
function getRingtoneVolumeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.3;
    var _ref5 = arguments[1];
    var type = _ref5.type,
        _ref5$ringtoneVolume = _ref5.ringtoneVolume,
        ringtoneVolume = _ref5$ringtoneVolume === undefined ? state : _ref5$ringtoneVolume;

    if (type === types.setData) {
      return Math.min(1, Math.max(0, ringtoneVolume));
    }
    return state;
  };
}
function getRingtoneMutedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref6 = arguments[1];
    var type = _ref6.type,
        _ref6$ringtoneMuted = _ref6.ringtoneMuted,
        ringtoneMuted = _ref6$ringtoneMuted === undefined ? state : _ref6$ringtoneMuted;

    if (type === types.setData) {
      return !!ringtoneMuted;
    }
    return state;
  };
}
function getCallVolumeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var _ref7 = arguments[1];
    var type = _ref7.type,
        _ref7$callVolume = _ref7.callVolume,
        callVolume = _ref7$callVolume === undefined ? state : _ref7$callVolume;

    if (type === types.setData) {
      return Math.min(1, Math.max(0.1, callVolume));
    }
    return state;
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
    inputDeviceId: getInputDeviceIdReducer(types)
  });
}
//# sourceMappingURL=getStorageReducer.js.map
