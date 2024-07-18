"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));
require("rc-tooltip/assets/bootstrap_white.css");
var _react = _interopRequireWildcard(require("react"));
var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));
var _Forward = _interopRequireDefault(require("../../assets/images/Forward.svg"));
var _Ignore = _interopRequireDefault(require("../../assets/images/Ignore.svg"));
var _MessageFill = _interopRequireDefault(require("../../assets/images/MessageFill.svg"));
var _Voicemail = _interopRequireDefault(require("../../assets/images/Voicemail.svg"));
var _ActiveCallButton = _interopRequireDefault(require("../ActiveCallButton"));
var _ForwardForm = _interopRequireDefault(require("../ForwardForm"));
var _MultiCallAnswerButton = _interopRequireDefault(require("../MultiCallAnswerButton"));
var _ReplyWithMessage = _interopRequireDefault(require("../ReplyWithMessage"));
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
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); } // @ts-expect-error TS(7016): Could not find a declaration file for module 'rc-t... Remove this comment to see the full error message
var TooltipCom = typeof _rcTooltip["default"] === 'function' ? _rcTooltip["default"] : _rcTooltip["default"]["default"];
var IncomingCallPad = /*#__PURE__*/function (_Component) {
  _inherits(IncomingCallPad, _Component);
  var _super = _createSuper(IncomingCallPad);
  function IncomingCallPad(props) {
    var _this;
    _classCallCheck(this, IncomingCallPad);
    _this = _super.call(this, props);
    _this.closeForwardForm = void 0;
    _this.closeReplyWithMessage = void 0;
    _this.forwardContainner = void 0;
    _this.onReplyMessageChange = void 0;
    _this.onShowForwardChange = void 0;
    _this.onShowReplyWithMessageChange = void 0;
    _this.replyTimeout = void 0;
    _this.replyWithMessage = void 0;
    _this.replyWithMessageContainner = void 0;
    _this.toVoiceMail = void 0;
    _this.voicemailTimeout = void 0;
    _this.state = {
      showForward: false,
      replyMessage: null,
      showReplyWithMessage: false,
      toVoiceMailEnabled: true,
      replyMessageEnabled: true
    };
    _this.onShowForwardChange = function (visible) {
      _this.setState({
        showForward: visible
      });
    };
    _this.closeForwardForm = function () {
      _this.onShowForwardChange(false);
    };
    _this.onShowReplyWithMessageChange = function (visible) {
      _this.setState({
        showReplyWithMessage: visible
      });
    };
    _this.onReplyMessageChange = function (message) {
      _this.setState({
        replyMessage: message
      });
    };
    _this.closeReplyWithMessage = function () {
      _this.onShowReplyWithMessageChange(false);
    };
    _this.toVoiceMail = function () {
      _this.props.toVoiceMail();
      // @ts-expect-error TS(2774): This condition will always return true since this ... Remove this comment to see the full error message
      if (_this.props.toVoiceMail) {
        _this.setState({
          toVoiceMailEnabled: false
        });
        _this.voicemailTimeout = setTimeout(function () {
          _this.props.reject();
        }, 3000);
      }
    };
    _this.replyWithMessage = function (value) {
      _this.props.replyWithMessage(value);
      // @ts-expect-error TS(2774): This condition will always return true since this ... Remove this comment to see the full error message
      if (_this.props.replyWithMessage) {
        _this.setState({
          replyMessageEnabled: false
        });
        _this.replyTimeout = setTimeout(function () {
          _this.props.reject();
        }, 3000);
      }
    };
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(IncomingCallPad, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(newProps) {
      if (this.props.sessionId !== newProps.sessionId) {
        if (this.replyTimeout) {
          clearTimeout(this.replyTimeout);
          this.replyTimeout = null;
        }
        if (this.voicemailTimeout) {
          clearTimeout(this.voicemailTimeout);
          this.voicemailTimeout = null;
        }
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.replyTimeout) {
        clearTimeout(this.replyTimeout);
        this.replyTimeout = null;
      }
      if (this.voicemailTimeout) {
        clearTimeout(this.voicemailTimeout);
        this.voicemailTimeout = null;
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        currentLocale = _this$props.currentLocale,
        reject = _this$props.reject,
        answer = _this$props.answer,
        forwardingNumbers = _this$props.forwardingNumbers,
        formatPhone = _this$props.formatPhone,
        className = _this$props.className,
        hasOtherActiveCall = _this$props.hasOtherActiveCall,
        answerAndEnd = _this$props.answerAndEnd,
        answerAndHold = _this$props.answerAndHold; // const isMultiCall = true;
      var multiCallButtons = /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].buttonRow, _styles["default"].multiCallsButtonGroup)
      }, /*#__PURE__*/_react["default"].createElement(_MultiCallAnswerButton["default"]
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      , {
        onClick: answerAndEnd,
        title: _i18n["default"].getString('answerAndEnd', currentLocale),
        dataSign: "answerAndEnd",
        className: _styles["default"].callButton,
        isEndOtherCall: true
      }), /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        onClick: this.toVoiceMail,
        title: _i18n["default"].getString('toVoicemail', currentLocale),
        buttonClassName: this.state.toVoiceMailEnabled ? _styles["default"].voiceMailButton : '',
        icon: _Voicemail["default"],
        iconWidth: 274,
        iconX: 116,
        showBorder: !this.state.toVoiceMailEnabled,
        dataSign: "toVoiceMail",
        className: _styles["default"].callButton,
        disabled: !this.state.toVoiceMailEnabled
      }), /*#__PURE__*/_react["default"].createElement(_MultiCallAnswerButton["default"]
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      , {
        onClick: answerAndHold,
        title: _i18n["default"].getString('answerAndHold', currentLocale),
        dataSign: "answerAndHold",
        className: _styles["default"].callButton,
        isEndOtherCall: false
      }));
      var singleCallButtons = /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].buttonRow, _styles["default"].answerButtonGroup)
      }, /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        onClick: this.toVoiceMail,
        title: _i18n["default"].getString('toVoicemail', currentLocale),
        buttonClassName: this.state.toVoiceMailEnabled ? _styles["default"].voiceMailButton : '',
        icon: _Voicemail["default"],
        iconWidth: 274,
        iconX: 116,
        showBorder: !this.state.toVoiceMailEnabled,
        dataSign: "toVoiceMail",
        className: _styles["default"].bigCallButton,
        disabled: !this.state.toVoiceMailEnabled
      }), /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        onClick: answer,
        title: _i18n["default"].getString('answer', currentLocale),
        buttonClassName: _styles["default"].answerButton,
        icon: _Answer["default"],
        showBorder: false,
        dataSign: "answer",
        className: _styles["default"].bigCallButton
      }));
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].forwardContainner,
        ref: function ref(containner) {
          _this2.forwardContainner = containner;
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].replyWithMessageContainner,
        ref: function ref(containner) {
          _this2.replyWithMessageContainner = containner;
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonRow
      }, /*#__PURE__*/_react["default"].createElement(TooltipCom, {
        defaultVisible: false,
        visible: this.state.showForward,
        onVisibleChange: this.onShowForwardChange,
        placement: "topRight",
        trigger: "click",
        arrowContent: /*#__PURE__*/_react["default"].createElement("div", {
          className: "rc-tooltip-arrow-inner"
        }),
        getTooltipContainer: function getTooltipContainer() {
          return _this2.forwardContainner;
        },
        overlay: /*#__PURE__*/_react["default"].createElement(_ForwardForm["default"]
        // @ts-expect-error TS(2322): Type '{ forwardingNumbers: any[]; currentLocale: s... Remove this comment to see the full error message
        , {
          forwardingNumbers: forwardingNumbers,
          currentLocale: currentLocale,
          onCancel: this.closeForwardForm,
          formatPhone: formatPhone,
          onForward: this.props.onForward,
          searchContact: this.props.searchContact,
          searchContactList: this.props.searchContactList,
          phoneTypeRenderer: this.props.phoneTypeRenderer,
          phoneSourceNameRenderer: this.props.phoneSourceNameRenderer
        })
      }, /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        icon: _Forward["default"],
        iconWidth: 250,
        iconX: 125,
        onClick: function onClick() {
          return null;
        },
        title: _i18n["default"].getString('forward', currentLocale),
        dataSign: "forward",
        className: _styles["default"].callButton
      })), /*#__PURE__*/_react["default"].createElement(TooltipCom, {
        defaultVisible: false,
        visible: this.state.showReplyWithMessage,
        onVisibleChange: this.onShowReplyWithMessageChange,
        placement: "top",
        trigger: "click",
        arrowContent: /*#__PURE__*/_react["default"].createElement("div", {
          className: "rc-tooltip-arrow-inner"
        }),
        getTooltipContainer: function getTooltipContainer() {
          return _this2.replyWithMessageContainner;
        },
        overlay: /*#__PURE__*/_react["default"].createElement(_ReplyWithMessage["default"], {
          currentLocale: currentLocale,
          onCancel: this.closeReplyWithMessage
          // @ts-expect-error TS(2322): Type '{ currentLocale: string; onCancel: any; valu... Remove this comment to see the full error message
          ,
          value: this.state.replyMessage,
          onChange: this.onReplyMessageChange,
          onReply: this.replyWithMessage,
          disabled: !this.state.replyMessageEnabled
        })
      }, /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        onClick: function onClick() {
          return null;
        },
        icon: _MessageFill["default"],
        title: _i18n["default"].getString('reply', currentLocale),
        dataSign: "reply",
        className: _styles["default"].callButton
      })), /*#__PURE__*/_react["default"].createElement(_ActiveCallButton["default"], {
        onClick: reject,
        icon: _Ignore["default"],
        title: _i18n["default"].getString('ignore', currentLocale),
        dataSign: "ignore",
        className: _styles["default"].callButton
      })), hasOtherActiveCall ? multiCallButtons : singleCallButtons);
    }
  }]);
  return IncomingCallPad;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
IncomingCallPad.defaultProps = {
  formatPhone: function formatPhone(phone) {
    return phone;
  },
  className: null,
  answerAndEnd: function answerAndEnd() {
    return null;
  },
  answerAndHold: function answerAndHold() {
    return null;
  },
  hasOtherActiveCall: false,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined
};
var _default = IncomingCallPad;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
