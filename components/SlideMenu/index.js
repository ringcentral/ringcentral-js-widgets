"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var ExtendIcon = function ExtendIcon(_ref) {
  var onClick = _ref.onClick,
      extendIconClassName = _ref.extendIconClassName;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "extendButton",
    className: _styles["default"].extendIcon,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].extendInner, extendIconClassName)
  }));
};

ExtendIcon.propTypes = {
  onClick: _propTypes["default"].func,
  extendIconClassName: _propTypes["default"].string
};
ExtendIcon.defaultProps = {
  onClick: function onClick() {},
  extendIconClassName: undefined
};

var SlideMenu = /*#__PURE__*/function (_Component) {
  _inherits(SlideMenu, _Component);

  var _super = _createSuper(SlideMenu);

  function SlideMenu(props) {
    var _this;

    _classCallCheck(this, SlideMenu);

    _this = _super.call(this, props);

    _this.onToggle = function (e) {
      e.stopPropagation();

      _this.setState(function (prevState) {
        return {
          extended: !prevState.extended
        };
      });

      var onToggle = _this.props.onToggle;

      if (onToggle) {
        onToggle(e);
      }
    };

    _this.state = {
      extended: false
    };
    return _this;
  }

  _createClass(SlideMenu, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var extended = this.props.extended;

      if (nextProps.extended !== extended) {
        this.setState({
          extended: nextProps.extended
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          minHeight = _this$props.minHeight,
          maxHeight = _this$props.maxHeight,
          children = _this$props.children,
          withAnimation = _this$props.withAnimation,
          extendIconClassName = _this$props.extendIconClassName,
          propsExtended = _this$props.extended;
      var stateExtended = this.state.extended;
      var extended = propsExtended || stateExtended;
      var wrapperStyles = {
        height: extended ? maxHeight : minHeight
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].wrapper, withAnimation && _styles["default"].withAnimation),
        style: wrapperStyles
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].content
      }, children)), /*#__PURE__*/_react["default"].createElement(ExtendIcon, {
        extendIconClassName: extended ? (0, _classnames["default"])(_styles["default"].extended, extendIconClassName) : null,
        onClick: this.onToggle
      }));
    }
  }]);

  return SlideMenu;
}(_react.Component);

SlideMenu.propTypes = {
  children: _propTypes["default"].node,
  extended: _propTypes["default"].bool,
  onToggle: _propTypes["default"].func,
  className: _propTypes["default"].string,
  extendIconClassName: _propTypes["default"].string,
  minHeight: _propTypes["default"].number,
  maxHeight: _propTypes["default"].number,
  withAnimation: _propTypes["default"].bool
};
SlideMenu.defaultProps = {
  className: undefined,
  extendIconClassName: undefined,
  children: undefined,
  onToggle: undefined,
  extended: false,
  minHeight: 0,
  maxHeight: 100,
  withAnimation: true
};
var _default = SlideMenu;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
