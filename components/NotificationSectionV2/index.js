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
var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _CloseIcon = _interopRequireDefault(require("../../assets/images/CloseIcon.svg"));
var _Button = require("../Button");
var _LogNotificationV = _interopRequireDefault(require("../LogNotificationV2"));
var _i18n = _interopRequireDefault(require("./i18n"));
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
var NotificationSection = /*#__PURE__*/function (_Component) {
  _inherits(NotificationSection, _Component);
  var _super = _createSuper(NotificationSection);
  function NotificationSection() {
    _classCallCheck(this, NotificationSection);
    return _super.apply(this, arguments);
  }
  _createClass(NotificationSection, [{
    key: "UNSAFE_componentWillUpdate",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function UNSAFE_componentWillUpdate(nextProps) {
      var logNotification = nextProps.logNotification,
        onCloseNotification = nextProps.onCloseNotification,
        currentNotificationIdentify = nextProps.currentNotificationIdentify;
      if (currentNotificationIdentify) {
        var _logNotification$call = logNotification.call,
          call = _logNotification$call === void 0 ? {} : _logNotification$call;
        var result = call.result;
        if (result) {
          onCloseNotification();
        }
      }
    }
  }, {
    key: "renderLogSection",
    value: function renderLogSection() {
      var _this$props = this.props,
        formatPhone = _this$props.formatPhone,
        currentLocale = _this$props.currentLocale,
        logNotification = _this$props.logNotification,
        showNotiLogButton = _this$props.showNotiLogButton,
        onCloseNotification = _this$props.onCloseNotification,
        onSaveNotification = _this$props.onSaveNotification,
        onExpandNotification = _this$props.onExpandNotification,
        onDiscardNotification = _this$props.onDiscardNotification,
        currentNotificationIdentify = _this$props.currentNotificationIdentify,
        currentSession = _this$props.currentSession,
        _onReject = _this$props.onReject,
        _onHangup = _this$props.onHangup,
        shrinkNotification = _this$props.shrinkNotification,
        showLogOptions = _this$props.showLogOptions; // @ts-expect-error TS(2339): Property 'call' does not exist on type 'object | u... Remove this comment to see the full error message
      var call = logNotification.call;
      var result = call.result,
        telephonyStatus = call.telephonyStatus;
      var status = result || telephonyStatus;
      var statusI18n = null;
      var isIncomingCall = status === _telephonyStatus["default"].ringing && call.direction === _callDirections["default"].inbound;
      if (isIncomingCall) {
        statusI18n = _i18n["default"].getString('ringing', currentLocale);
      } else {
        statusI18n = _i18n["default"].getString('callConnected', currentLocale);
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].notificationModal,
        "data-sign": "notificationModal"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].modalHeader
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].modalTitle
      }, statusI18n), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].modalCloseBtn
      }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        dataSign: "closeButton",
        onClick: onCloseNotification
      }, /*#__PURE__*/_react["default"].createElement(_CloseIcon["default"], null)))), /*#__PURE__*/_react["default"].createElement(_LogNotificationV["default"], {
        showEndButton: true,
        showLogButton: showNotiLogButton,
        currentLocale: currentLocale,
        formatPhone: formatPhone,
        currentLog: logNotification
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        ,
        isExpand: logNotification.notificationIsExpand,
        onSave: onSaveNotification,
        onExpand: onExpandNotification,
        onDiscard: onDiscardNotification,
        onReject: function onReject() {
          return _onReject(currentNotificationIdentify);
        },
        onHangup: function onHangup() {
          return _onHangup(currentNotificationIdentify);
        },
        currentSession: currentSession,
        shrinkNotification: shrinkNotification,
        showLogOptions: showLogOptions
      })));
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      return this.renderLogSection();
    }
  }]);
  return NotificationSection;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
NotificationSection.defaultProps = {
  // Notification
  logNotification: undefined,
  onCloseNotification: undefined,
  onDiscardNotification: undefined,
  onSaveNotification: undefined,
  onExpandNotification: undefined,
  showNotiLogButton: true,
  currentNotificationIdentify: '',
  currentSession: undefined,
  shrinkNotification: undefined
};
var _default = NotificationSection;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
