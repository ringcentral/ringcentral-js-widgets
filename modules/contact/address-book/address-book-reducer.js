'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = getReducer;

var _reduxHelper = require('../../../lib/redux-helper');

var _addressBookActions = require('./address-book-actions');

var _addressBookActions2 = _interopRequireDefault(_addressBookActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  addressBook: null,
  addressBookLoading: false,
  addressBookError: null
};

function getReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)({ actions: _addressBookActions2.default, prefix: prefix });

  return function (state, action) {
    if (typeof state === 'undefined') return (0, _assign2.default)({}, initialState);
    if (!action) return state;
    switch (action.type) {

      case actions.loadAddressBook:
        return (0, _assign2.default)({}, state, {
          addressBookLoading: true
        });
      case actions.loadAddressBookSuccess:
        return (0, _assign2.default)({}, state, {
          addressBook: action.payload,
          addressBookLoading: false,
          addressBookError: null
        });
      case actions.loadAddressBookFailed:
        return (0, _assign2.default)({}, state, {
          addressBookLoading: false,
          addressBookError: action.error
        });

      default:
        return state;
    }
  };
}
//# sourceMappingURL=address-book-reducer.js.map
