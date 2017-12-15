'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DropdownNavigationItem;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DropdownNavigationItem(_ref) {
  var icon = _ref.icon,
      activeIcon = _ref.activeIcon,
      active = _ref.active,
      isReverseFillIcon = _ref.isReverseFillIcon,
      label = _ref.label,
      noticeCounts = _ref.noticeCounts,
      onClick = _ref.onClick;

  var notice = null;
  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = _react2.default.createElement(
        'div',
        { className: _styles2.default.notice },
        '99+'
      );
    } else {
      notice = _react2.default.createElement(
        'div',
        { className: _styles2.default.notice },
        noticeCounts
      );
    }
  }
  return _react2.default.createElement(
    'div',
    {
      title: label,
      onClick: onClick,
      className: (0, _classnames2.default)(_styles2.default.root, active && _styles2.default.active, isReverseFillIcon && _styles2.default.reverseFillIcon)
    },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.iconHolder },
      active ? activeIcon : icon
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.labelHolder },
      label
    ),
    notice
  );
}

DropdownNavigationItem.propTypes = {
  icon: _propTypes2.default.node.isRequired,
  activeIcon: _propTypes2.default.node.isRequired,
  active: _propTypes2.default.bool,
  isReverseFillIcon: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  noticeCounts: _propTypes2.default.number,
  onClick: _propTypes2.default.func
};

DropdownNavigationItem.defaultProps = {
  active: false,
  isReverseFillIcon: false,
  label: undefined,
  noticeCounts: undefined,
  onClick: undefined
};
//# sourceMappingURL=index.js.map
