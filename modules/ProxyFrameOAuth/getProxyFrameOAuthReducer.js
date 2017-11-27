'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProxyRetryCountReducer = getProxyRetryCountReducer;
exports.default = getAuthReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('ringcentral-integration/lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _getOAuthBaseReducer = require('../../lib/OAuthBase/getOAuthBaseReducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProxyRetryCountReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.setupProxy:
      case types.clearOAuth:
      case types.setupOAuth:
        return 0;
      case types.proxyRetry:
        return state + 1;
      default:
        return state;
    }
  };
}

function getAuthReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    oAuthReady: (0, _getOAuthBaseReducer.getOAuthReadyReducer)(types),
    proxyRetryCount: getProxyRetryCountReducer(types)
  });
}
//# sourceMappingURL=getProxyFrameOAuthReducer.js.map
