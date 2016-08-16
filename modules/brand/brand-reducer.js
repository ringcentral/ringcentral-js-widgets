'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = getReducer;

var _brandActions = require('./brand-actions');

var _brandActions2 = _interopRequireDefault(_brandActions);

var _reduxHelper = require('../../lib/redux-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getReducer(initialState, prefix) {
  var actions = (0, _reduxHelper.prefixActions)(_brandActions2.default, prefix);
  return function (state, action) {
    if (typeof state === 'undefined') return (0, _assign2.default)({}, initialState);

    if (!action) return state;
    switch (action.type) {
      case actions.setBrand:
        return (0, _assign2.default)({}, state, {
          name: action.payload.name,
          id: action.payload.id
        });
      default:
        return state;
    }
  };
}
//# sourceMappingURL=brand-reducer.js.map
