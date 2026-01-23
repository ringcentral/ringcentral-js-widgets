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
exports.SearchBar = void 0;
var _combineProps = require("@ringcentral/juno/es6/foundation/utils/combineProps.js");
var _Box = require("@ringcentral/juno/es6/components/Box/Box.js");
var _Icon = require("@ringcentral/juno/es6/components/Icon/Icon.js");
var _TextField = require("@ringcentral/juno/es6/components/Forms/TextField/TextField.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _Search = _interopRequireDefault(require("@ringcentral/juno-icon/es6/Search.js"));
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _styles = require("./styles");
var _utils = require("./utils");
var _templateObject;
var _excluded = ["classes", "className", "children"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var _SearchBar = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var classesProp = _ref.classes,
    className = _ref.className,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classes = (0, _react.useMemo)(function () {
    return (0, _combineProps.combineClasses)(_utils.SearchBarClasses, classesProp);
  }, [classesProp]);
  return /*#__PURE__*/_react["default"].createElement(_Box.RcBox, _extends({
    bgcolor: "neutral.b02",
    ref: ref,
    className: (0, _clsx["default"])(className, classes.root)
  }, rest), /*#__PURE__*/_react["default"].createElement(_TextField.RcTextField, {
    variant: "outline",
    radius: "round",
    size: "small",
    fullWidth: true,
    InputProps: {
      startAdornment: /*#__PURE__*/_react["default"].createElement(_Icon.RcIcon, {
        size: "small",
        symbol: _Search["default"],
        color: "neutral.f02"
      })
    },
    placeholder: "Search..."
  }), children);
});
var SearchBar = exports.SearchBar = (0, _styledComponents["default"])(_SearchBar)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", "\n"])), _styles.SearchBarStyle);
SearchBar.displayName = 'SearchBar';
//# sourceMappingURL=SearchBar.js.map
