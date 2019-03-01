"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SaveButton;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("../Button"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SaveButton(_ref) {
  var className = _ref.className,
      currentLocale = _ref.currentLocale,
      disabled = _ref.disabled,
      onClick = _ref.onClick;
  return _react.default.createElement(_Button.default, {
    dataSign: "saveButton",
    className: (0, _classnames.default)(_styles.default.root, disabled ? _styles.default.disabled : null, className),
    onClick: onClick,
    disabled: disabled
  }, _i18n.default.getString('save', currentLocale));
}

SaveButton.propTypes = {
  className: _propTypes.default.string,
  currentLocale: _propTypes.default.string.isRequired,
  disabled: _propTypes.default.bool,
  onClick: _propTypes.default.func
};
SaveButton.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined
};
//# sourceMappingURL=index.js.map
