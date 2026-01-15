"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangePasswordPopup = void 0;
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("./i18n");
var _styles = _interopRequireDefault(require("./styles.scss"));
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding: ", " !important;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledDialogActions = (0, _juno.styled)(_juno.RcDialogActions)(_templateObject(), (0, _juno.spacing)(5, 0, 6));
var ChangePasswordPopup = function ChangePasswordPopup(_ref) {
  var currentLocale = _ref.currentLocale,
    _ref$meetingPassword = _ref.meetingPassword,
    meetingPassword = _ref$meetingPassword === void 0 ? '' : _ref$meetingPassword,
    handleCancel = _ref.handleCancel,
    handleUpdate = _ref.handleUpdate;
  var _useState = (0, _react.useState)(meetingPassword),
    _useState2 = _slicedToArray(_useState, 2),
    password = _useState2[0],
    setPassword = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isError = _useState4[0],
    setError = _useState4[1];
  (0, _react.useEffect)(function () {
    setPassword(meetingPassword);
  }, [meetingPassword]);
  (0, _react.useEffect)(function () {
    setError(!(0, _RcVideo.validatePasswordSettings)(password, true));
  }, [password]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "updatePasswordModal"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
    label: (0, _i18n.t)('passwordLabel'),
    variant: "outline",
    fullWidth: true,
    size: "small",
    placeholder: (0, _i18n.t)('enterPassword'),
    error: isError,
    helperText: (0, _utils.getHelperTextForPasswordField)(password, !isError, currentLocale),
    InputLabelProps: {
      className: _styles["default"].passwordLabel
    },
    "data-sign": "password",
    clearBtn: true,
    spellCheck: false,
    value: password,
    inputProps: {
      maxLength: 255
    },
    onChange: function onChange(e) {
      setPassword(e.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(StyledDialogActions, null, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    variant: "plain",
    color: "primary",
    onClick: handleCancel
  }, (0, _i18n.t)('cancel')), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    variant: "contained",
    color: "primary",
    disabled: isError,
    onClick: function onClick() {
      return handleUpdate(password);
    }
  }, (0, _i18n.t)('update'))));
};
exports.ChangePasswordPopup = ChangePasswordPopup;
//# sourceMappingURL=ChangePasswordPopup.js.map
