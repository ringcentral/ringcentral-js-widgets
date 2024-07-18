"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.some");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationBar = void 0;
require("regenerator-runtime/runtime");
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _NavigationBarMoreMenu = require("./NavigationBarMoreMenu");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
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
    if ( /*#__PURE__*/_react["default"].isValidElement(icon)) {
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
var NavigationBar = function NavigationBar(props) {
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
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tab) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return goToProp === null || goToProp === void 0 ? void 0 : goToProp(tab.path, tab.virtualPath);
            case 2:
              // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
              setCurrentRouteState(tab.virtualPath);
            case 3:
            case "end":
              return _context.stop();
          }
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
exports.NavigationBar = NavigationBar;
//# sourceMappingURL=NavigationBar.js.map
