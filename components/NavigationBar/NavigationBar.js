"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationBar = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.object.to-string.js");
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _NavigationBarMoreMenu = require("./NavigationBarMoreMenu");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function getTabInfo(_ref) {
  var _tab$isActive, _tab$childTabs;
  var tab = _ref.tab,
    currentPath = _ref.currentPath,
    currentVirtualPath = _ref.currentVirtualPath;
  var active = ((_tab$isActive = tab.isActive) === null || _tab$isActive === void 0 ? void 0 : _tab$isActive.call(tab, currentPath, currentVirtualPath)) || tab.path && tab.path === currentPath || tab.virtualPath && tab.virtualPath === currentVirtualPath || ((_tab$childTabs = tab.childTabs) === null || _tab$childTabs === void 0 ? void 0 : _tab$childTabs.some(function (childTab) {
    return childTab.path === currentPath || childTab.path === currentPath.slice(0, 9);
  }));
  var activeAttr = active ? 'true' : '';
  function getIcon(icon) {
    if (!icon) return icon;
    if (/*#__PURE__*/_react["default"].isValidElement(icon)) {
      return /*#__PURE__*/_react["default"].cloneElement(icon, {
        // @ts-expect-error
        active: activeAttr
      });
    }
    var Icon = icon;
    return tab.childTabs ? /*#__PURE__*/_react["default"].createElement(Icon, {
      currentPath: currentPath
    }) : /*#__PURE__*/_react["default"].createElement(Icon, null);
  }
  var icon = tab.icon,
    activeIcon = tab.activeIcon;
  return {
    icon: getIcon(icon),
    activeIcon: getIcon(activeIcon),
    active: active
  };
}
function getTabSize(_ref2) {
  var isVertical = _ref2.isVertical,
    tabHeight = _ref2.tabHeight,
    tabWidth = _ref2.tabWidth,
    _ref2$tabs = _ref2.tabs,
    tabs = _ref2$tabs === void 0 ? [] : _ref2$tabs;
  var width = tabWidth !== null && tabWidth !== void 0 ? tabWidth : tabs.length > 0 ? "".concat(1 / tabs.length * 100, "%") : '0';
  var height = isVertical ? tabHeight !== null && tabHeight !== void 0 ? tabHeight : '50px' : '100%';
  return {
    width: width,
    height: height
  };
}
var NavigationBar = exports.NavigationBar = function NavigationBar(props) {
  var _props$fullSizeInk = props.fullSizeInk,
    fullSizeInk = _props$fullSizeInk === void 0 ? true : _props$fullSizeInk,
    _props$tabs = props.tabs,
    tabs = _props$tabs === void 0 ? [] : _props$tabs,
    _props$direction = props.direction,
    direction = _props$direction === void 0 ? 'horizontal' : _props$direction,
    currentVirtualPathProp = props.currentVirtualPath,
    goToProp = props.goTo,
    className = props.className,
    NavigationButton = props.button,
    childNavigationView = props.childNavigationView,
    currentPath = props.currentPath,
    tabWidth = props.tabWidth,
    tabHeight = props.tabHeight,
    tooltipForceHide = props.tooltipForceHide;
  var _useState = (0, _react.useState)(currentVirtualPathProp),
    _useState2 = _slicedToArray(_useState, 2),
    currentVirtualPath = _useState2[0],
    setCurrentVirtualPath = _useState2[1];
  var isMounted = (0, _juno.useMountState)();
  var isVertical = direction === 'vertical';
  var directionClass = isVertical ? _styles["default"].vertical : undefined;
  var setCurrentRouteState = (0, _juno.useEventCallback)(function (path) {
    if (isMounted.current) {
      setCurrentVirtualPath(path);
    }
  });
  var goTo = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(tab) {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return goToProp === null || goToProp === void 0 ? void 0 : goToProp(tab.path, tab.virtualPath);
          case 1:
            // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
            setCurrentRouteState(tab.virtualPath);
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function goTo(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var _getTabSize = getTabSize({
      isVertical: isVertical,
      tabHeight: tabHeight,
      tabWidth: tabWidth,
      tabs: tabs
    }),
    width = _getTabSize.width,
    height = _getTabSize.height;
  (0, _react.useEffect)(function () {
    if (currentVirtualPath) {
      setCurrentRouteState(currentVirtualPath);
    }
  }, [currentVirtualPath, setCurrentRouteState]);
  return /*#__PURE__*/_react["default"].createElement("nav", {
    className: (0, _clsx["default"])(_styles["default"].root, className, directionClass)
  }, tabs.map(function (tab, index) {
    var _getTabInfo = getTabInfo({
        tab: tab,
        currentPath: currentPath,
        currentVirtualPath: currentVirtualPath
      }),
      active = _getTabInfo.active,
      icon = _getTabInfo.icon,
      activeIcon = _getTabInfo.activeIcon;
    return /*#__PURE__*/_react["default"].createElement(NavigationButton, _extends({}, tab, {
      active: active,
      icon: icon,
      activeIcon: activeIcon,
      fullSizeInk: fullSizeInk,
      key: index,
      onClick: function onClick() {
        return goTo(tab);
      },
      width: width,
      height: height,
      tooltipForceHide: tooltipForceHide
    }));
  }), childNavigationView ? /*#__PURE__*/_react["default"].createElement(_NavigationBarMoreMenu.NavigationBarMoreMenu, {
    tabs: tabs,
    currentPath: currentPath,
    childNavigationView: childNavigationView,
    goTo: goTo,
    currentVirtualPath: currentVirtualPath
  }) : null);
};
//# sourceMappingURL=NavigationBar.js.map
