'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getProxyReducer;

var _redux = require('redux');

var _getProxyStatusReducer = require('../../lib/getProxyStatusReducer');

var _getProxyStatusReducer2 = _interopRequireDefault(_getProxyStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProxyReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getProxyStatusReducer2.default)(types)
  });
}
//# sourceMappingURL=getProxyReducer.js.map
