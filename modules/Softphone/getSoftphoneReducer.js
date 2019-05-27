"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSoftphoneStatusReducer = getSoftphoneStatusReducer;
exports.getConnectingPhoneNumberReducer = getConnectingPhoneNumberReducer;
exports["default"] = getSoftphoneReducer;

var _redux = require("redux");

var _softphoneStatus = _interopRequireDefault(require("./softphoneStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getSoftphoneStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _softphoneStatus["default"].idle;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.startToConnect:
        return _softphoneStatus["default"].connecting;

      case types.connectComplete:
        return _softphoneStatus["default"].idle;

      default:
        return state;
    }
  };
}

function getConnectingPhoneNumberReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
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
