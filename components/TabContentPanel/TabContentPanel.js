"use strict";

require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _MessageTabButton = require("../MessageTabButton");
var _NavigationBar = require("../NavigationBar");
var _TabTitle = require("./TabTitle");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var TabContentPanel = function TabContentPanel(_ref) {
  var showTabs = _ref.showTabs,
    navClassName = _ref.navClassName,
    tabContentClassName = _ref.tabContentClassName,
    tabs = _ref.tabs,
    goTo = _ref.goTo,
    tooltipForceHide = _ref.tooltipForceHide,
    children = _ref.children;
  var renderChildren = function renderChildren() {
    if (typeof children === 'function') {
      return children({
        showTabs: showTabs
      });
    }
    return children;
  };
  if (!showTabs) {
    return renderChildren();
  }
  var formattedTabs = tabs.map(function (tab) {
    return {
      icon: /*#__PURE__*/_react["default"].createElement(_TabTitle.TabTitle, {
        label: tab.label,
        isActive: tab.isActive,
        "data-sign": tab.dataSign
      }),
      label: tab.label,
      path: tab.path,
      isActive: tab.isActive
    };
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_NavigationBar.NavigationBar, {
    button: _MessageTabButton.MessageTabButton,
    className: (0, _clsx["default"])(_styles["default"].tabBar, navClassName),
    currentPath: "",
    goTo: goTo,
    tabs: formattedTabs,
    fullSizeInk: false,
    tooltipForceHide: tooltipForceHide
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].content, tabContentClassName)
  }, renderChildren()));
};
TabContentPanel.defaultProps = {
  showTabs: false
};
var _default = TabContentPanel;
exports["default"] = _default;
//# sourceMappingURL=TabContentPanel.js.map
