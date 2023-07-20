"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _DropdownNavigationView = _interopRequireDefault(require("../DropdownNavigationView"));
var _NavigationBar = require("../NavigationBar");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _TabNavigationButton = _interopRequireDefault(require("../TabNavigationButton"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var TabNavigationView = function TabNavigationView(_ref) {
  var navigationPosition = _ref.navigationPosition,
    navBarClassName = _ref.navBarClassName,
    onLoading = _ref.onLoading,
    brandIcon = _ref.brandIcon,
    holdReady = _ref.holdReady,
    className = _ref.className,
    tabs = _ref.tabs,
    goTo = _ref.goTo,
    tabWidth = _ref.tabWidth,
    tabHeight = _ref.tabHeight,
    currentPath = _ref.currentPath,
    currentVirtualPath = _ref.currentVirtualPath,
    tabNavigationViewClassName = _ref.tabNavigationViewClassName,
    tooltipForceHide = _ref.tooltipForceHide,
    children = _ref.children;
  if (onLoading) {
    return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null);
  }
  if (holdReady) return null;
  var isVertical = navigationPosition === 'left';
  var navBar = /*#__PURE__*/_react["default"].createElement(_NavigationBar.NavigationBar, {
    button: _TabNavigationButton["default"],
    tooltipForceHide: tooltipForceHide
    // @ts-expect-error TS(2322): Type 'FunctionComponent<DropdownNavigationViewProp... Remove this comment to see the full error message
    ,
    childNavigationView: _DropdownNavigationView["default"],
    tabs: tabs,
    goTo: goTo,
    tabWidth: tabWidth,
    tabHeight: tabHeight,
    currentPath: currentPath,
    direction: isVertical ? 'vertical' : undefined,
    currentVirtualPath: currentVirtualPath,
    className: navBarClassName
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className, navigationPosition === 'left' && _styles["default"].vertical)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].tabContainer
  }, navigationPosition === 'top' || navigationPosition === 'left' ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, navBar, navigationPosition === 'left' ? brandIcon : null) : null), /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "tabNavigationView",
    className: (0, _classnames["default"])(_styles["default"].main, tabNavigationViewClassName, !isVertical && _styles["default"].hasMaxHeight)
  }, children), navigationPosition === 'bottom' ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, navBar) : null);
};
TabNavigationView.defaultProps = {
  children: null,
  navigationPosition: 'top',
  brandIcon: null,
  holdReady: false,
  onLoading: false
};
var _default = TabNavigationView;
exports["default"] = _default;
//# sourceMappingURL=TabNavigationView.js.map
