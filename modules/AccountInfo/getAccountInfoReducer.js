'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAccountInfoReducer;

var _ActionMap = require('../../lib/ActionMap');

var _accountInfoActions = require('./accountInfoActions');

var _accountInfoActions2 = _interopRequireDefault(_accountInfoActions);

var _accountInfoStatus = require('./accountInfoStatus');

var _accountInfoStatus2 = _interopRequireDefault(_accountInfoStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAccountInfoReducer(prefix) {
  var actions = (0, _ActionMap.prefixActions)({ actions: _accountInfoActions2.default, prefix: prefix });
  return function (state, action) {
    if (!state) {
      return {
        status: _accountInfoStatus2.default.pending,
        error: null
      };
    }
    if (!action) {
      return state;
    }
    switch (action.type) {
      case actions.ready:
        return {
          status: _accountInfoStatus2.default.ready,
          error: null
        };
      case actions.fetch:
        return {
          status: _accountInfoStatus2.default.fetching,
          error: null
        };
      case actions.fetchSuccess:
        return {
          status: _accountInfoStatus2.default.ready,
          error: null
        };
      case actions.fetchError:
        return {
          status: _accountInfoStatus2.default.ready,
          error: action.error
        };
      case actions.reset:
        return {
          status: _accountInfoStatus2.default.pending,
          error: null
        };
      default:
        return state;
    }
  };
}
//# sourceMappingURL=getAccountInfoReducer.js.map
