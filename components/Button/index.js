'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Button;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Button(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      children = _ref.children;

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(className, _styles2.default.root, disabled && _styles2.default.disabled),
      onClick: !disabled && onClick },
    children
  );
}
Button.propTypes = {
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  onClick: _react.PropTypes.func,
  children: _react.PropTypes.node
};

Button.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined,
  children: undefined
};
//# sourceMappingURL=index.js.map
