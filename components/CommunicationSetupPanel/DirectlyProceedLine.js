"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectlyProceedLine = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
var DirectlyProceedLine = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var onClick = _ref.onClick,
    number = _ref.number,
    currentLocale = _ref.currentLocale,
    inMessagePage = _ref.inMessagePage;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcListItem, {
    "data-sign": "directlyProceedEntrance",
    color: "highlight.f01",
    singleLine: true,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcListItemAvatar, null, /*#__PURE__*/_react["default"].createElement(_juno.RcAvatar, {
    color: "avatar.global",
    size: "xsmall",
    iconSymbol: _junoIcon.DefaultAvatar
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
    primary: "".concat(_i18n["default"].getString(inMessagePage ? 'message' : 'dial', currentLocale)),
    secondary: number
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcListItemSecondaryAction, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    color: "action.primary",
    symbol: _junoIcon.Dial
  })));
});
exports.DirectlyProceedLine = DirectlyProceedLine;
//# sourceMappingURL=DirectlyProceedLine.js.map
