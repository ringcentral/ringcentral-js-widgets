"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextWithHighlight = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.replace.js");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["text", "highLightText"];
var _templateObject;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var HighlightText = _juno.styled.span(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background: ", ";\n"])), (0, _juno.palette2)('highlight', 'b02'));
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
var TextWithHighlight = exports.TextWithHighlight = function TextWithHighlight(_ref) {
  var text = _ref.text,
    highLightText = _ref.highLightText,
    rest = _objectWithoutProperties(_ref, _excluded);
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
//# sourceMappingURL=TextWithHighlight.js.map
