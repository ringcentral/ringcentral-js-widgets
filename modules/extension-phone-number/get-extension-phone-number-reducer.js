'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getExtensionPhoneNumberReducer;

var _reduxHelper = require('../../lib/redux-helper');

var _extensionPhoneNumberActions = require('./extension-phone-number-actions');

var _extensionPhoneNumberActions2 = _interopRequireDefault(_extensionPhoneNumberActions);

var _extensionPhoneNumberStatus = require('./extension-phone-number-status');

var _extensionPhoneNumberStatus2 = _interopRequireDefault(_extensionPhoneNumberStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getExtensionPhoneNumberReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)({ actions: _extensionPhoneNumberActions2.default, prefix: prefix });
  return function (state, action) {
    if (!state) {
      return {
        status: _extensionPhoneNumberStatus2.default.pending,
        error: null
      };
    }
    if (!action) {
      return state;
    }
    switch (action.type) {
      case actions.ready:
        return {
          status: _extensionPhoneNumberStatus2.default.ready,
          error: null
        };
      case actions.fetch:
        return {
          status: _extensionPhoneNumberStatus2.default.fetching,
          error: null
        };
      case actions.fetchSuccess:
        return {
          status: _extensionPhoneNumberStatus2.default.ready,
          error: null
        };
      case actions.fetchError:
        return {
          status: _extensionPhoneNumberStatus2.default.ready,
          error: action.error
        };
      case actions.reset:
        return {
          status: _extensionPhoneNumberStatus2.default.pending,
          error: null
        };
      default:
        return state;
    }
  };
}
//# sourceMappingURL=get-extension-phone-number-reducer.js.map
