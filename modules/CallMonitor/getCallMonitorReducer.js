'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.getCallMatchedReducer = getCallMatchedReducer;
exports.default = getCallMonitorReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCallMatchedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        sessionId = _ref.sessionId,
        toEntityId = _ref.toEntityId;

    if (type === types.setData) {
      return (0, _extends4.default)({}, state, (0, _defineProperty3.default)({}, sessionId, toEntityId));
    }
    return state;
  };
}
/* istanbul ignore next: unnecessary to test getModuleStatusReducer */
function getCallMonitorReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types)
  });
}
//# sourceMappingURL=getCallMonitorReducer.js.map
