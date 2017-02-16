'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCallMonitorReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next: unnecessary to test getModuleStatusReducer */
function getCallMonitorReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types)
  });
}
//# sourceMappingURL=getCallMonitorReducer.js.map
