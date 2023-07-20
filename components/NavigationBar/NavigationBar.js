"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.some");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationBar = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _NavigationBarMoreMenu = require("./NavigationBarMoreMenu");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
    return function goTo(_x2) {
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
    className: (0, _classnames["default"])(_styles["default"].root, className, directionClass)
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
