"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _NavigationBar = _interopRequireDefault(require("../NavigationBar"));

var _TabNavigationButton = _interopRequireDefault(require("../TabNavigationButton"));

var _DropdownNavigationView = _interopRequireDefault(require("../DropdownNavigationView"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

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
      children = _ref.children;

  if (onLoading) {
    return _react["default"].createElement(_SpinnerOverlay["default"], null);
  }

  var isVertical = navigationPosition === 'left';

  var navBar = _react["default"].createElement(_NavigationBar["default"], {
    button: _TabNavigationButton["default"],
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

  if (holdReady) return null;
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className, navigationPosition === 'left' && _styles["default"].vertical)
  }, _react["default"].createElement("div", {
    className: _styles["default"].tabContainer
  }, navigationPosition === 'top' || navigationPosition === 'left' ? _react["default"].createElement(_react["default"].Fragment, null, navBar, navigationPosition === 'left' ? brandIcon : null) : null), _react["default"].createElement("div", {
    "data-sign": "tabNavigationView",
    className: (0, _classnames["default"])(_styles["default"].main, tabNavigationViewClassName, !isVertical && _styles["default"].hasMaxHeight)
  }, ' ', children), navigationPosition === 'bottom' ? _react["default"].createElement(_react["default"].Fragment, null, navBar) : null);
};

TabNavigationView.defaultProps = {
  children: null,
  className: null,
  navigationPosition: 'top',
  brandIcon: null,
  tabs: null,
  holdReady: false,
  onLoading: false
};
var _default = TabNavigationView;
exports["default"] = _default;
//# sourceMappingURL=TabNavigationView.js.map
