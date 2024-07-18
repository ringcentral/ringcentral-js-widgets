"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _calleeTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/calleeTypes"));
var _sessionStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/sessionStatus"));
var _clsx2 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _CallAvatar = require("../CallAvatar");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var MergeInfo = /*#__PURE__*/function (_Component) {
  _inherits(MergeInfo, _Component);
  var _super = _createSuper(MergeInfo);
  function MergeInfo(props) {
    var _this;
    _classCallCheck(this, MergeInfo);
    _this = _super.call(this, props);
    _this.mounted = void 0;
    _this.timeout_clock = void 0;
    _this.state = {
      lastCallAvatar: null,
      lastCallInfoTimeout: false
    };
    _this.mounted = false;
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(MergeInfo, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      if (this.timeout_clock) {
        clearTimeout(this.timeout_clock);
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.mounted = true;
      var _this$props = this.props,
        lastCallInfo = _this$props.lastCallInfo,
        getAvatarUrl = _this$props.getAvatarUrl;
      if (lastCallInfo && !lastCallInfo.avatarUrl && lastCallInfo.lastCallContact) {
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        getAvatarUrl(lastCallInfo.lastCallContact).then(function (lastCallAvatar) {
          if (_this2.mounted) {
            _this2.setState({
              lastCallAvatar: lastCallAvatar
            });
          }
        });
      }
      if (lastCallInfo && lastCallInfo.calleeType !== _calleeTypes["default"].conference) {
        var isSimplifiedCallAndLastCallInfoNotReady = !lastCallInfo.name || !lastCallInfo.phoneNumber;
        if (isSimplifiedCallAndLastCallInfoNotReady) {
          this.timeout_clock = setTimeout(function () {
            if (_this2.mounted) {
              _this2.setState({
                lastCallInfoTimeout: true
              });
            }
          }, this.props.checkLastCallInfoTimeout);
        } else if (this.timeout_clock) {
          clearTimeout(this.timeout_clock);
        }
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _clsx;
      var _this$props2 = this.props,
        currentLocale = _this$props2.currentLocale,
        timeCounter = _this$props2.timeCounter,
        lastCallInfo = _this$props2.lastCallInfo,
        currentCallTitle = _this$props2.currentCallTitle,
        currentCallAvatarUrl = _this$props2.currentCallAvatarUrl,
        formatPhone = _this$props2.formatPhone;
      if (!lastCallInfo) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].userInfo
        });
      }
      var _this$state = this.state,
        lastCallAvatar = _this$state.lastCallAvatar,
        lastCallInfoTimeout = _this$state.lastCallInfoTimeout;
      var isLastCallInfoReady = !!lastCallInfo && (!!lastCallInfo.name || !!lastCallInfo.phoneNumber);
      var isLastCallEnded = lastCallInfo && lastCallInfo.status === _sessionStatus["default"].finished;
      var statusClasses = (0, _clsx2["default"])((_clsx = {}, _defineProperty(_clsx, _styles["default"].callee_status, true), _defineProperty(_clsx, _styles["default"].callee_status_disconnected, !!isLastCallEnded), _clsx));
      var isOnConferenceCall = !!(lastCallInfo && lastCallInfo.calleeType === _calleeTypes["default"].conference);
      var isContacts = !!(lastCallInfo && lastCallInfo.calleeType === _calleeTypes["default"].contacts);
      var isUnknown = !!(lastCallInfo && lastCallInfo.calleeType === _calleeTypes["default"].unknown);
      var calleeName = isContacts ? lastCallInfo.name : isUnknown && lastCallInfo.name ? lastCallInfo.name :
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      formatPhone(lastCallInfo.phoneNumber);
      var loadingText = _i18n["default"].getString('loading');
      var loadingTimeoutText = _i18n["default"].getString('loadingTimeout');
      var showSpinner = !lastCallInfoTimeout && !isLastCallInfoReady && !isOnConferenceCall;

      // in conference layout, call would show 'on hold' or 'disconnected'
      // in transfer layout, if the call is ongoing status, should show 'Ongoing'
      var callStatus = lastCallInfo.status === _sessionStatus["default"].finished ? 'disconnected' : 'onHold';
      if (!isOnConferenceCall && lastCallInfo.status === _sessionStatus["default"].connected) {
        callStatus = 'ongoing';
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].mergeInfo,
        "data-sign": "mergeInfo"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].merge_item
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callee_avatar
      }, /*#__PURE__*/_react["default"].createElement(_CallAvatar.CallAvatar, {
        avatarUrl: isContacts && !lastCallInfo.avatarUrl ? lastCallAvatar : lastCallInfo.avatarUrl,
        extraNum: isOnConferenceCall ? lastCallInfo.extraNum : 0,
        isOnConferenceCall: isOnConferenceCall,
        spinnerMode: showSpinner
      })), (isLastCallInfoReady || !isLastCallInfoReady && isOnConferenceCall) && /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callee_name
      }, isOnConferenceCall ? /*#__PURE__*/_react["default"].createElement("span", {
        title: _i18n["default"].getString('conferenceCall', currentLocale)
      }, _i18n["default"].getString('conferenceCall', currentLocale)) : /*#__PURE__*/_react["default"].createElement("span", {
        title: calleeName
      }, calleeName)), !isLastCallInfoReady && !isOnConferenceCall && (lastCallInfoTimeout ? /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].last_call_info_load_timeout
      }, /*#__PURE__*/_react["default"].createElement("span", {
        title: loadingTimeoutText
      }, loadingTimeoutText)) : /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callee_name
      }, /*#__PURE__*/_react["default"].createElement("span", {
        title: loadingText
      }, loadingText))), (isLastCallInfoReady || !isLastCallInfoReady && isOnConferenceCall) && /*#__PURE__*/_react["default"].createElement("div", {
        className: statusClasses
      }, _i18n["default"].getString(callStatus, currentLocale))), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].merge_item_active
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callee_avatar_active
      }, currentCallAvatarUrl ? /*#__PURE__*/_react["default"].createElement(_CallAvatar.CallAvatar, {
        avatarUrl: currentCallAvatarUrl
      }) :
      /*#__PURE__*/
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
      _react["default"].createElement(_CallAvatar.CallAvatar, {
        avatarUrl: null
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callee_name_active,
        "data-sign": "activeCalleeName"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        title: currentCallTitle
      }, currentCallTitle)), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callee_status_active
      }, timeCounter)));
    }
  }]);
  return MergeInfo;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
MergeInfo.defaultProps = {
  lastCallInfo: {
    calleeType: _calleeTypes["default"].unknown
  },
  currentCallTitle: undefined,
  currentCallAvatarUrl: undefined,
  formatPhone: function formatPhone() {
    return null;
  },
  getAvatarUrl: function getAvatarUrl() {
    return null;
  },
  /**
   * The timeout seconds to check if the last call info is received.
   */
  checkLastCallInfoTimeout: 30 * 1000
};
var _default = MergeInfo;
exports["default"] = _default;
//# sourceMappingURL=MergeInfo.js.map
