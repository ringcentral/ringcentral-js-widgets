'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _actions = require('./actions');

var initialState = {
  lang: 'en_us'
};

function reducer(state, action) {
  if (typeof state === 'undefined') return initialState;

  switch (action.type) {
    case _actions.SWITCH_LANGUAGE:
      return Object.assign({}, state, {
        lang: action.lang
      });
    default:
      return state;
  }
}