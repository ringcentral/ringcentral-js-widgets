'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAccountInfoReducer;

var _reduxHelper = require('../../lib/redux-helper');

var _accountInfoActions = require('./account-info-actions');

var _accountInfoActions2 = _interopRequireDefault(_accountInfoActions);

var _accountInfoStatus = require('./account-info-status');

var _accountInfoStatus2 = _interopRequireDefault(_accountInfoStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAccountInfoReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_accountInfoActions2.default, prefix);
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
//# sourceMappingURL=get-account-info-reducer.js.map
