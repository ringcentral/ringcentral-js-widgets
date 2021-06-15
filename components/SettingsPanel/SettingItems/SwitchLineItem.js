"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchLineItem = void 0;

require("core-js/modules/es6.function.name");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _IconLine = _interopRequireDefault(require("../../IconLine"));

var _Switch = _interopRequireDefault(require("../../Switch"));

var _i18n = _interopRequireDefault(require("../i18n"));

var _styles = _interopRequireDefault(require("../styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SwitchLineItem = function SwitchLineItem(_ref) {
  var show = _ref.show,
      name = _ref.name,
      customTitle = _ref.customTitle,
      switchTitle = _ref.switchTitle,
      currentLocale = _ref.currentLocale,
      dataSign = _ref.dataSign,
      disabled = _ref.disabled,
      checked = _ref.checked,
      onChange = _ref.onChange;

  if (!show) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
    icon: /*#__PURE__*/_react["default"].createElement(_Switch["default"], _extends({}, dataSign ? {
      dataSign: dataSign
    } : {}, {
      title: switchTitle,
      disable: disabled,
      checked: checked,
      onChange: onChange
    }))
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: (0, _classnames["default"])(disabled && _styles["default"].disableText)
  }, customTitle || _i18n["default"].getString(name, currentLocale)));
};

exports.SwitchLineItem = SwitchLineItem;
//# sourceMappingURL=SwitchLineItem.js.map
