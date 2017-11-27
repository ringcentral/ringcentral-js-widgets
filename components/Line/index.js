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

function Line(props) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.root, props.className, props.onClick && _styles2.default.clickable, props.horizontal && _styles2.default.horizontal, props.noBorder && _styles2.default.noborder),
      onClick: props.onClick
    },
    props.children
  );
}

Line.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  onClick: _propTypes2.default.func,
  horizontal: _propTypes2.default.bool,
  noBorder: _propTypes2.default.bool
};

Line.defaultProps = {
  noBorder: false
};

exports.default = Line;
//# sourceMappingURL=index.js.map
