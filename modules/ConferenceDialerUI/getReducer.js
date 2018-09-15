'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastSessionIdReducer = getLastSessionIdReducer;
exports.default = getReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('ringcentral-integration/lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _getReducer = require('../DialerUI/getReducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLastSessionIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        sessionId = _ref.sessionId;

    switch (type) {
      case types.setLastSessionId:
        return sessionId;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

function getReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    toNumberField: (0, _getReducer.getToNumberFieldReducer)(types),
    recipient: (0, _getReducer.getRecipientReducer)(types),
    lastSessionId: getLastSessionIdReducer(types)
  });
}
//# sourceMappingURL=getReducer.js.map
