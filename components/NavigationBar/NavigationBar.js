"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var NavigationBar = /*#__PURE__*/function (_Component) {
  _inherits(NavigationBar, _Component);

  var _super = _createSuper(NavigationBar);

  function NavigationBar(props) {
    var _this;

    _classCallCheck(this, NavigationBar);

    _this = _super.call(this, props);
    _this._mounted = void 0;
    _this.goTo = _this.goTo.bind(_assertThisInitialized(_this));
    _this._mounted = false;
    _this.state = {
      currentVirtualPath: _this.props.currentVirtualPath
    };
    return _this;
  }

  _createClass(NavigationBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.currentVirtualPath && this._mounted) {
        this.setState({
          currentVirtualPath: nextProps.currentVirtualPath
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "goTo",
    value: function goTo(tab) {
      var _this2 = this;

      this.props.goTo(tab.path, tab.virtualPath); // seems like the goTo is asynchronous
      // so here set timeout for resolving menu looks flash issue

      setTimeout(function () {
        if (_this2._mounted) {
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
          direction = _this$props.direction,
          tooltipForceHide = _this$props.tooltipForceHide;
      var NavigationButton = button;
      var ChildNavigationView = childNavigationView;
      var isVertical = direction === 'vertical';
      var directionClass = isVertical ? _styles["default"].vertical : undefined;
      var currentVirtualPath = this.state.currentVirtualPath;
      var _tabWidth = '0';

      var _tabHeight = isVertical ? tabHeight || '50px' : '100%';

      if (tabWidth) {
        _tabWidth = tabWidth;
      } else {
        // Align equally fully
        _tabWidth = tabs.length > 0 ? "".concat(1 / tabs.length * 100, "%") : '0';
      }

      var dropdownMenuTab = tabs.find(function (tab) {
        return tab.childTabs && tab.isActive && tab.isActive(currentPath, currentVirtualPath);
      });
      var dropdownMenu = dropdownMenuTab && dropdownMenuTab.childTabs;
      return /*#__PURE__*/_react["default"].createElement("nav", {
        className: (0, _classnames["default"])(_styles["default"].root, className, directionClass)
      }, tabs.map(function (tab, index) {
        var _tab$isActive;

        var active = ((_tab$isActive = tab.isActive) === null || _tab$isActive === void 0 ? void 0 : _tab$isActive.call(tab, currentPath, currentVirtualPath)) || tab.path && tab.path === currentPath || tab.virtualPath && tab.virtualPath === currentVirtualPath || tab.childTabs && tab.childTabs.some(function (childTab) {
          return childTab.path === currentPath || childTab.path === currentPath.slice(0, 9);
        });
        var activeAttr = active ? 'true' : '';
        var icon = tab.icon,
            activeIcon = tab.activeIcon;

        if (typeof icon === 'function') {
          var Icon = icon;
          icon = tab.childTabs ? /*#__PURE__*/_react["default"].createElement(Icon, {
            currentPath: currentPath
          }) : /*#__PURE__*/_react["default"].createElement(Icon, null);
        } else if (icon && /*#__PURE__*/_react["default"].isValidElement(icon)) {
          icon = /*#__PURE__*/_react["default"].cloneElement(icon, {
            active: activeAttr
          });
        }

        if (typeof activeIcon === 'function') {
          var ActiveIcon = activeIcon;
          activeIcon = tab.childTabs ? /*#__PURE__*/_react["default"].createElement(ActiveIcon, {
            currentPath: currentPath
          }) : /*#__PURE__*/_react["default"].createElement(ActiveIcon, null);
        } else if (activeIcon && /*#__PURE__*/_react["default"].isValidElement(activeIcon)) {
          activeIcon = /*#__PURE__*/_react["default"].cloneElement(activeIcon, {
            active: activeAttr
          });
        }

        return /*#__PURE__*/_react["default"].createElement(NavigationButton, _extends({}, tab, {
          fullSizeInk: fullSizeInk,
          key: index,
          onClick: function onClick() {
            _this3.goTo(tab);
          },
          active: active,
          width: _tabWidth,
          height: _tabHeight,
          icon: icon,
          activeIcon: activeIcon,
          tooltipForceHide: tooltipForceHide
        }));
      }), ChildNavigationView && dropdownMenu && dropdownMenu.length ? /*#__PURE__*/_react["default"].createElement(ChildNavigationView, {
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
//# sourceMappingURL=NavigationBar.js.map
