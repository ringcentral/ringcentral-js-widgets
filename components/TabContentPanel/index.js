"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _NavigationBar = _interopRequireDefault(require("../../components/NavigationBar"));

var _MessageTabButton = _interopRequireDefault(require("../../components/MessageTabButton"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function TabTitle(_ref) {
  var label = _ref.label,
      isActive = _ref.isActive,
      rest = _objectWithoutProperties(_ref, ["label", "isActive"]);

  return /*#__PURE__*/_react["default"].createElement("span", _extends({}, rest, {
    className: (0, _classnames3["default"])(_styles["default"].tabTitle, isActive() ? _styles["default"].active : null)
  }), label);
}

TabTitle.propTypes = {
  label: _propTypes["default"].string.isRequired,
  isActive: _propTypes["default"].func.isRequired
};

function renderChildren(_ref2) {
  var children = _ref2.children,
      showTabs = _ref2.showTabs;

  if (typeof children === 'function') {
    return children({
      showTabs: showTabs
    });
  }

  return children;
}

function TabContentPanel(_ref3) {
  var _classnames, _classnames2;

  var showTabs = _ref3.showTabs,
      navClassName = _ref3.navClassName,
      tabContentClassName = _ref3.tabContentClassName,
      tabs = _ref3.tabs,
      goTo = _ref3.goTo,
      children = _ref3.children;

  if (!showTabs) {
    return renderChildren({
      children: children,
      showTabs: showTabs
    });
  }

  var formattedTabs = tabs.map(function (tab) {
    return {
      icon: /*#__PURE__*/_react["default"].createElement(TabTitle, {
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
    button: _MessageTabButton["default"],
    className: (0, _classnames3["default"])((_classnames = {}, _defineProperty(_classnames, _styles["default"].tabBar, true), _defineProperty(_classnames, navClassName, !!navClassName), _classnames)),
    currentPath: "",
    goTo: goTo,
    tabs: formattedTabs,
    fullSizeInk: false
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames3["default"])((_classnames2 = {}, _defineProperty(_classnames2, _styles["default"].content, true), _defineProperty(_classnames2, tabContentClassName, !!tabContentClassName), _classnames2))
  }, renderChildren({
    children: children,
    showTabs: showTabs
  })));
}

TabContentPanel.propTypes = {
  showTabs: _propTypes["default"].bool,
  tabs: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    path: _propTypes["default"].string.isRequired,
    label: _propTypes["default"].string.isRequired,
    isActive: _propTypes["default"].func.isRequired
  })).isRequired,
  goTo: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].node]),
  navClassName: _propTypes["default"].string,
  tabContentClassName: _propTypes["default"].string
};
TabContentPanel.defaultProps = {
  showTabs: false,
  navClassName: null,
  children: null,
  tabContentClassName: null
};
var _default = TabContentPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
