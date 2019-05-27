"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _NavigationBar = _interopRequireDefault(require("../NavigationBar"));

var _TabNavigationButton = _interopRequireDefault(require("../TabNavigationButton"));

var _DropdownNavigationView = _interopRequireDefault(require("../DropdownNavigationView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function TabNavigationView(props) {
  var navigationPosition = props.navigationPosition,
      navBarClassName = props.navBarClassName;
  var isVertical = navigationPosition === 'left';

  var navBar = _react["default"].createElement(_NavigationBar["default"], {
    button: _TabNavigationButton["default"],
    childNavigationView: _DropdownNavigationView["default"],
    tabs: props.tabs,
    goTo: props.goTo,
    tabWidth: props.tabWidth,
    tabHeight: props.tabHeight,
    currentPath: props.currentPath,
    direction: isVertical ? 'vertical' : undefined,
    currentVirtualPath: props.currentVirtualPath,
    className: navBarClassName
  });

  if (props.holdReady) return null;
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, props.className, navigationPosition === 'left' && _styles["default"].vertical)
  }, _react["default"].createElement("div", {
    className: _styles["default"].tabContainer
  }, navigationPosition === 'top' || navigationPosition === 'left' ? navBar : null), _react["default"].createElement("div", {
    "data-sign": "tabNavigationView",
    className: (0, _classnames["default"])(_styles["default"].main, !isVertical && _styles["default"].hasMaxHeight)
  }, props.children), navigationPosition === 'bottom' ? navBar : null);
}

TabNavigationView.propTypes = {
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  currentPath: _propTypes["default"].string.isRequired,
  currentVirtualPath: _propTypes["default"].string,
  goTo: _propTypes["default"].func.isRequired,
  navigationPosition: _propTypes["default"].oneOf(['top', 'bottom', 'left']),
  tabWidth: _propTypes["default"].string,
  tabHeight: _propTypes["default"].string,
  tabs: _NavigationBar["default"].propTypes.tabs,
  holdReady: _propTypes["default"].bool,
  navBarClassName: _propTypes["default"].string
};
TabNavigationView.defaultProps = {
  children: null,
  className: null,
  currentVirtualPath: undefined,
  navigationPosition: 'top',
  tabWidth: undefined,
  tabHeight: undefined,
  tabs: null,
  holdReady: false,
  navBarClassName: undefined
};
var _default = TabNavigationView;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
