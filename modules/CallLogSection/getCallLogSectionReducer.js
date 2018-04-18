'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCallLogSectionReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('ringcentral-integration/lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCallLogSectionReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types)
  });
}
//# sourceMappingURL=getCallLogSectionReducer.js.map
