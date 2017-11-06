'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SaveButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SaveButton(_ref) {
  var className = _ref.className,
      currentLocale = _ref.currentLocale,
      disabled = _ref.disabled,
      onClick = _ref.onClick;

  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_styles2.default.root, disabled ? _styles2.default.disabled : null, className),
      onClick: onClick,
      disabled: disabled
    },
    _i18n2.default.getString('save', currentLocale)
  );
}
SaveButton.propTypes = {
  className: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func
};
SaveButton.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined
};
//# sourceMappingURL=index.js.map
