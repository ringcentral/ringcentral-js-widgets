'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Closable = require('./Closable.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Closable = function Closable(props) {
  return _react2.default.createElement(
    'div',
    { className: props.className },
    _react2.default.createElement(
      'button',
      { className: _Closable.cancelButton, onClick: props.onClose },
      'Cancel'
    ),
    props.children
  );
};

Closable.propTypes = {
  className: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.node,
  onClose: _react2.default.PropTypes.func
};

exports.default = Closable;