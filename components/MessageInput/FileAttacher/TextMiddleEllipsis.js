"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextMiddleEllipsis = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _utils = require("./utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  display: inline-flex;\n\n  span:first-child {\n    ", ";\n  }\n  span:last-child {\n    flex: none;\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var TextMiddleEllipsisWrap = _juno.styled.span(_templateObject(), (0, _juno.ellipsis)());
/**
 * provide you can ellipsis text in the middle
 *
 * @default max check be 22
 * @default middle check be -8
 */
var TextMiddleEllipsis = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var max = _ref.max,
    middle = _ref.middle,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, ["max", "middle", "children"]);
  var _getMiddleSplit = (0, _utils.getMiddleSplit)(children, {
      max: max,
      middle: middle
    }),
    left = _getMiddleSplit.left,
    right = _getMiddleSplit.right;
  return /*#__PURE__*/_react["default"].createElement(TextMiddleEllipsisWrap, _extends({}, rest, {
    title: children
  }), /*#__PURE__*/_react["default"].createElement("span", null, left), right && /*#__PURE__*/_react["default"].createElement("span", null, right));
});
exports.TextMiddleEllipsis = TextMiddleEllipsis;
//# sourceMappingURL=TextMiddleEllipsis.js.map
