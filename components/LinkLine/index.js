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

var _IconLine = require('../IconLine');

var _IconLine2 = _interopRequireDefault(_IconLine);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LinkLine(_ref) {
  var _onClick = _ref.onClick,
      className = _ref.className,
      children = _ref.children;

  return _react2.default.createElement(
    'a',
    {
      onClick: function onClick(e) {
        e.preventDefault();
        _onClick();
      },
      className: _styles2.default.link
    },
    _react2.default.createElement(
      _IconLine2.default,
      {
        className: className,
        icon: _react2.default.createElement('span', { className: (0, _classnames2.default)(_DynamicsFont2.default.arrow, _styles2.default.icon) })
      },
      children
    )
  );
}

LinkLine.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired
};
LinkLine.defaultProps = {
  children: undefined,
  className: undefined
};
exports.default = LinkLine;
//# sourceMappingURL=index.js.map
