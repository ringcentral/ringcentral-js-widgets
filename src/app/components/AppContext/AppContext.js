"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAppContentRef = exports.AppProvider = exports.AppContext = void 0;
require("core-js/modules/es.array.is-array.js");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * AppContext is a context that can be used to control the app layout.
 */
var AppContext = exports.AppContext = /*#__PURE__*/(0, _react.createContext)({
  nav: null,
  setNav: _rxjs.noop,
  title: null,
  setTitle: _rxjs.noop,
  navOverrideMode: false,
  setNavOverrideMode: _rxjs.noop,
  footer: null,
  setFooter: _rxjs.noop,
  footerHeight: 0,
  setFooterHeight: _rxjs.noop,
  additionalFooterHeightRef: {
    current: 0
  },
  reset: _rxjs.noop,
  cancelReset: _rxjs.noop,
  announcementBottomAnchorRef: {
    current: null
  },
  announcementRef: {
    current: null
  },
  mainContentRef: {
    current: null
  },
  expandedContentRef: {
    current: null
  }
});
var AppProvider = exports.AppProvider = function AppProvider(_ref) {
  var children = _ref.children,
    _ref$defaultFooterHei = _ref.defaultFooterHeight,
    defaultFooterHeight = _ref$defaultFooterHei === void 0 ? 0 : _ref$defaultFooterHei;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    nav = _useState2[0],
    setNav = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    title = _useState4[0],
    setTitle = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    navOverrideMode = _useState6[0],
    setNavOverrideMode = _useState6[1];
  var _useState7 = (0, _react.useState)(defaultFooterHeight),
    _useState8 = _slicedToArray(_useState7, 2),
    footerHeight = _useState8[0],
    setFooterHeight = _useState8[1];
  var _useState9 = (0, _react.useState)(null),
    _useState0 = _slicedToArray(_useState9, 2),
    footer = _useState0[0],
    setFooter = _useState0[1];
  var additionalFooterHeightRef = (0, _react.useRef)(0);
  var announcementRef = (0, _react.useRef)(null);
  var announcementBottomAnchorRef = (0, _react.useRef)(null);
  var mainContentRef = (0, _react.useRef)(null);
  var expandedContentRef = (0, _react.useRef)(null);
  var _useSleep = (0, _springUi.useSleep)(),
    sleep = _useSleep.sleep,
    cancel = _useSleep.cancel;
  var reset = (0, _springUi.useEventCallback)(function () {
    var resetImmediately = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var exec = function exec() {
      setNav(null);
      setTitle(null);
      setNavOverrideMode(false);
    };
    if (resetImmediately) return exec();

    // when first page have custom nav, and second page also have custom nav that will be value1 => null => value2, so use delay to prevent flickering
    // make that become value1 => value2 if that happens new value immediately
    sleep(100).then(exec)["catch"](_rxjs.noop);
  });
  var cancelReset = (0, _springUi.useEventCallback)(cancel);
  return /*#__PURE__*/_react["default"].createElement(AppContext.Provider, {
    value: {
      nav: nav,
      setNav: setNav,
      title: title,
      setTitle: setTitle,
      navOverrideMode: navOverrideMode,
      setNavOverrideMode: setNavOverrideMode,
      footer: footer,
      setFooter: setFooter,
      footerHeight: footerHeight,
      setFooterHeight: setFooterHeight,
      additionalFooterHeightRef: additionalFooterHeightRef,
      announcementBottomAnchorRef: announcementBottomAnchorRef,
      reset: reset,
      cancelReset: cancelReset,
      announcementRef: announcementRef,
      mainContentRef: mainContentRef,
      expandedContentRef: expandedContentRef
    }
  }, children);
};
var useAppContentRef = exports.useAppContentRef = function useAppContentRef() {
  var _useContext = (0, _react.useContext)(AppContext),
    mainContentRef = _useContext.mainContentRef,
    expandedContentRef = _useContext.expandedContentRef;
  return {
    mainContentRef: mainContentRef,
    expandedContentRef: expandedContentRef
  };
};
//# sourceMappingURL=AppContext.js.map
