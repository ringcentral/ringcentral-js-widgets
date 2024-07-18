"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyBtn = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _CopyToClipboard = _interopRequireDefault(require("../CopyToClipboard"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  & {\n    width: ", ";\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var BtnContainer = (0, _juno.styled)('div')(_templateObject(), (0, _juno.spacing)(8));
var InnerBtn = function InnerBtn(_ref) {
  var size = _ref.size,
    currentLocale = _ref.currentLocale,
    executeCopy = _ref.executeCopy;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    variant: "round",
    size: size,
    color: "neutral.f04",
    "data-sign": "copyBtn",
    symbol: _junoIcon.Copy,
    title: _i18n["default"].getString('copy', currentLocale),
    onClick: executeCopy
  });
};
var CopyBtn = function CopyBtn(_ref2) {
  var value = _ref2.value,
    size = _ref2.size,
    currentLocale = _ref2.currentLocale,
    handleSuccess = _ref2.handleSuccess,
    handleFailure = _ref2.handleFailure;
  var memoizedBtn = (0, _react.useCallback)(function (_ref3) {
    var executeCopy = _ref3.executeCopy;
    return /*#__PURE__*/_react["default"].createElement(InnerBtn, {
      size: size,
      currentLocale: currentLocale,
      executeCopy: executeCopy
    });
  }, [size, currentLocale]);
  return /*#__PURE__*/_react["default"].createElement(BtnContainer, {
    "aria-disabled": true
  }, /*#__PURE__*/_react["default"].createElement(_CopyToClipboard["default"], {
    currentLocale: currentLocale,
    copiedText: value,
    button: memoizedBtn,
    handleSuccess: handleSuccess,
    handleFailure: handleFailure
  }));
};
exports.CopyBtn = CopyBtn;
CopyBtn.defaultProps = {
  handleSuccess: function handleSuccess() {},
  handleFailure: function handleFailure() {},
  currentLocale: 'en-US',
  value: '',
  size: 'small'
};
//# sourceMappingURL=CopyBtn.js.map
