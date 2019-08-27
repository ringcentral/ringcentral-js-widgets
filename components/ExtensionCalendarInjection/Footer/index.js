"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("../../Button"));

var _themeContext = require("../commons/themeContext");

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Footer(props) {
  var saveAsDefault = props.saveAsDefault,
      onCheckboxChange = props.onCheckboxChange,
      footerValues = props.footerValues,
      onSubmit = props.onSubmit;
  return _react["default"].createElement("div", {
    className: _styles["default"].footer
  }, _react["default"].createElement(_Checkbox["default"], {
    size: "default",
    className: _styles["default"].msCheckbox,
    onChange: onCheckboxChange,
    checked: saveAsDefault,
    label: footerValues.checkboxText
  }), _react["default"].createElement(_Button["default"], {
    className: _styles["default"].newUiButton,
    disabledClassName: _styles["default"].isDisabled,
    onClick: onSubmit,
    dataSign: "schedule"
  }, footerValues.saveButtonText));
}

Footer.propTypes = {
  saveAsDefault: _propTypes["default"].bool.isRequired,
  onSubmit: _propTypes["default"].func.isRequired,
  onCheckboxChange: _propTypes["default"].func.isRequired,
  footerValues: _propTypes["default"].object.isRequired
};

var _default = (0, _themeContext.ThemeConsumer)(Footer);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
