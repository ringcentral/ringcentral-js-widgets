'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IconLine;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _Line = require('../Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IconLine(props) {
  return _react2.default.createElement(
    _Line2.default,
    {
      className: props.className,
      onClick: props.onClick },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.content },
      props.children
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.iconHolder },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.icon },
        props.icon
      )
    )
  );
}

IconLine.propTypes = {
  children: _react.PropTypes.node,
  icon: _react.PropTypes.node,
  className: _react.PropTypes.string,
  onClick: _react.PropTypes.func
};
//# sourceMappingURL=index.js.map
