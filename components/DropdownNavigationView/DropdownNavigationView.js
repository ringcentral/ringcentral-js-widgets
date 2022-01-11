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

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _DropdownNavigationItem = _interopRequireDefault(require("../DropdownNavigationItem"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DropdownNavigationView = /*#__PURE__*/function (_Component) {
  _inherits(DropdownNavigationView, _Component);

  var _super = _createSuper(DropdownNavigationView);

  function DropdownNavigationView(props) {
    var _this;

    _classCallCheck(this, DropdownNavigationView);

    _this = _super.call(this, props);
    _this.childNavigationElement = void 0;
    _this.removeChildNavBar = _this.removeChildNavBar.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DropdownNavigationView, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeListener();
    }
  }, {
    key: "setChildNavigationElement",
    value: function setChildNavigationElement(el) {
      var _this2 = this;

      setTimeout(function () {
        _this2.childNavigationElement = el;

        if (_this2.childNavigationElement) {
          _this2.addListener();
        } else {
          _this2.removeListener();
        }
      }, 0);
    }
  }, {
    key: "addListener",
    value: function addListener() {
      window.addEventListener('click', this.removeChildNavBar);
    }
  }, {
    key: "removeListener",
    value: function removeListener() {
      window.removeEventListener('click', this.removeChildNavBar);
    }
  }, {
    key: "removeChildNavBar",
    value: function removeChildNavBar(ev) {
      if (!this.childNavigationElement || this.childNavigationElement === ev.target || this.childNavigationElement.contains(ev.target)) {
        return;
      }

      this.removeListener();
      this.props.goTo({
        virtualPath: ''
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          tabs = _this$props.tabs,
          goTo = _this$props.goTo,
          currentPath = _this$props.currentPath,
          currentVirtualPath = _this$props.currentVirtualPath;
      return tabs.length ? /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root,
        ref: function ref(el) {
          _this3.setChildNavigationElement(el);
        }
      }, tabs.map(function (tab, index) {
        var Icon = tab.icon;
        var ActiveIcon = tab.activeIcon;
        var active = tab.isActive && tab.isActive(currentPath, currentVirtualPath) || tab.path && tab.path === currentPath || tab.virtualPath && tab.virtualPath === currentVirtualPath;
        var isReverseFillIcon = tab.path === '/contacts' && !active;
        return /*#__PURE__*/_react["default"].createElement(_DropdownNavigationItem["default"], _extends({}, tab, {
          key: index,
          onClick: function onClick() {
            goTo(tab);
          },
          active: active,
          icon: typeof Icon === 'function' ? /*#__PURE__*/_react["default"].createElement(Icon, null) : Icon,
          isReverseFillIcon: isReverseFillIcon,
          activeIcon: typeof ActiveIcon === 'function' ? /*#__PURE__*/_react["default"].createElement(ActiveIcon, null) : ActiveIcon
        }));
      })) : null;
    }
  }]);

  return DropdownNavigationView;
}(_react.Component);

exports["default"] = DropdownNavigationView;
//# sourceMappingURL=DropdownNavigationView.js.map
