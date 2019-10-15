"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NavigationBar =
/*#__PURE__*/
function (_Component) {
  _inherits(NavigationBar, _Component);

  function NavigationBar(props) {
    var _this;

    _classCallCheck(this, NavigationBar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NavigationBar).call(this, props));
    _this.goTo = _this.goTo.bind(_assertThisInitialized(_this));
    _this.mounted = false;
    _this.state = {
      currentVirtualPath: _this.props.currentVirtualPath
    };
    return _this;
  }

  _createClass(NavigationBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.currentVirtualPath && this.mounted) {
        this.setState({
          currentVirtualPath: nextProps.currentVirtualPath
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: "goTo",
    value: function goTo(tab) {
      var _this2 = this;

      this.props.goTo(tab.path, tab.virtualPath); // seems like the goTo is asynchronous
      // so here set timeout for resolving menu looks flash issue

      setTimeout(function () {
        if (_this2.mounted) {
          _this2.setState({
            currentVirtualPath: tab.virtualPath
          });
        }
      }, 10);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          className = _this$props.className,
          button = _this$props.button,
          childNavigationView = _this$props.childNavigationView,
          currentPath = _this$props.currentPath,
          tabWidth = _this$props.tabWidth,
          tabHeight = _this$props.tabHeight,
          tabs = _this$props.tabs,
          fullSizeInk = _this$props.fullSizeInk,
          direction = _this$props.direction;
      var NavigationButton = button;
      var ChildNavigationView = childNavigationView;
      var isVertical = direction === 'vertical';
      var directionClass = isVertical ? _styles["default"].vertical : undefined;
      var currentVirtualPath = this.state.currentVirtualPath;
      var _tabWidth = 0;

      var _tabHeight = isVertical ? tabHeight || '50px' : '100%';

      if (tabWidth) {
        _tabWidth = tabWidth;
      } else {
        // Align equally fully
        _tabWidth = tabs.length > 0 ? "".concat(1 / tabs.length * 100, "%") : 0;
      }

      var dropdownMenuTab = tabs.find(function (tab) {
        return tab.childTabs && tab.isActive && tab.isActive(currentPath, currentVirtualPath);
      });
      var dropdownMenu = dropdownMenuTab && dropdownMenuTab.childTabs;
      return _react["default"].createElement("nav", {
        className: (0, _classnames["default"])(_styles["default"].root, className, directionClass)
      }, tabs.map(function (tab, index) {
        if (typeof tab.view === 'function') {
          var View = tab.view;
          return _react["default"].createElement(View, {
            key: index
          });
        }

        var icon = tab.icon,
            activeIcon = tab.activeIcon;

        if (typeof icon === 'function') {
          var Icon = icon;
          icon = tab.childTabs ? _react["default"].createElement(Icon, {
            currentPath: currentPath
          }) : _react["default"].createElement(Icon, null);
        }

        if (typeof activeIcon === 'function') {
          var ActiveIcon = activeIcon;
          activeIcon = tab.childTabs ? _react["default"].createElement(ActiveIcon, {
            currentPath: currentPath
          }) : _react["default"].createElement(ActiveIcon, null);
        }

        return _react["default"].createElement(NavigationButton, _extends({}, tab, {
          fullSizeInk: fullSizeInk,
          key: index,
          onClick: function onClick() {
            _this3.goTo(tab);
          },
          active: tab.isActive && tab.isActive(currentPath, currentVirtualPath) || tab.path && tab.path === currentPath || tab.virtualPath && tab.virtualPath === currentVirtualPath || tab.childTabs && tab.childTabs.some(function (childTab) {
            return childTab.path === currentPath || childTab.path === currentPath.slice(0, 9);
          }),
          width: _tabWidth,
          height: _tabHeight,
          icon: icon,
          activeIcon: activeIcon
        }));
      }), ChildNavigationView && dropdownMenu && dropdownMenu.length ? _react["default"].createElement(ChildNavigationView, {
        tabs: dropdownMenu,
        goTo: this.goTo,
        currentPath: currentPath,
        currentVirtualPath: currentVirtualPath
      }) : null);
    }
  }]);

  return NavigationBar;
}(_react.Component);

exports["default"] = NavigationBar;
var tabPropTypes = {
  icon: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].node]),
  activeIcon: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].node]),
  label: _propTypes["default"].string,
  path: _propTypes["default"].string,
  virtualPath: _propTypes["default"].string,
  isActive: _propTypes["default"].func,
  noticeCounts: _propTypes["default"].number
};
NavigationBar.propTypes = {
  className: _propTypes["default"].string,
  button: _propTypes["default"].oneOfType([_propTypes["default"].func.isRequired, _propTypes["default"].element.isRequired]).isRequired,
  childNavigationView: _propTypes["default"].oneOfType([_propTypes["default"].func.isRequired, _propTypes["default"].element.isRequired]),
  tabs: _propTypes["default"].arrayOf(_propTypes["default"].shape(_objectSpread({}, tabPropTypes, {
    childTabs: _propTypes["default"].arrayOf(_propTypes["default"].shape(_objectSpread({}, tabPropTypes)))
  }))),
  goTo: _propTypes["default"].func.isRequired,
  currentPath: _propTypes["default"].string.isRequired,
  currentVirtualPath: _propTypes["default"].string,
  tabWidth: _propTypes["default"].string,
  tabHeight: _propTypes["default"].string,
  fullSizeInk: _propTypes["default"].bool,
  direction: _propTypes["default"].string
};
NavigationBar.defaultProps = {
  className: undefined,
  childNavigationView: undefined,
  currentVirtualPath: undefined,
  tabWidth: undefined,
  tabHeight: undefined,
  tabs: [],
  fullSizeInk: true,
  direction: 'horizonal'
};
//# sourceMappingURL=index.js.map
