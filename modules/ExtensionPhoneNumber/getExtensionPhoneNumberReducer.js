'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getExtensionPhoneNumberReducer;

var _ActionMap = require('../../lib/ActionMap');

var _extensionPhoneNumberActions = require('./extensionPhoneNumberActions');

var _extensionPhoneNumberActions2 = _interopRequireDefault(_extensionPhoneNumberActions);

var _extensionPhoneNumberStatus = require('./extensionPhoneNumberStatus');

var _extensionPhoneNumberStatus2 = _interopRequireDefault(_extensionPhoneNumberStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getExtensionPhoneNumberReducer(prefix) {
  var actions = (0, _ActionMap.prefixActions)({ actions: _extensionPhoneNumberActions2.default, prefix: prefix });
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
//# sourceMappingURL=getExtensionPhoneNumberReducer.js.map
