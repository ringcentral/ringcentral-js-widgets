"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _MessageTabButton = require("../MessageTabButton");

var _NavigationBar = _interopRequireDefault(require("../NavigationBar"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _TabTitle = require("./TabTitle");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TabContentPanel = function TabContentPanel(_ref) {
  var _classnames, _classnames2;

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
  }, /*#__PURE__*/_react["default"].createElement(_NavigationBar["default"], {
    button: _MessageTabButton.MessageTabButton,
    className: (0, _classnames3["default"])((_classnames = {}, _defineProperty(_classnames, _styles["default"].tabBar, true), _defineProperty(_classnames, navClassName, !!navClassName), _classnames)),
    currentPath: "",
    goTo: goTo,
    tabs: formattedTabs,
    fullSizeInk: false,
    tooltipForceHide: tooltipForceHide
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames3["default"])((_classnames2 = {}, _defineProperty(_classnames2, _styles["default"].content, true), _defineProperty(_classnames2, tabContentClassName, !!tabContentClassName), _classnames2))
  }, renderChildren()));
};

TabContentPanel.defaultProps = {
  showTabs: false,
  navClassName: null,
  tabContentClassName: null
};
var _default = TabContentPanel;
exports["default"] = _default;
//# sourceMappingURL=TabContentPanel.js.map
