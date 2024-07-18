"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
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
// TODO: consider refactoring onClose + clickOutToClose to onOverlayClick
function createModal(Comp) {
  var _class;
  return _class = /*#__PURE__*/function (_Component) {
    _inherits(KModal, _Component);
    var _super = _createSuper(KModal);
    function KModal(props) {
      var _this;
      _classCallCheck(this, KModal);
      _this = _super.call(this, props);
      _this._container = void 0;
      _this._container = document.createElement('div');
      return _this;
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    _createClass(KModal, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var root =
        // @ts-expect-error TS(2339): Property 'appendDOM' does not exist on type 'Reado... Remove this comment to see the full error message
        this.props.appendDOM || this.context.modalRoot && this.context.modalRoot.current || document.body;
        root.appendChild(this._container);
      } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this._container.parentNode) {
          this._container.parentNode.removeChild(this._container);
        }
      }
    }, {
      key: "renderDialog",
      value: function renderDialog() {
        var _this$props = this.props,
          className = _this$props.className,
          maskClassName = _this$props.maskClassName,
          modalClassName = _this$props.modalClassName,
          show = _this$props.show,
          onClose = _this$props.onClose,
          clickOutToClose = _this$props.clickOutToClose,
          props = _objectWithoutProperties(_this$props, ["className", "maskClassName", "modalClassName", "show", "onClose", "clickOutToClose"]);
        var onClick = clickOutToClose ? onClose : function () {};
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: show ? (0, _clsx["default"])(_styles["default"].container, className) : _styles["default"].containerHidden
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: show ? (0, _clsx["default"])(_styles["default"].mask, maskClassName) : _styles["default"].maskHidden,
          onClick: onClick
        }), /*#__PURE__*/_react["default"].createElement("div", {
          "data-sign": show ? 'deleteModal' : undefined,
          className: show ? (0, _clsx["default"])(_styles["default"].modal, modalClassName) : _styles["default"].modalHidden
        }, /*#__PURE__*/_react["default"].createElement(Comp, props)));
      } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/_reactDom["default"].createPortal(this.renderDialog(), this._container);
      }
    }]);
    return KModal;
  }(_react.Component), _class.propTypes = {
    className: _propTypes["default"].string,
    modalClassName: _propTypes["default"].string,
    show: _propTypes["default"].bool,
    onClose: _propTypes["default"].func,
    clickOutToClose: _propTypes["default"].bool,
    appendDOM: _propTypes["default"].object,
    maskClassName: _propTypes["default"].string
  }, _class.defaultProps = {
    className: '',
    modalClassName: '',
    show: false,
    onClose: undefined,
    clickOutToClose: false,
    appendDOM: undefined,
    maskClassName: undefined
  }, _class.contextTypes = {
    modalRoot: _propTypes["default"].object
  }, _class;
}
var _default = createModal;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
