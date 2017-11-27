'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NavigationButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NavigationButton(_ref) {
  var active = _ref.active,
      icon = _ref.icon,
      label = _ref.label,
      noticeCounts = _ref.noticeCounts,
      onClick = _ref.onClick,
      width = _ref.width;

  var notice = null;
  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = _react2.default.createElement(
        'div',
        { className: _styles2.default.notices },
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
      onClick: onClick,
      className: (0, _classnames2.default)(_styles2.default.navigationButton, active && _styles2.default.active),
      style: {
        width: width
      }
    },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.iconHolder, title: label },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.icon },
        icon
      ),
      notice
    )
  );
}
NavigationButton.propTypes = {
  icon: _propTypes2.default.node.isRequired,
  active: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  noticeCounts: _propTypes2.default.number,
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  onClick: _propTypes2.default.func
};
NavigationButton.defaultProps = {
  active: false,
  label: undefined,
  noticeCounts: undefined,
  onClick: undefined
};
//# sourceMappingURL=index.js.map
