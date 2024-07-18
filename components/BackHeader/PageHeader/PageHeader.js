"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.assign");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageHeaderTitle = exports.PageHeaderRemain = exports.PageHeaderBack = exports.PageHeader = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 1 auto;\n  text-align: center;\n"]);
  _templateObject4 = function _templateObject4() {
    return data;
  };
  return data;
}
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  background-color: ", ";\n  border-bottom: 1px solid ", ";\n  min-height: 38px;\n\n  ", ",\n  ", " {\n    margin-left: ", ";\n  }\n"]);
  _templateObject3 = function _templateObject3() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  visibility: hidden;\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral([""]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
// ! not modify this file directly, wait all components migrate to latest version
// TODO: this file be copy from libs/next-widgets/components/PageHeader, should sync file from there

var _PageHeaderBack = function _PageHeaderBack(props) {
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, _extends({
    symbol: _junoIcon.ChevronLeft,
    size: "small",
    "data-sign": "backButton"
  }, props));
};
var PageHeaderBack = (0, _juno.styled)(_PageHeaderBack)(_templateObject());
exports.PageHeaderBack = PageHeaderBack;
var _PageHeaderRemain = function _PageHeaderRemain(_ref) {
  var className = _ref.className;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    as: "i",
    size: "small",
    className: className
  });
};
var PageHeaderRemain = (0, _juno.styled)(_PageHeaderRemain)(_templateObject2());
exports.PageHeaderRemain = PageHeaderRemain;
var PageHeader = _juno.styled.header.attrs(function (props) {
  return _objectSpread({
    'data-sign': 'header'
  }, props);
})(_templateObject3(), (0, _juno.palette2)('neutral', 'b02'), (0, _juno.palette2)('neutral', 'l02'), PageHeaderRemain, PageHeaderBack, (0, _juno.spacing)(2));
exports.PageHeader = PageHeader;
var PageHeaderTitle = (0, _juno.styled)(_juno.RcText).attrs(function (props) {
  return _objectSpread({
    'data-sign': 'headerTitle',
    display: 'block'
  }, props);
})(_templateObject4());
exports.PageHeaderTitle = PageHeaderTitle;
//# sourceMappingURL=PageHeader.js.map
