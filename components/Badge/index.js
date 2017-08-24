'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Badge(_ref) {
  var className = _ref.className,
      name = _ref.name,
      children = _ref.children,
      onClick = _ref.onClick;

  return _react2.default.createElement(
    'div',
    {
      title: name,
      className: (0, _classnames2.default)(_styles2.default.root, className),
      onClick: onClick },
    children
  );
}

Badge.propTypes = {
  onClick: _propTypes2.default.func,
  className: _propTypes2.default.string,
  name: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.node.isRequired
};

Badge.defaultProps = {
  className: null,
  name: null,
  onClick: function onClick() {
    return null;
  }
};

exports.default = Badge;
//# sourceMappingURL=index.js.map
