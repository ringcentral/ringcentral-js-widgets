'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToNumberFieldReducer = getToNumberFieldReducer;
exports.getRecipientReducer = getRecipientReducer;
exports.default = getReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('ringcentral-integration/lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getToNumberFieldReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var _ref = arguments[1];
    var type = _ref.type,
        phoneNumber = _ref.phoneNumber;

    switch (type) {
      case types.setToNumberField:
      case types.loadLastCallState:
      case types.call:
        return phoneNumber;
      case types.setRecipient:
      case types.clearToNumberField:
      case types.resetSuccess:
      case types.callSuccess:
        return '';
      default:
        return state;
    }
  };
}

function getRecipientReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        recipient = _ref2.recipient;

    switch (type) {
      case types.setRecipient:
      case types.loadLastCallState:
      case types.call:
        return recipient;
      case types.clearRecipient:
      case types.resetSuccess:
      case types.callSuccess:
        return null;
      default:
        return state;
    }
  };
}

function getReducer(actionTypes) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(actionTypes),
    toNumberField: getToNumberFieldReducer(actionTypes),
    recipient: getRecipientReducer(actionTypes)
  });
}
//# sourceMappingURL=getReducer.js.map
