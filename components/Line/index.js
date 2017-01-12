'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Line(props) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.root, props.className, props.onClick && _styles2.default.clickable, props.horizontal && _styles2.default.horizontal),
      onClick: props.onClick
    },
    props.children
  );
}

Line.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  onClick: _react.PropTypes.func,
  horizontal: _react.PropTypes.bool
};

exports.default = Line;
//# sourceMappingURL=index.js.map
