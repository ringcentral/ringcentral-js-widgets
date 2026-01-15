"use strict";

require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchLineItem = void 0;
require("core-js/modules/es.function.name.js");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _IconLine = _interopRequireDefault(require("../IconLine"));
var _Tooltip = require("../Rcui/Tooltip");
var _Switch = _interopRequireDefault(require("../Switch"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var SwitchLineItem = exports.SwitchLineItem = function SwitchLineItem(_ref) {
  var show = _ref.show,
    name = _ref.name,
    customTitle = _ref.customTitle,
    switchTitle = _ref.switchTitle,
    currentLocale = _ref.currentLocale,
    dataSign = _ref.dataSign,
    disabled = _ref.disabled,
    checked = _ref.checked,
    onChange = _ref.onChange,
    tooltip = _ref.tooltip,
    children = _ref.children;
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
    className: (0, _clsx["default"])(disabled && _styles["default"].disableText)
  }, customTitle || _i18n["default"].getString(name, currentLocale), tooltip ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "\xA0", /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: tooltip
  }, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "".concat(dataSign, "_tooltip")
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    size: "small",
    symbol: _junoIcon.InfoBorder,
    className: _styles["default"].tooltipIcon
  })))) : null), children);
};
//# sourceMappingURL=SwitchLineItem.js.map
