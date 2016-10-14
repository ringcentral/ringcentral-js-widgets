'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getProxyServerReducer;

var _proxyActions = require('./proxyActions');

var _proxyActions2 = _interopRequireDefault(_proxyActions);

var _ActionMap = require('../ActionMap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param {String} prefix
 * @param {Object} transport
 * @param {Function} moduleReducer
 */
function getProxyServerReducer(prefix, transport, moduleReducer) {
  var actions = (0, _ActionMap.prefixActions)({ actions: _proxyActions2.default, prefix: prefix });
  return function (state, action) {
    if (!state) {
      return {
        module: moduleReducer(),
        lastAction: null,
        actionNumber: -1
      };
    }
    if (!action) {
      return state;
    }
    var nextActionNumber = state.actionNumber + 1;
    transport.push({
      payload: {
        type: actions.action,
        action: action,
        actionNumber: nextActionNumber
      }
    });
    return {
      module: moduleReducer(state.module, action),
      lastAction: action,
      actionNumber: nextActionNumber
    };
  };
}
//# sourceMappingURL=getProxyServerReducer.js.map
