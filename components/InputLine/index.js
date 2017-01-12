'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _Line = require('../Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InputLine(props) {
  return _react2.default.createElement(
    _Line2.default,
    {
      className: props.className,
      onClick: props.onClick
    },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.label },
      props.label
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.inputHolder },
      props.children
    )
  );
}

InputLine.propTypes = {
  children: _react.PropTypes.node,
  label: _react.PropTypes.node,
  input: _react.PropTypes.node,
  className: _react.PropTypes.string,
  onClick: _react.PropTypes.func
};

exports.default = InputLine;
//# sourceMappingURL=index.js.map
