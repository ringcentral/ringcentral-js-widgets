"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _sessionStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/sessionStatus"));
var _react = _interopRequireWildcard(require("react"));
var _ActiveCallBadge = _interopRequireDefault(require("../ActiveCallBadge"));
var _i18n = _interopRequireDefault(require("./i18n"));
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
var CallBadge = /*#__PURE__*/function (_Component) {
  _inherits(CallBadge, _Component);
  var _super = _createSuper(CallBadge);
  function CallBadge(props) {
    var _this;
    _classCallCheck(this, CallBadge);
    _this = _super.call(this, props);
    _this.updatePositionOffset = function (x, y) {
      _this.setState({
        badgeOffsetX: x,
        badgeOffsetY: y
      });
    };
    _this.onClick = function () {
      var isRinging = _this._isRinging();
      var _this$props = _this.props,
        session = _this$props.session,
        toggleMinimized = _this$props.toggleMinimized,
        goToCallCtrl = _this$props.goToCallCtrl;
      if (isRinging) {
        toggleMinimized(session.id);
        return;
      }
      goToCallCtrl(session.id);
    };
    _this.state = {
      badgeOffsetX: props.defaultOffsetX || 0,
      badgeOffsetY: props.defaultOffsetY || 0
    };
    return _this;
  }
  _createClass(CallBadge, [{
    key: "_isRinging",
    value: function _isRinging() {
      var isRinging = false;
      var session = this.props.session;
      if (session.direction === _callDirections["default"].inbound && session.callStatus === _sessionStatus["default"].connecting) {
        isRinging = true;
      }
      return isRinging;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        session = _this$props2.session,
        hidden = _this$props2.hidden,
        currentLocale = _this$props2.currentLocale;
      var _this$state = this.state,
        badgeOffsetX = _this$state.badgeOffsetX,
        badgeOffsetY = _this$state.badgeOffsetY;
      var active = !!session.id;
      if (!active) {
        return null;
      }
      var isRinging = this._isRinging();
      // @ts-expect-error TS(2339): Property 'minimized' does not exist on type 'Sessi... Remove this comment to see the full error message
      if (isRinging && !session.minimized) {
        return null;
      }
      if (hidden) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement(_ActiveCallBadge["default"], {
        onClick: this.onClick,
        offsetX: badgeOffsetX,
        offsetY: badgeOffsetY,
        updatePositionOffset: this.updatePositionOffset,
        title: _i18n["default"].getString('activeCall', currentLocale)
      });
    }
  }]);
  return CallBadge;
}(_react.Component);
exports["default"] = CallBadge;
//# sourceMappingURL=index.js.map
