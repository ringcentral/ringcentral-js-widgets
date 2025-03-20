"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
require("core-js/modules/es.regexp.constructor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextWithHighlight = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var HighlightText = _juno.styled.span(_templateObject(), (0, _juno.palette2)('highlight', 'b02'));
var indexesOf = function indexesOf(string, highLightText) {
  var match;
  var indexes = [];
  var regex = new RegExp(highLightText.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(string)) !== null) {
    indexes.push(match.index);
  }
  return indexes;
};
var TextWithHighlight = function TextWithHighlight(_ref) {
  var text = _ref.text,
    highLightText = _ref.highLightText,
    rest = _objectWithoutProperties(_ref, ["text", "highLightText"]);
  var highlightTextLength = highLightText === null || highLightText === void 0 ? void 0 : highLightText.length;
  var matchIndexes = (0, _react.useMemo)(function () {
    return highlightTextLength > 0 ? indexesOf(text, highLightText) : [];
  }, [highLightText, highlightTextLength, text]);
  return /*#__PURE__*/_react["default"].createElement("span", _extends({
    title: text
  }, rest), matchIndexes.length > 0 ? matchIndexes.map(function (startIndex, index) {
    var endIndex = startIndex + highlightTextLength;
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
      key: startIndex
    }, index === 0 && text.substring(0, startIndex), /*#__PURE__*/_react["default"].createElement(HighlightText, {
      "data-sign": "highlight"
    }, text.substring(startIndex, endIndex)), text.substring(endIndex, matchIndexes[index + 1]));
  }) : text);
};
exports.TextWithHighlight = TextWithHighlight;
//# sourceMappingURL=TextWithHighlight.js.map
