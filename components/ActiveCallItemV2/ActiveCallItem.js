"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalContent = exports.ActiveCallItem = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/web.timers.js");
var _telephonySessionStatus = require("@ringcentral-integration/commons/enums/telephonySessionStatus");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _ActiveCallControl = require("@ringcentral-integration/commons/modules/ActiveCallControl");
var _sessionStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/sessionStatus"));
var _webphoneHelper = require("@ringcentral-integration/commons/modules/Webphone/webphoneHelper");
var _clsx11 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));
var _End = _interopRequireDefault(require("../../assets/images/End.svg"));
var _Hold = _interopRequireDefault(require("../../assets/images/Hold.svg"));
var _HoldAnswer = _interopRequireDefault(require("../../assets/images/HoldAnswer.svg"));
var _Ignore = _interopRequireDefault(require("../../assets/images/Ignore.svg"));
var _MergeIntoConferenceIcon = _interopRequireDefault(require("../../assets/images/MergeIntoConferenceIcon.svg"));
var _Switch = _interopRequireDefault(require("../../assets/images/Switch.svg"));
var _Transfer = _interopRequireDefault(require("../../assets/images/Transfer.svg"));
var _Voicemail = _interopRequireDefault(require("../../assets/images/Voicemail.svg"));
var _img_call_switch = _interopRequireDefault(require("../../assets/images/img_call_switch.svg"));
var _i18n = _interopRequireWildcard(require("../ActiveCallItem/i18n"));
var _CallIcon = _interopRequireDefault(require("../CallIcon"));
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));
var _DurationCounter = require("../DurationCounter");
var _MediaObject = _interopRequireDefault(require("../MediaObject"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ModalContent = exports.ModalContent = function ModalContent(_ref) {
  var contactName = _ref.contactName,
    confirmContext = _ref.confirmContext;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].switchDialogImage
  }, /*#__PURE__*/_react["default"].createElement(_img_call_switch["default"], {
    width: "116",
    height: "69"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].switchDialogContent
  }, confirmContext !== null && confirmContext !== void 0 ? confirmContext : (0, _i18n.t)('comfirmContext', {
    displayName: contactName
  })));
};
var WebphoneButtons = function WebphoneButtons(_ref2) {
  var currentLocale = _ref2.currentLocale,
    _ref2$session = _ref2.session,
    session = _ref2$session === void 0 ? undefined : _ref2$session,
    webphoneReject = _ref2.webphoneReject,
    webphoneHangup = _ref2.webphoneHangup,
    webphoneResume = _ref2.webphoneResume,
    webphoneAnswer = _ref2.webphoneAnswer,
    webphoneHold = _ref2.webphoneHold,
    _ref2$showMergeCall = _ref2.showMergeCall,
    showMergeCall = _ref2$showMergeCall === void 0 ? false : _ref2$showMergeCall,
    _ref2$showHold = _ref2.showHold,
    showHold = _ref2$showHold === void 0 ? true : _ref2$showHold,
    _ref2$disableMerge = _ref2.disableMerge,
    disableMerge = _ref2$disableMerge === void 0 ? true : _ref2$disableMerge,
    _ref2$onMergeCall = _ref2.onMergeCall,
    onMergeCall = _ref2$onMergeCall === void 0 ? function (i) {
      return i;
    } : _ref2$onMergeCall,
    _ref2$disableLinks = _ref2.disableLinks,
    disableLinks = _ref2$disableLinks === void 0 ? false : _ref2$disableLinks,
    isOnHold = _ref2.isOnHold,
    telephonySessionId = _ref2.telephonySessionId,
    webphoneIgnore = _ref2.webphoneIgnore,
    showHoldAnswerBtn = _ref2.showHoldAnswerBtn,
    showIgnoreBtn = _ref2.showIgnoreBtn,
    _ref2$isConnecting = _ref2.isConnecting,
    isConnecting = _ref2$isConnecting === void 0 ? false : _ref2$isConnecting,
    isCallQueueCall = _ref2.isCallQueueCall;
  if (!session) {
    return null;
  }
  var answerBtn;
  var ignoreBtn;
  var endBtn;

  // @ts-expect-error TS(2345): Argument of type 'WebPhoneSession' is not assignab... Remove this comment to see the full error message
  if ((0, _callLogHelpers.isInbound)(session) && session.callStatus === _sessionStatus["default"].connecting) {
    showHold = false;
    answerBtn = /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('accept', currentLocale),
      className: _styles["default"].webphoneButton,
      "data-sign": "accept"
    }, !showHoldAnswerBtn ? /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      className: _styles["default"].answerButton,
      onClick: function onClick(e) {
        e.stopPropagation();
        webphoneAnswer(session.id, telephonySessionId);
      },
      icon: _Answer["default"],
      showBorder: false,
      disabled: disableLinks
    }) : /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('holdAndAnswer', currentLocale),
      "data-sign": "holdAndAnswer",
      onClick: function onClick(e) {
        e.stopPropagation();
        webphoneAnswer(session.id, telephonySessionId, true);
      }
    }, /*#__PURE__*/_react["default"].createElement(_HoldAnswer["default"], {
      className: _styles["default"].answerHoldButton
    })));
    endBtn = !isCallQueueCall && /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('toVoicemail', currentLocale),
      className: _styles["default"].webphoneButton,
      "data-sign": "toVoiceMail"
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      className: _styles["default"].rejectButton,
      onClick: function onClick(e) {
        e.stopPropagation();
        webphoneReject(session.id, telephonySessionId);
      },
      iconWidth: 260,
      iconX: 120,
      icon: _Voicemail["default"],
      showBorder: false,
      disabled: disableLinks
    }));
    if (showIgnoreBtn) {
      var ignoreTitle = _i18n["default"].getString('ignore', currentLocale);
      ignoreBtn = /*#__PURE__*/_react["default"].createElement("span", {
        title: _i18n["default"].getString('ignore', currentLocale),
        className: _styles["default"].webphoneButton,
        "data-sign": "ignore"
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        className: (0, _clsx11["default"])(_defineProperty(_defineProperty({}, _styles["default"].mergeButton, true), _styles["default"].disabled, disableLinks)),
        onClick: function onClick(e) {
          e.stopPropagation();
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          webphoneIgnore(telephonySessionId);
        },
        iconWidth: 260,
        iconX: 120,
        icon: _Ignore["default"],
        showBorder: true,
        disabled: disableLinks
      }));
    }
  } else {
    endBtn = /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('hangup', currentLocale),
      className: _styles["default"].webphoneButton,
      "data-sign": "hangup"
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      className: _styles["default"].rejectButton,
      onClick: function onClick(e) {
        e.stopPropagation();
        webphoneHangup(session.id, telephonySessionId);
      },
      iconWidth: 260,
      iconX: 120,
      icon: _End["default"],
      showBorder: false,
      disabled: disableLinks
    }));
  }
  var holdBtn;
  var mergeBtn;
  if (showHold) {
    if (isOnHold(session)) {
      holdBtn = /*#__PURE__*/_react["default"].createElement("span", {
        title: _i18n["default"].getString('unhold', currentLocale),
        className: _styles["default"].webphoneButton,
        "data-sign": "unhold"
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        className: (0, _clsx11["default"])(_styles["default"].holdButton, _styles["default"].active, _defineProperty({}, _styles["default"].disabled, disableLinks || isConnecting)),
        onClick: function onClick(e) {
          e.stopPropagation();
          webphoneResume(session.id, telephonySessionId);
        },
        iconWidth: 260,
        iconX: 120,
        icon: _Hold["default"],
        disabled: disableLinks || isConnecting,
        showBorder: true
      }));
    } else {
      holdBtn = /*#__PURE__*/_react["default"].createElement("span", {
        title: _i18n["default"].getString('hold', currentLocale),
        className: _styles["default"].webphoneButton,
        "data-sign": "hold"
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        className: (0, _clsx11["default"])(_styles["default"].holdButton, _defineProperty({}, _styles["default"].disabled, disableLinks || isConnecting)),
        onClick: function onClick(e) {
          e.stopPropagation();
          webphoneHold(session.id, telephonySessionId);
        },
        iconWidth: 260,
        iconX: 120,
        icon: _Hold["default"],
        disabled: disableLinks || isConnecting,
        showBorder: true
      }));
    }
  }
  if (showMergeCall) {
    mergeBtn = /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('mergeToConference', currentLocale),
      className: _styles["default"].webphoneButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      className: (0, _clsx11["default"])(_defineProperty(_defineProperty({}, _styles["default"].mergeButton, true), _styles["default"].disabled, disableMerge || disableLinks)),
      dataSign: "merge",
      onClick: function onClick(e) {
        e.stopPropagation();
        onMergeCall(session.id, telephonySessionId);
      },
      iconWidth: 260,
      iconX: 120,
      icon: _MergeIntoConferenceIcon["default"],
      showBorder: true,
      disabled: disableMerge || disableLinks
    }));
  }
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, ignoreBtn, holdBtn, mergeBtn, endBtn, answerBtn);
};
var ActiveCallControlButtons = function ActiveCallControlButtons(_ref3) {
  var _ref3$session = _ref3.session,
    session = _ref3$session === void 0 ? undefined : _ref3$session,
    showRingoutCallControl = _ref3.showRingoutCallControl,
    showSwitchCall = _ref3.showSwitchCall,
    showTransferCall = _ref3.showTransferCall,
    showHoldOnOtherDevice = _ref3.showHoldOnOtherDevice,
    currentLocale = _ref3.currentLocale,
    _ref3$disableLinks = _ref3.disableLinks,
    disableLinks = _ref3$disableLinks === void 0 ? false : _ref3$disableLinks,
    telephonySessionId = _ref3.telephonySessionId,
    ringoutHangup = _ref3.ringoutHangup,
    ringoutReject = _ref3.ringoutReject,
    _ref3$ringoutTransfer = _ref3.ringoutTransfer,
    ringoutTransfer = _ref3$ringoutTransfer === void 0 ? undefined : _ref3$ringoutTransfer,
    ringing = _ref3.ringing,
    inbound = _ref3.inbound,
    _ref3$onClickSwitchBt = _ref3.onClickSwitchBtn,
    onClickSwitchBtn = _ref3$onClickSwitchBt === void 0 ? undefined : _ref3$onClickSwitchBt,
    _ref3$webphoneResume = _ref3.webphoneResume,
    webphoneResume = _ref3$webphoneResume === void 0 ? undefined : _ref3$webphoneResume,
    _ref3$webphoneHold = _ref3.webphoneHold,
    webphoneHold = _ref3$webphoneHold === void 0 ? undefined : _ref3$webphoneHold,
    _ref3$isConnecting = _ref3.isConnecting,
    isConnecting = _ref3$isConnecting === void 0 ? false : _ref3$isConnecting,
    _ref3$clickSwitchTrac = _ref3.clickSwitchTrack,
    clickSwitchTrack = _ref3$clickSwitchTrac === void 0 ? function () {} : _ref3$clickSwitchTrac;
  if (!showRingoutCallControl && !showSwitchCall) return null;
  var switchCallButton;
  if (showSwitchCall) {
    var disabled = disableLinks || ringing;
    switchCallButton = /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('switchCall', currentLocale),
      className: (0, _clsx11["default"])(_styles["default"].ringoutButton, _styles["default"].cursorPointer),
      "data-sign": "switchCall"
    }, /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
      className: (0, _clsx11["default"])(_defineProperty(_defineProperty({}, _styles["default"].switchButton, true), _styles["default"].disabled, disabled)),
      onClick: function onClick(e) {
        e.stopPropagation();
        if (!disabled) {
          clickSwitchTrack();
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          onClickSwitchBtn();
        }
      }
    }));
  }
  if (!showRingoutCallControl) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].ringoutButtons
    }, switchCallButton);
  }
  var endBtn;
  var holdBtn;
  var inComingCall = inbound && ringing;
  if (inComingCall) {
    var rejectTitle = _i18n["default"].getString('reject', currentLocale);
    endBtn = /*#__PURE__*/_react["default"].createElement("span", {
      title: rejectTitle,
      className: _styles["default"].ringoutButton,
      "data-sign": "hangup"
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      disabled: disableLinks,
      className: (0, _clsx11["default"])(_defineProperty(_defineProperty({}, _styles["default"].endButton, true), _styles["default"].disabled, disableLinks)),
      onClick: function onClick(e) {
        e.stopPropagation();
        ringoutReject(telephonySessionId);
      },
      icon: _End["default"],
      showBorder: false
    }));
  } else {
    endBtn = /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('hangup', currentLocale),
      className: _styles["default"].ringoutButton,
      "data-sign": "hangup"
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      disabled: disableLinks,
      className: (0, _clsx11["default"])(_defineProperty(_defineProperty({}, _styles["default"].endButton, true), _styles["default"].disabled, disableLinks)),
      onClick: function onClick(e) {
        e.stopPropagation();
        ringoutHangup(telephonySessionId);
      },
      icon: _End["default"],
      showBorder: false
    }));
    var _disabled = disableLinks || isConnecting || ringing;
    if (session) {
      // @ts-expect-error TS(2345): Argument of type 'object' is not assignable to par... Remove this comment to see the full error message
      if ((0, _ActiveCallControl.isHolding)(session)) {
        holdBtn = /*#__PURE__*/_react["default"].createElement("span", {
          title: _i18n["default"].getString('unhold', currentLocale),
          className: _styles["default"].webphoneButton,
          "data-sign": "unhold"
        }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
          className: (0, _clsx11["default"])(_styles["default"].holdButton, _styles["default"].active, _defineProperty({}, _styles["default"].disabled, _disabled)),
          onClick: function onClick(e) {
            e.stopPropagation();
            // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
            webphoneResume('', telephonySessionId);
          },
          iconWidth: 260,
          iconX: 120,
          icon: _Hold["default"],
          disabled: _disabled,
          showBorder: true
        }));
      } else {
        holdBtn = /*#__PURE__*/_react["default"].createElement("span", {
          title: _i18n["default"].getString('hold', currentLocale),
          className: (0, _clsx11["default"])(_styles["default"].webphoneButton),
          "data-sign": "hold"
        }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
          className: (0, _clsx11["default"])(_styles["default"].holdButton, _defineProperty({}, _styles["default"].disabled, _disabled)),
          onClick: function onClick(e) {
            e.stopPropagation();
            // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
            webphoneHold('', telephonySessionId);
          },
          iconWidth: 260,
          iconX: 120,
          icon: _Hold["default"],
          disabled: _disabled,
          showBorder: true
        }));
      }
    }
  }
  var transferBtn;
  if (ringoutTransfer && !inComingCall) {
    var transferTitle = _i18n["default"].getString('transfer', currentLocale);
    transferBtn = /*#__PURE__*/_react["default"].createElement("span", {
      title: transferTitle,
      className: _styles["default"].ringoutButton,
      "data-sign": "transfer"
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      disabled: disableLinks,
      className: (0, _clsx11["default"])(_defineProperty(_defineProperty({}, _styles["default"].transferButton, true), _styles["default"].disabled, disableLinks)),
      onClick: function onClick(e) {
        e.stopPropagation();
        ringoutTransfer(telephonySessionId);
      },
      icon: _Transfer["default"]
    }));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].ringoutButtons
  }, showHoldOnOtherDevice && holdBtn, showTransferCall && transferBtn, switchCallButton, endBtn);
};

/**
 * TODO: Gradually replace <ActiveCallItem/> with this component
 */
var ActiveCallItem = exports.ActiveCallItem = /*#__PURE__*/function (_Component) {
  function ActiveCallItem(props) {
    var _this;
    _classCallCheck(this, ActiveCallItem);
    _this = _callSuper(this, ActiveCallItem, [props]);
    _this._userSelection = void 0;
    // @ts-expect-error TS(2564): Property 'toVoicemailTimeout' has no initializer a... Remove this comment to see the full error message
    _this.toVoicemailTimeout = void 0;
    // @ts-expect-error TS(2564): Property '_mounted' has no initializer and is not ... Remove this comment to see the full error message
    _this._mounted = void 0;
    _this.webphoneToVoicemail = void 0;
    // @ts-expect-error TS(2564): Property 'modalId' has no initializer and is not d... Remove this comment to see the full error message
    _this.modalId = void 0;
    _this.onSelectContact = function (value, idx) {
      if (!value || typeof _this.props.getAvatarUrl !== 'function') {
        return;
      }
      _this._userSelection = true;
      _this.setState({
        selected: idx
      });
      if (value) {
        _this.props.getAvatarUrl(value).then(function (avatarUrl) {
          if (_this._mounted) {
            _this.setState({
              avatarUrl: avatarUrl
            });
          }
        });
        if (_this.props.call.webphoneSession) {
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          _this.props.updateSessionMatchedContact(_this.props.call.webphoneSession.id, value);
        }
      }
    };
    _this.getSelectedContactIdx = function () {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;
      var contactMatches = _this.getContactMatches(nextProps);
      var selected = null;
      if (!nextProps.call.webphoneSession) {
        selected = 0;
      } else if (contactMatches && contactMatches.length) {
        // @ts-expect-error TS(2339): Property 'contactMatch' does not exist on type 'We... Remove this comment to see the full error message
        var contact = nextProps.call.webphoneSession.contactMatch;
        if (contact) {
          selected = contactMatches.findIndex(function (match) {
            return match.id === contact.id;
          });
        }
        if (selected === -1 || !contact) {
          selected = 0;
        }
      }
      return selected;
    };
    _this.getSelectedContact = function () {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.getSelectedContactIdx();
      var nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props;
      var contactMatches = _this.getContactMatches(nextProps);
      // @ts-expect-error TS(2538): Type 'null' cannot be used as an index type.
      return contactMatches && contactMatches[selected] || null;
    };
    _this.onClickSwitchBtn = function () {
      var _this$props = _this.props,
        renderContactName = _this$props.renderContactName,
        call = _this$props.call,
        modalConfirm = _this$props.modalConfirm,
        isWide = _this$props.isWide,
        currentLocale = _this$props.currentLocale,
        webphoneSwitchCall = _this$props.webphoneSwitchCall,
        onSwitchCall = _this$props.onSwitchCall;
      // !refactor
      // TODO: Consider refactoring modalConfirm out of UI components!!!!!!!!!!!!!!
      // use modalConfirm for ActiveCallsUI module
      if (onSwitchCall) {
        onSwitchCall(call);
        return;
      }
      if (modalConfirm) {
        var contactName = typeof renderContactName === 'function' ? renderContactName(call) : undefined;
        _this.modalId = modalConfirm({
          childrenSize: isWide ? 'medium' : 'small',
          title: _i18n["default"].getString('callSwitch', currentLocale),
          className: _styles["default"].switchDialog,
          contentProps: {
            contactName:
            // @ts-expect-error TS(2339): Property 'title' does not exist on type 'string'.
            (contactName === null || contactName === void 0 ? void 0 : contactName.title) || contactName || _this.getPhoneNumber()
          },
          confirmButtonText: _i18n["default"].getString('comfirmOKButton', currentLocale),
          cancelButtonText: _i18n["default"].getString('comfirmCancelButton', currentLocale),
          onConfirm: function onConfirm() {
            webphoneSwitchCall(call);
            // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
            _this.modalId = null;
          },
          onCancel: function onCancel() {
            // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
            _this.modalId = null;
          }
        });
      }
    };
    _this.state = {
      selected: 0,
      isLogging: false,
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
      avatarUrl: null,
      extraNum: 0
    };
    _this._userSelection = false;
    // this.contactDisplay = null;

    _this.webphoneToVoicemail = function (sessionId, telephonySessionId) {
      if (typeof _this.props.webphoneToVoicemail !== 'function') {
        return;
      }
      _this.props.webphoneToVoicemail(sessionId, telephonySessionId);
      _this.toVoicemailTimeout = window.setTimeout(function () {
        _this.props.webphoneReject(sessionId, telephonySessionId);
      }, 3000);
    };
    return _this;
  }
  _inherits(ActiveCallItem, _Component);
  return _createClass(ActiveCallItem, [{
    key: "setContact",
    value: function setContact() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var isOnConferenceCall = nextProps.isOnConferenceCall,
        conferenceCallParties = nextProps.conferenceCallParties;
      if (isOnConferenceCall) {
        this.setState({
          avatarUrl: conferenceCallParties.map(function (profile) {
            return profile.avatarUrl;
          })[0],
          extraNum: conferenceCallParties.length > 0 ? conferenceCallParties.length - 1 : 0
        });
        return;
      }
      var selected = this.getSelectedContactIdx(nextProps);
      this.onSelectContact(this.getSelectedContact(selected, nextProps),
      // @ts-expect-error TS(2345): Argument of type 'number | null' is not assignable... Remove this comment to see the full error message
      selected);
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
      this.setContact();
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.getContactMatches(nextProps) !== this.getContactMatches()) {
        this.setContact(nextProps);
      }
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      if (this.toVoicemailTimeout) {
        window.clearTimeout(this.toVoicemailTimeout);
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'number'.
        this.toVoicemailTimeout = null;
      }
      if (this.modalId) {
        this.props.modalClose(this.modalId);
      }
    }
  }, {
    key: "getCallInfo",
    value: function getCallInfo() {
      var _this$props2 = this.props,
        _this$props2$call = _this$props2.call,
        telephonyStatus = _this$props2$call.telephonyStatus,
        startTime = _this$props2$call.startTime,
        offset = _this$props2$call.offset,
        disableLinks = _this$props2.disableLinks,
        currentLocale = _this$props2.currentLocale,
        showCallDetail = _this$props2.showCallDetail,
        useCallDetailV2 = _this$props2.useCallDetailV2;
      if (!showCallDetail) {
        return null;
      }

      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      var telephonyStatusInfo = _i18n["default"].getString(telephonyStatus, currentLocale);
      var callStatusComp = /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].split
      }, "|"), /*#__PURE__*/_react["default"].createElement("span", {
        title: telephonyStatusInfo
      }, telephonyStatusInfo));
      if (useCallDetailV2) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].callDetail,
          "data-sign": "duration"
        }, /*#__PURE__*/_react["default"].createElement(_DurationCounter.DurationCounter, {
          startTime: startTime,
          offset: offset
        }));
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callDetail
      }, disableLinks ? _i18n["default"].getString('unavailable', currentLocale) : /*#__PURE__*/_react["default"].createElement(_DurationCounter.DurationCounter, {
        startTime: startTime,
        offset: offset
      }), callStatusComp);
    }
  }, {
    key: "getFallbackContactName",
    value: function getFallbackContactName() {
      return (0, _callLogHelpers.isInbound)(this.props.call) ? this.props.call.from.name :
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this.props.call.to.name;
    }
  }, {
    key: "getContactMatches",
    value: function getContactMatches() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      return (0, _callLogHelpers.isInbound)(nextProps.call) ? nextProps.call.fromMatches : nextProps.call.toMatches;
    }
  }, {
    key: "getPhoneNumber",
    value: function getPhoneNumber() {
      return (0, _callLogHelpers.isInbound)(this.props.call) ? this.props.call.from.phoneNumber || this.props.call.from.extensionNumber :
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this.props.call.to.phoneNumber || this.props.call.to.extensionNumber;
    }
  }, {
    key: "render",
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function render() {
      var _telephonySession$oth, _telephonySession$oth2;
      var _this$props3 = this.props,
        warmTransferRole = _this$props3.warmTransferRole,
        _this$props3$call = _this$props3.call,
        direction = _this$props3$call.direction,
        webphoneSession = _this$props3$call.webphoneSession,
        telephonySessionId = _this$props3$call.telephonySessionId,
        telephonySession = _this$props3$call.telephonySession,
        disableLinks = _this$props3.disableLinks,
        currentLocale = _this$props3.currentLocale,
        areaCode = _this$props3.areaCode,
        countryCode = _this$props3.countryCode,
        enableContactFallback = _this$props3.enableContactFallback,
        isLogging = _this$props3.isLogging,
        brand = _this$props3.brand,
        showContactDisplayPlaceholder = _this$props3.showContactDisplayPlaceholder,
        webphoneHangup = _this$props3.webphoneHangup,
        webphoneResume = _this$props3.webphoneResume,
        sourceIcons = _this$props3.sourceIcons,
        phoneTypeRenderer = _this$props3.phoneTypeRenderer,
        phoneSourceNameRenderer = _this$props3.phoneSourceNameRenderer,
        renderContactName = _this$props3.renderContactName,
        renderSubContactName = _this$props3.renderSubContactName,
        renderExtraButton = _this$props3.renderExtraButton,
        contactDisplayStyle = _this$props3.contactDisplayStyle,
        isOnConferenceCall = _this$props3.isOnConferenceCall,
        webphoneHold = _this$props3.webphoneHold,
        onClick = _this$props3.onClick,
        showMergeCall = _this$props3.showMergeCall,
        showHold = _this$props3.showHold,
        showAvatar = _this$props3.showAvatar,
        disableMerge = _this$props3.disableMerge,
        onMergeCall = _this$props3.onMergeCall,
        showCallDetail = _this$props3.showCallDetail,
        webphoneAnswer = _this$props3.webphoneAnswer,
        ringoutHangup = _this$props3.ringoutHangup,
        ringoutTransfer = _this$props3.ringoutTransfer,
        ringoutReject = _this$props3.ringoutReject,
        showRingoutCallControl = _this$props3.showRingoutCallControl,
        showSwitchCall = _this$props3.showSwitchCall,
        showTransferCall = _this$props3.showTransferCall,
        showHoldOnOtherDevice = _this$props3.showHoldOnOtherDevice,
        showMultipleMatch = _this$props3.showMultipleMatch,
        isOnHold = _this$props3.isOnHold,
        newCallIcon = _this$props3.newCallIcon,
        webphoneIgnore = _this$props3.webphoneIgnore,
        showHoldAnswerBtn = _this$props3.showHoldAnswerBtn,
        showIgnoreBtn = _this$props3.showIgnoreBtn,
        showCallerIdName = _this$props3.showCallerIdName,
        clickSwitchTrack = _this$props3.clickSwitchTrack,
        formatPhone = _this$props3.formatPhone;
      var _this$state = this.state,
        avatarUrl = _this$state.avatarUrl,
        extraNum = _this$state.extraNum;
      var phoneNumber = this.getPhoneNumber();
      var contactMatches = this.getContactMatches();
      var fallbackContactName = this.getFallbackContactName();
      // @ts-expect-error TS(2345): Argument of type 'Call' is not assignable to param... Remove this comment to see the full error message
      var ringing = (0, _callLogHelpers.isRinging)(this.props.call);
      var inbound = (0, _callLogHelpers.isInbound)(this.props.call);
      var contactName = typeof renderContactName === 'function' ? renderContactName(this.props.call) : undefined;
      var subContactName = typeof renderSubContactName === 'function' ? renderSubContactName(this.props.call) : undefined;
      var extraButton = typeof renderExtraButton === 'function' ? /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].extraButton
      }, renderExtraButton(this.props.call)) : undefined;
      var hasCallControl = !!(webphoneSession || showRingoutCallControl || showSwitchCall);
      var cursorPointer = hasCallControl && !!onClick;
      // real outbound call status
      var isConnecting = (telephonySession === null || telephonySession === void 0 ? void 0 : (_telephonySession$oth = telephonySession.otherParties[0]) === null || _telephonySession$oth === void 0 ? void 0 : (_telephonySession$oth2 = _telephonySession$oth.status) === null || _telephonySession$oth2 === void 0 ? void 0 : _telephonySession$oth2.code) === _telephonySessionStatus.telephonySessionStatus.proceeding;
      var callerIdName = showCallerIdName ? (0, _callLogHelpers.getWebphoneSessionDisplayName)(this.props.call.webphoneSession) : undefined;

      // @ts-expect-error
      var callQueueName = webphoneSession === null || webphoneSession === void 0 ? void 0 : webphoneSession.callQueueName;
      var isCallQueueCall = !!callQueueName;
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "callItem",
        className: _styles["default"].callItemContainer
      }, /*#__PURE__*/_react["default"].createElement(_MediaObject["default"], {
        containerCls: _styles["default"].wrapper,
        bodyCls: (0, _clsx11["default"])(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _styles["default"].content, true), _styles["default"].cursorPointer, cursorPointer), _styles["default"].cursorUnset, !cursorPointer), _styles["default"].disabled, hasCallControl && disableLinks)),
        leftCls: (0, _clsx11["default"])(_defineProperty(_defineProperty(_defineProperty({}, _styles["default"].cursorPointer, cursorPointer), _styles["default"].cursorUnset, !cursorPointer), _styles["default"].disabled, hasCallControl && disableLinks)),
        mediaLeft:
        /*#__PURE__*/
        // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | null' is not ass... Remove this comment to see the full error message
        _react["default"].createElement("div", {
          onClick: hasCallControl && onClick ? onClick : null
        }, /*#__PURE__*/_react["default"].createElement(_CallIcon["default"], {
          direction: direction,
          ringing: ringing
          // @ts-expect-error TS(2322): Type '{ direction: "Inbound" | "Outbound"; ringing... Remove this comment to see the full error message
          ,
          active: true,
          missed: false,
          inboundTitle: _i18n["default"].getString('inboundCall', currentLocale),
          outboundTitle: _i18n["default"].getString('outboundCall', currentLocale),
          missedTitle: _i18n["default"].getString('missedCall', currentLocale),
          isOnConferenceCall: isOnConferenceCall,
          showAvatar: showAvatar,
          avatarUrl: avatarUrl,
          extraNum: extraNum,
          newCallIcon: newCallIcon
        })),
        mediaBody: /*#__PURE__*/_react["default"].createElement("div", {
          "data-sign": "callNameAndDurationWrap",
          onClick: hasCallControl && onClick ? onClick : undefined,
          className: _styles["default"].strechVertical
        }, /*#__PURE__*/_react["default"].createElement(_ContactDisplay["default"], {
          warmTransferRole: warmTransferRole,
          callerIdName: callerIdName,
          formatPhone: formatPhone,
          isOnConferenceCall: isOnConferenceCall,
          contactName: showMultipleMatch ? undefined : contactName,
          subContactName: subContactName,
          className: (0, _clsx11["default"])(_styles["default"].contactDisplay, contactDisplayStyle),
          contactMatches: contactMatches,
          selected: this.state.selected,
          onSelectContact: this.onSelectContact,
          disabled: !showMultipleMatch,
          iconClassName: showMultipleMatch ? undefined : _styles["default"].selectIcon,
          isLogging: isLogging || this.state.isLogging,
          fallBackName: fallbackContactName,
          enableContactFallback: enableContactFallback,
          areaCode: areaCode,
          countryCode: countryCode,
          phoneNumber: phoneNumber,
          currentLocale: currentLocale,
          brand: brand,
          showPlaceholder: showContactDisplayPlaceholder,
          showType: false
          // @ts-expect-error TS(2322): Type 'object | undefined' is not assignable to typ... Remove this comment to see the full error message
          ,
          sourceIcons: sourceIcons,
          phoneTypeRenderer: phoneTypeRenderer,
          phoneSourceNameRenderer: phoneSourceNameRenderer
        }), showCallDetail ? this.getCallInfo() : null),
        mediaRight: /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].actionIconsBox
        }, webphoneSession ? /*#__PURE__*/_react["default"].createElement(WebphoneButtons, {
          session: webphoneSession,
          isConnecting: isConnecting
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          ,
          telephonySessionId: telephonySessionId,
          webphoneReject: this.webphoneToVoicemail,
          webphoneHangup: webphoneHangup,
          webphoneResume: webphoneResume,
          webphoneHold: webphoneHold,
          currentLocale: currentLocale,
          showMergeCall: showMergeCall,
          showHold: showHold,
          disableMerge: disableMerge,
          onMergeCall: onMergeCall,
          webphoneAnswer: webphoneAnswer
          // @ts-expect-error TS(2322): Type '((session: object) => boolean) | undefined' ... Remove this comment to see the full error message
          ,
          isOnHold: isOnHold,
          webphoneIgnore: webphoneIgnore,
          showIgnoreBtn: showIgnoreBtn,
          showHoldAnswerBtn: showHoldAnswerBtn,
          disableLinks: disableLinks,
          isCallQueueCall: isCallQueueCall
        }) : /*#__PURE__*/_react["default"].createElement(ActiveCallControlButtons, {
          session: telephonySession
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          ,
          showSwitchCall: !webphoneSession && showSwitchCall,
          onClickSwitchBtn: this.onClickSwitchBtn
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          ,
          showRingoutCallControl: showRingoutCallControl
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          ,
          telephonySessionId: telephonySessionId,
          disableLinks: disableLinks,
          currentLocale: currentLocale,
          ringing: ringing,
          inbound: inbound,
          ringoutReject: ringoutReject,
          ringoutHangup: ringoutHangup,
          ringoutTransfer: ringoutTransfer
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          ,
          showTransferCall: showTransferCall
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          ,
          showHoldOnOtherDevice: showHoldOnOtherDevice,
          webphoneResume: webphoneResume,
          webphoneHold: webphoneHold,
          isConnecting: isConnecting,
          clickSwitchTrack: clickSwitchTrack
        }), extraButton)
      }));
    }
  }]);
}(_react.Component);
ActiveCallItem.defaultProps = {
  isLogging: false,
  disableLinks: false,
  enableContactFallback: false,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: {},
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  renderContactName: undefined,
  renderSubContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: '',
  isOnConferenceCall: false,
  onClick: undefined,
  showAvatar: true,
  getAvatarUrl: undefined,
  showMergeCall: false,
  showHold: true,
  disableMerge: false,
  onMergeCall: function onMergeCall(i) {
    return i;
  },
  showCallDetail: false,
  updateSessionMatchedContact: function updateSessionMatchedContact(i) {
    return i;
  },
  showRingoutCallControl: false,
  showMultipleMatch: false,
  showSwitchCall: false,
  showTransferCall: true,
  showHoldOnOtherDevice: false,
  isOnHold: _webphoneHelper.isOnHold
};
//# sourceMappingURL=ActiveCallItem.js.map
