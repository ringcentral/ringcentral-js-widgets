"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
/* eslint { "react/no-unused-state": 0 } */
var Draggable = /*#__PURE__*/function (_Component) {
  _inherits(Draggable, _Component);
  var _super = _createSuper(Draggable);
  function Draggable(props) {
    var _this;
    _classCallCheck(this, Draggable);
    _this = _super.call(this, props);
    _this._isClick = void 0;
    _this._onClick = void 0;
    _this._onMouseDown = void 0;
    _this._onMouseMove = void 0;
    _this._onMouseUp = void 0;
    _this._positionXOnMouseDown = void 0;
    _this._positionYOnMouseDown = void 0;
    _this.draggableDom = void 0;
    _this.state = {
      dragging: false,
      positionX: 0,
      positionY: 0,
      translateX: props.positionOffsetX,
      translateY: props.positionOffsetY
    };
    _this._isClick = true;
    _this._onMouseDown = function (e) {
      if (e.button !== 0) return;
      if (_this.state.dragging) {
        return;
      }
      _this.setState({
        positionX: e.clientX,
        positionY: e.clientY,
        dragging: true
      });
      _this._positionXOnMouseDown = e.clientX;
      _this._positionYOnMouseDown = e.clientY;
      _this._isClick = true;
      window.addEventListener('mousemove', _this._onMouseMove, false);
      window.addEventListener('mouseup', _this._onMouseUp, false);
      e.stopPropagation();
      e.preventDefault();
    };
    _this._onMouseMove = function (e) {
      if (!_this.state.dragging) {
        return;
      }
      if (!_this.draggableDom) {
        return;
      }
      var _this$draggableDom = _this.draggableDom,
        offsetParent = _this$draggableDom.offsetParent,
        originalPositionX = _this$draggableDom.offsetLeft,
        originalPositionY = _this$draggableDom.offsetTop;
      var newPositionX = e.clientX;
      var newPositionY = e.clientY;
      var child = _this.draggableDom.firstChild;
      var height = child && child.clientHeight || 0;
      var width = child && child.clientWidth || 0;
      if (Math.abs(newPositionX - _this._positionXOnMouseDown) >
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      _this.props.clickThreshold || Math.abs(newPositionY - _this._positionYOnMouseDown) >
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      _this.props.clickThreshold) {
        _this._isClick = false;
      }
      _this.setState(function (preState) {
        var newState = {
          positionX: newPositionX,
          positionY: newPositionY,
          translateX: preState.translateX + (newPositionX - preState.positionX),
          translateY: preState.translateY + (newPositionY - preState.positionY)
        };
        if (originalPositionX - 10 + newState.translateX > offsetParent.clientWidth || originalPositionX - 10 + newState.translateX < width) {
          delete newState.translateX;
        }
        if (originalPositionY + 10 + newState.translateY > offsetParent.clientHeight - height || originalPositionY + 10 + newState.translateY < 0) {
          delete newState.translateY;
        }
        return newState;
      });
      e.stopPropagation();
      e.preventDefault();
    };
    _this._onMouseUp = function (e) {
      _this.setState({
        dragging: false
      });
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      _this.props.updatePositionOffset(_this.state.translateX, _this.state.translateY);
      window.removeEventListener('mousemove', _this._onMouseMove);
      window.removeEventListener('mouseup', _this._onMouseUp);
      e.stopPropagation();
      e.preventDefault();
    };
    _this._onClick = function (e) {
      if (!_this._isClick) {
        return;
      }
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      _this.props.onClick(e);
    };
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(Draggable, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('mouseup', this._onMouseUp);
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children;
      var style = {
        msTransition: "translate(".concat(this.state.translateX, "px, ").concat(this.state.translateY, "px)"),
        WebkitTransition: "translate(".concat(this.state.translateX, "px, ").concat(this.state.translateY, "px)"),
        transform: "translate(".concat(this.state.translateX, "px, ").concat(this.state.translateY, "px)")
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        onMouseDown: this._onMouseDown,
        ref: function ref(draggableDom) {
          _this2.draggableDom = draggableDom;
        },
        style: style,
        className: (0, _clsx["default"])(_styles["default"].root, className),
        onClick: this._onClick
      }, children);
    }
  }]);
  return Draggable;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
Draggable.defaultProps = {
  className: null,
  onClick: function onClick() {
    return null;
  },
  positionOffsetX: 0,
  positionOffsetY: 0,
  updatePositionOffset: function updatePositionOffset() {
    return null;
  },
  clickThreshold: 5
};
var _default = Draggable;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
