'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = function Menu(props) {
  return _react2.default.createElement(
    'div',
    null,
    props.candidates.map(function (val, index) {
      return _react2.default.createElement(
        'div',
        { key: index },
        val
      );
    })
  );
};

Menu.propTypes = {
  candidates: _react2.default.PropTypes.array
};

exports.default = Menu;