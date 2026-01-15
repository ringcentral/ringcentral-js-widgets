"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonLineItem = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _Button = require("../Button");
var _IconLine = _interopRequireDefault(require("../IconLine"));
var _Tooltip = require("../Rcui/Tooltip");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var ButtonLineItem = exports.ButtonLineItem = function ButtonLineItem(_ref) {
  var show = _ref.show,
    dataSign = _ref.dataSign,
    children = _ref.children,
    tooltip = _ref.tooltip,
    customTitle = _ref.customTitle,
    btnText = _ref.btnText,
    subTitle = _ref.subTitle,
    onClick = _ref.onClick;
  if (!show) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
    iconClassName: _styles["default"].buttonIcon,
    dataSign: dataSign,
    icon: /*#__PURE__*/_react["default"].createElement(_Button.Button, _extends({}, dataSign ? {
      dataSign: "".concat(dataSign, "_button")
    } : {}, {
      onClick: onClick
    }), btnText)
  }, /*#__PURE__*/_react["default"].createElement("span", null, subTitle && /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column'
    }
  }, customTitle, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "subTitle",
    className: _styles["default"].subTitle
  }, subTitle)) || customTitle, tooltip ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "\xA0", /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: tooltip
  }, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "".concat(dataSign, "_tooltip")
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    size: "small",
    symbol: _junoIcon.InfoBorder,
    className: _styles["default"].tooltipIcon
  })))) : null), children);
};
//# sourceMappingURL=ButtonLineItem.js.map
