'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapActionCreators;

var _redux = require('redux');

function wrapActionCreators(actionCreators) {
  return function (dispatch) {
    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
  };
}