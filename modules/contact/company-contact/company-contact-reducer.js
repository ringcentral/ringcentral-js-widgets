'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = getReducer;

var _reduxHelper = require('../../../lib/redux-helper');

var _companyContactActions = require('./company-contact-actions');

var _companyContactActions2 = _interopRequireDefault(_companyContactActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  companyContact: null,
  companyContactLoading: false,
  companyContactError: null
};

function getReducer(prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_companyContactActions2.default, prefix);

  return function (state, action) {
    if (typeof state === 'undefined') return (0, _assign2.default)({}, initialState);
    if (!action) return state;
    switch (action.type) {

      case actions.loadCompanyContact:
        return (0, _assign2.default)({}, state, {
          companyContactLoading: true
        });
      case actions.loadCompanyContactSuccess:
        return (0, _assign2.default)({}, state, {
          companyContact: action.payload,
          companyContactLoading: false,
          companyContactError: null
        });
      case actions.loadCompanyContactFailed:
        return (0, _assign2.default)({}, state, {
          companyContactLoading: false,
          companyContactError: action.error
        });

      default:
        return state;
    }
  };
}
//# sourceMappingURL=company-contact-reducer.js.map
