'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getProxyServerReducer;

var _Enum = require('../Enum');

var _baseActionTypes = require('./baseActionTypes');

var _baseActionTypes2 = _interopRequireDefault(_baseActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProxyServerReducer(_ref) {
  var moduleReducer = _ref.moduleReducer,
      transport = _ref.transport,
      prefix = _ref.prefix;

  var actionTypes = (0, _Enum.prefixEnum)({ enumMap: _baseActionTypes2.default, prefix: prefix });
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      target: moduleReducer(undefined, {
        type: actionTypes.initModule
      }),
      lastAction: null,
      actionNumber: -1
    };
    var action = arguments[1];

    if (!action) return state;
    var nextActionNumber = state.actionNumber + 1;
    transport.push({
      payload: {
        type: actionTypes.action,
        action: action,
        actionNumber: nextActionNumber
      }
    });
    return {
      target: moduleReducer(state.target, action),
      lastAction: action,
      actionNumber: nextActionNumber
    };
  };
}
//# sourceMappingURL=getProxyServerReducer.js.map
