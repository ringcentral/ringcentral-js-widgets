"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFooterHeight = exports.useAppFooter = exports.AppFooterNav = void 0;
var _react = _interopRequireWildcard(require("react"));
var _AppContext = require("./AppContext");
var _ToastPositionAdjustor = require("./ToastPositionAdjustor");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var empty = /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);

/**
 * render content at the footer navigation area.
 *
 * by default will render the app nav, if you not want show the, just put `<AppFooterNav />` in the component.
 */
var AppFooterNav = exports.AppFooterNav = function AppFooterNav(_ref) {
  var _ref$children = _ref.children,
    children = _ref$children === void 0 ? empty : _ref$children,
    _ref$additionalHeight = _ref.additionalHeight,
    additionalHeight = _ref$additionalHeight === void 0 ? 0 : _ref$additionalHeight;
  // for non spring-ui project, just return the children
  if (process.env.THEME_SYSTEM !== 'spring-ui') {
    return children;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  var _useContext = (0, _react.useContext)(_AppContext.AppContext),
    setFooter = _useContext.setFooter,
    additionalFooterHeightRef = _useContext.additionalFooterHeightRef;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  (0, _react.useLayoutEffect)(function () {
    additionalFooterHeightRef.current = additionalHeight;
    setFooter(children);
    return function () {
      additionalFooterHeightRef.current = 0;
      setFooter(null);
    };
  }, [additionalHeight, children, additionalFooterHeightRef, setFooter]);
  return null;
};
var useAppFooter = exports.useAppFooter = function useAppFooter(_ref2) {
  var defaultFooter = _ref2.defaultFooter,
    _ref2$calculateHeight = _ref2.calculateHeight,
    calculateHeight = _ref2$calculateHeight === void 0 ? true : _ref2$calculateHeight,
    additionalFooterHeight = _ref2.additionalFooterHeight;
  var _useContext2 = (0, _react.useContext)(_AppContext.AppContext),
    footer = _useContext2.footer;
  var footerElement = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement("footer", null, footer || defaultFooter);
  }, [defaultFooter, footer]);
  return {
    footer: calculateHeight ? /*#__PURE__*/_react["default"].createElement(_ToastPositionAdjustor.ToastPositionAdjustor, {
      additionalFooterHeight: additionalFooterHeight
    }, footerElement) : footerElement
  };
};
var useFooterHeight = exports.useFooterHeight = function useFooterHeight() {
  var _useContext3 = (0, _react.useContext)(_AppContext.AppContext),
    footerHeight = _useContext3.footerHeight;
  return footerHeight;
};
//# sourceMappingURL=AppFooter.js.map
