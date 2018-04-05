'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSoftphoneStatusReducer = getSoftphoneStatusReducer;
exports.getConnectingPhoneNumberReducer = getConnectingPhoneNumberReducer;
exports.default = getSoftphoneReducer;

var _redux = require('redux');

var _softphoneStatus = require('./softphoneStatus');

var _softphoneStatus2 = _interopRequireDefault(_softphoneStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSoftphoneStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _softphoneStatus2.default.idle;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.startToConnect:
        return _softphoneStatus2.default.connecting;

      case types.connectComplete:
        return _softphoneStatus2.default.idle;

      default:
        return state;
    }
  };
}

function getConnectingPhoneNumberReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        phoneNumber = _ref2.phoneNumber;

    switch (type) {
      case types.startToConnect:
        return phoneNumber;

      case types.connectComplete:
        return null;

      default:
        return state;
    }
  };
}

function getSoftphoneReducer(types) {
  return (0, _redux.combineReducers)({
    softphoneStatus: getSoftphoneStatusReducer(types),
    connectingPhoneNumber: getConnectingPhoneNumberReducer(types)
  });
}
//# sourceMappingURL=getSoftphoneReducer.js.map
