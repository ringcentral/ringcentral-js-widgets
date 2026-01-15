"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.set-prototype-of.js");
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var SlideMenu = /*#__PURE__*/function (_Component) {
  function SlideMenu(props) {
    var _this;
    _classCallCheck(this, SlideMenu);
    _this = _callSuper(this, SlideMenu, [props]);
    _this._mounted = void 0;
    _this.onToggle = function (e) {
      e.stopPropagation();
      // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
      _this.setState(function (prevState) {
        return {
          extended: !prevState.extended
        };
      });
      // @ts-expect-error TS(2339): Property 'onToggle' does not exist on type 'Readon... Remove this comment to see the full error message
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
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _inherits(SlideMenu, _Component);
  return _createClass(SlideMenu, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
      var extended = this.props.extended;
      if (nextProps.extended !== extended) {
        this.setState({
          extended: nextProps.extended
        });
      }
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "render",
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function render() {
      var _this$props = this.props,
        className = _this$props.className,
        minHeight = _this$props.minHeight,
        maxHeight = _this$props.maxHeight,
        children = _this$props.children,
        withAnimation = _this$props.withAnimation,
        extendIconClassName = _this$props.extendIconClassName,
        propsExtended = _this$props.extended;

      // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
      var stateExtended = this.state.extended;
      var extended = propsExtended || stateExtended;
      var wrapperStyles = {
        height: extended ? maxHeight : minHeight
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].wrapper, withAnimation && _styles["default"].withAnimation),
        style: wrapperStyles
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].content
      }, children)), /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "extendButton",
        className: _styles["default"].extendIcon,
        "aria-expanded": Boolean(extended),
        onClick: this.onToggle
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].extendInner, extended ? (0, _clsx["default"])(_styles["default"].extended, extendIconClassName) : null)
      })));
    }
  }]);
}(_react.Component); // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
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
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
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
var _default = exports["default"] = SlideMenu;
//# sourceMappingURL=index.js.map
