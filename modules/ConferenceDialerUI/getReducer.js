'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastSessionIdReducer = getLastSessionIdReducer;
exports.default = getReducer;

var _getReducer = require('../DialerUI/getReducer');

var _getReducer2 = _interopRequireDefault(_getReducer);

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
  return (0, _getReducer2.default)(types, {
    lastSessionId: getLastSessionIdReducer(types)
  });
}
//# sourceMappingURL=getReducer.js.map
