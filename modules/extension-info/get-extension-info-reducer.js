'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getExtensionInfoReducer;

var _reduxHelper = require('../../lib/redux-helper');

var _extensionInfoActions = require('./extension-info-actions');

var _extensionInfoActions2 = _interopRequireDefault(_extensionInfoActions);

var _extensionInfoStatus = require('./extension-info-status');

var _extensionInfoStatus2 = _interopRequireDefault(_extensionInfoStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getExtensionInfoReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_extensionInfoActions2.default, prefix);
  return function (state, action) {
    if (!state) {
      return {
        status: _extensionInfoStatus2.default.pending,
        error: null
      };
    }
    if (!action) {
      return state;
    }
    switch (action.type) {
      case actions.ready:
        return {
          status: _extensionInfoStatus2.default.ready,
          error: null
        };
      case actions.fetch:
        return {
          status: _extensionInfoStatus2.default.fetching,
          error: null
        };
      case actions.fetchSuccess:
        return {
          status: _extensionInfoStatus2.default.ready,
          error: null
        };
      case actions.fetchError:
        return {
          status: _extensionInfoStatus2.default.ready,
          error: action.error
        };
      case actions.reset:
        return {
          status: _extensionInfoStatus2.default.pending,
          error: null
        };
      default:
        return state;
    }
  };
}
//# sourceMappingURL=get-extension-info-reducer.js.map
