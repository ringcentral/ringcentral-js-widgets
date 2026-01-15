"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipientOption = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _RecipientInfo = require("./RecipientInfo");
var _RecipientPhone = require("./RecipientPhone");
var _styles = _interopRequireDefault(require("./styles.scss"));
var _excluded = ["active", "recipientInfoRenderer", "recipientPhoneRenderer", "onClick", "onHover"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var RecipientOption = exports.RecipientOption = function RecipientOption(_ref) {
  var active = _ref.active,
    _ref$recipientInfoRen = _ref.recipientInfoRenderer,
    RecipientInfoRenderer = _ref$recipientInfoRen === void 0 ? _RecipientInfo.RecipientInfo : _ref$recipientInfoRen,
    _ref$recipientPhoneRe = _ref.recipientPhoneRenderer,
    RecipientPhoneRenderer = _ref$recipientPhoneRe === void 0 ? _RecipientPhone.RecipientPhone : _ref$recipientPhoneRe,
    onClick = _ref.onClick,
    onHover = _ref.onHover,
    baseProps = _objectWithoutProperties(_ref, _excluded);
  var className = (0, _clsx["default"])(_styles["default"].contactItem, active && _styles["default"].active);
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: className,
    onMouseOver: onHover,
    "data-sign": "recipientOption"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].clickable,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement(RecipientInfoRenderer, baseProps), /*#__PURE__*/_react["default"].createElement(RecipientPhoneRenderer, baseProps)));
};
//# sourceMappingURL=RecipientOption.js.map
