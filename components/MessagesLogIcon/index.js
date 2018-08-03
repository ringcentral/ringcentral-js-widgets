'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MessagesLog = require('../../assets/images/MessagesLog.svg');

var _MessagesLog2 = _interopRequireDefault(_MessagesLog);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MessagesLogIcon(_ref) {
  var disabled = _ref.disabled,
      _onClick = _ref.onClick,
      currentLocale = _ref.currentLocale;

  var tooltip = _i18n2.default.getString('log', currentLocale);
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.messageLog, disabled && _styles2.default.disabledMessageLog),
      onClick: function onClick(e) {
        e.stopPropagation();
        if (!disabled) _onClick();
      },
      title: tooltip },
    _react2.default.createElement(_MessagesLog2.default, { className: _styles2.default.logIcon })
  );
}

exports.default = MessagesLogIcon;
MessagesLogIcon.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func
};

MessagesLogIcon.defaultProps = {
  disabled: false,
  onClick: function onClick() {}
};
//# sourceMappingURL=index.js.map
