'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ratio = function Ratio(props) {
  var style = {
    fontSize: props.size + 'em'
  };
  return _react2.default.createElement(
    'div',
    { style: style },
    props.children
  );
};

Ratio.propTypes = {
  children: _react2.default.PropTypes.element,
  size: _react2.default.PropTypes.number
};

exports.default = Ratio;