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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextMiddleEllipsis = void 0;
var _ellipsis = require("@ringcentral/juno/es6/foundation/styles/ellipsis.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _react = _interopRequireWildcard(require("react"));
var _utils = require("./utils");
var _excluded = ["max", "middle", "children"];
var _templateObject;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var TextMiddleEllipsisWrap = _styledComponents["default"].span(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  display: inline-flex;\n\n  span:first-child {\n    ", ";\n  }\n  span:last-child {\n    flex: none;\n  }\n"])), (0, _ellipsis.ellipsis)());
/**
 * provide you can ellipsis text in the middle
 *
 * @default max check be 22
 * @default middle check be -8
 */
var TextMiddleEllipsis = exports.TextMiddleEllipsis = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var max = _ref.max,
    middle = _ref.middle,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, _excluded);
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
//# sourceMappingURL=TextMiddleEllipsis.js.map
