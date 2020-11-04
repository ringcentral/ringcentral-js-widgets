"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find-index");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames8 = _interopRequireDefault(require("classnames"));

var _sessionStatus = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/sessionStatus"));

var _callLogHelpers = require("ringcentral-integration/lib/callLogHelpers");

var _webphoneHelper = require("ringcentral-integration/modules/Webphone/webphoneHelper");

var _CallIcon = _interopRequireDefault(require("../CallIcon"));

var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _Hold = _interopRequireDefault(require("../../assets/images/Hold.svg"));

var _Flip = _interopRequireDefault(require("../../assets/images/Flip.svg"));

var _Voicemail = _interopRequireDefault(require("../../assets/images/Voicemail.svg"));

var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));

var _MergeIntoConferenceIcon = _interopRequireDefault(require("../../assets/images/MergeIntoConferenceIcon.svg"));

var _Transfer = _interopRequireDefault(require("../../assets/images/Transfer.svg"));

var _MediaObject = _interopRequireDefault(require("../MediaObject"));

var _DurationCounter = _interopRequireDefault(require("../DurationCounter"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("../ActiveCallItem/i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WebphoneButtons = function WebphoneButtons(_ref) {
  var currentLocale = _ref.currentLocale,
      session = _ref.session,
      webphoneReject = _ref.webphoneReject,
      webphoneHangup = _ref.webphoneHangup,
      webphoneResume = _ref.webphoneResume,
      webphoneAnswer = _ref.webphoneAnswer,
      webphoneHold = _ref.webphoneHold,
      showMergeCall = _ref.showMergeCall,
      showHold = _ref.showHold,
      disableMerge = _ref.disableMerge,
      onMergeCall = _ref.onMergeCall,
      disableLinks = _ref.disableLinks,
      isOnHold = _ref.isOnHold,
      telephonySessionId = _ref.telephonySessionId;

  if (!session) {
    return null;
  }

  var hangupFunc = webphoneHangup;
  var endIcon = _End["default"];
  var answerBtn = null;

  var rejectTitle = _i18n["default"].getString('hangup', currentLocale);

  var holdTitle = _i18n["default"].getString('hold', currentLocale);

  var unholdTitle = _i18n["default"].getString('unhold', currentLocale);

  if ((0, _callLogHelpers.isInbound)(session) && session.callStatus === _sessionStatus["default"].connecting) {
    hangupFunc = webphoneReject;
    endIcon = _Voicemail["default"];
    rejectTitle = _i18n["default"].getString('toVoicemail', currentLocale);
    showHold = false;
    answerBtn = /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('accept', currentLocale),
      className: _styles["default"].webphoneButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      className: _styles["default"].answerButton,
      onClick: function onClick(e) {
        e.stopPropagation();
        webphoneAnswer(session.id, telephonySessionId);
      },
      icon: _Answer["default"],
      showBorder: false,
      disabled: disableLinks
    }));
  }

  var holdBtn;
  var mergeBtn;

  if (showHold) {
    if (isOnHold(session)) {
      holdBtn = /*#__PURE__*/_react["default"].createElement("span", {
        title: unholdTitle,
        className: _styles["default"].webphoneButton
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        className: (0, _classnames8["default"])(_styles["default"].holdButton, _styles["default"].active),
        onClick: function onClick(e) {
          e.stopPropagation();
          webphoneResume(session.id, telephonySessionId);
        },
        iconWidth: 260,
        iconX: 120,
        icon: _Hold["default"],
        disabled: disableLinks,
        showBorder: true
      }));
    } else {
      holdBtn = /*#__PURE__*/_react["default"].createElement("span", {
        title: holdTitle,
        className: _styles["default"].webphoneButton
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        className: _styles["default"].holdButton,
        onClick: function onClick(e) {
          e.stopPropagation();
          webphoneHold(session.id, telephonySessionId);
        },
        iconWidth: 260,
        iconX: 120,
        icon: _Hold["default"],
        disabled: disableLinks,
        showBorder: true
      }));
    }
  }

  if (showMergeCall) {
    var _classnames;

    var mergeTitle = _i18n["default"].getString('mergeToConference', currentLocale);

    mergeBtn = /*#__PURE__*/_react["default"].createElement("span", {
      title: mergeTitle,
      className: _styles["default"].webphoneButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      className: (0, _classnames8["default"])((_classnames = {}, _defineProperty(_classnames, _styles["default"].mergeButton, true), _defineProperty(_classnames, _styles["default"].disabled, disableMerge), _classnames)),
      onClick: function onClick(e) {
        e.stopPropagation();
        onMergeCall(session.id);
      },
      iconWidth: 260,
      iconX: 120,
      icon: _MergeIntoConferenceIcon["default"],
      showBorder: true,
      disabled: disableMerge || disableLinks,
      dataSign: mergeTitle
    }));
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].webphoneButtons
  }, mergeBtn, holdBtn, /*#__PURE__*/_react["default"].createElement("span", {
    title: rejectTitle,
    "data-sign": "toVoiceMail",
    className: _styles["default"].webphoneButton
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    className: _styles["default"].rejectButton,
    onClick: function onClick(e) {
      e.stopPropagation();
      hangupFunc(session.id, telephonySessionId);
    },
    iconWidth: 260,
    iconX: 120,
    icon: endIcon,
    showBorder: false,
    disabled: disableLinks
  })), answerBtn);
};

WebphoneButtons.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  session: _propTypes["default"].object,
  webphoneReject: _propTypes["default"].func,
  webphoneHangup: _propTypes["default"].func,
  webphoneResume: _propTypes["default"].func,
  webphoneHold: _propTypes["default"].func,
  showMergeCall: _propTypes["default"].bool,
  showHold: _propTypes["default"].bool,
  disableMerge: _propTypes["default"].bool,
  onMergeCall: _propTypes["default"].func,
  webphoneAnswer: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool,
  isOnHold: _propTypes["default"].func.isRequired,
  telephonySessionId: _propTypes["default"].string
};
WebphoneButtons.defaultProps = {
  session: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneHold: undefined,
  showMergeCall: false,
  showHold: true,
  disableMerge: true,
  onMergeCall: function onMergeCall(i) {
    return i;
  },
  webphoneAnswer: function webphoneAnswer(i) {
    return i;
  },
  disableLinks: false,
  telephonySessionId: null
};

var ActiveCallControlButtons = function ActiveCallControlButtons(_ref2) {
  var showRingoutCallControl = _ref2.showRingoutCallControl,
      showSwitchCall = _ref2.showSwitchCall,
      currentLocale = _ref2.currentLocale,
      disableLinks = _ref2.disableLinks,
      telephonySessionId = _ref2.telephonySessionId,
      ringoutHangup = _ref2.ringoutHangup,
      ringoutReject = _ref2.ringoutReject,
      ringoutTransfer = _ref2.ringoutTransfer,
      ringing = _ref2.ringing,
      inbound = _ref2.inbound,
      webphoneSwitchCall = _ref2.webphoneSwitchCall;
  if (!showRingoutCallControl && !showSwitchCall) return null;
  var swithCallButton;

  if (showSwitchCall) {
    var _classnames2;

    swithCallButton = /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('switchCall', currentLocale),
      className: _styles["default"].ringoutButton,
      "data-sign": "switchCall"
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      disabled: disableLinks,
      className: (0, _classnames8["default"])((_classnames2 = {}, _defineProperty(_classnames2, _styles["default"].switchButton, true), _defineProperty(_classnames2, _styles["default"].disabled, disableLinks), _classnames2)),
      onClick: function onClick(e) {
        e.stopPropagation();
        webphoneSwitchCall();
      },
      icon: _Flip["default"],
      showBorder: true
    }));
  }

  if (!showRingoutCallControl) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].ringoutButtons
    }, swithCallButton);
  }

  var endButton;
  var inComingCall = inbound && ringing;

  if (inComingCall) {
    var _classnames3;

    var rejectTitle = _i18n["default"].getString('reject', currentLocale);

    endButton = /*#__PURE__*/_react["default"].createElement("span", {
      title: rejectTitle,
      className: _styles["default"].ringoutButton,
      "data-sign": "hangup"
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      disabled: disableLinks,
      className: (0, _classnames8["default"])((_classnames3 = {}, _defineProperty(_classnames3, _styles["default"].endButton, true), _defineProperty(_classnames3, _styles["default"].disabled, disableLinks), _classnames3)),
      onClick: function onClick(e) {
        e.stopPropagation();
        ringoutReject(telephonySessionId);
      },
      icon: _End["default"],
      showBorder: false
    }));
  } else {
    var _classnames4;

    var hangupTitle = _i18n["default"].getString('hangup', currentLocale);

    endButton = /*#__PURE__*/_react["default"].createElement("span", {
      title: hangupTitle,
      className: _styles["default"].ringoutButton,
      "data-sign": "hangup"
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      disabled: disableLinks,
      className: (0, _classnames8["default"])((_classnames4 = {}, _defineProperty(_classnames4, _styles["default"].endButton, true), _defineProperty(_classnames4, _styles["default"].disabled, disableLinks), _classnames4)),
      onClick: function onClick(e) {
        e.stopPropagation();
        ringoutHangup(telephonySessionId);
      },
      icon: _End["default"],
      showBorder: false
    }));
  }

  var transferBtn;

  if (ringoutTransfer && !inComingCall) {
    var _classnames5;

    var transferTitle = _i18n["default"].getString('transfer', currentLocale);

    transferBtn = /*#__PURE__*/_react["default"].createElement("span", {
      title: transferTitle,
      className: _styles["default"].ringoutButton,
      "data-sign": "transfer"
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      disabled: disableLinks,
      className: (0, _classnames8["default"])((_classnames5 = {}, _defineProperty(_classnames5, _styles["default"].transferButton, true), _defineProperty(_classnames5, _styles["default"].disabled, disableLinks), _classnames5)),
      onClick: function onClick(e) {
        e.stopPropagation();
        ringoutTransfer(telephonySessionId);
      },
      icon: _Transfer["default"]
    }));
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].ringoutButtons
  }, endButton, transferBtn, swithCallButton);
};

ActiveCallControlButtons.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  disableLinks: _propTypes["default"].bool,
  ringoutHangup: _propTypes["default"].func,
  ringoutTransfer: _propTypes["default"].func,
  ringing: _propTypes["default"].bool.isRequired,
  inbound: _propTypes["default"].bool.isRequired,
  telephonySessionId: _propTypes["default"].string.isRequired,
  ringoutReject: _propTypes["default"].func,
  showRingoutCallControl: _propTypes["default"].bool.isRequired,
  showSwitchCall: _propTypes["default"].bool.isRequired,
  webphoneSwitchCall: _propTypes["default"].func
};
ActiveCallControlButtons.defaultProps = {
  disableLinks: false,
  ringoutHangup: undefined,
  ringoutTransfer: undefined,
  ringoutReject: undefined,
  webphoneSwitchCall: undefined
};
/**
 * TODO: Gradually replace <ActiveCallItem/> with this component
 */

var ActiveCallItem = /*#__PURE__*/function (_Component) {
  _inherits(ActiveCallItem, _Component);

  var _super = _createSuper(ActiveCallItem);

  function ActiveCallItem(props) {
    var _this;

    _classCallCheck(this, ActiveCallItem);

    _this = _super.call(this, props);

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

      return contactMatches && contactMatches[selected] || null;
    };

    _this.webphoneSwitchCall = function () {
      return _this.props.webphoneSwitchCall(_this.props.call);
    };

    _this.state = {
      selected: 0,
      isLogging: false,
      avatarUrl: null,
      extraNum: 0
    };
    _this._userSelection = false;
    _this.contactDisplay = null;

    _this.webphoneToVoicemail = function (sessionId, telephonySessionId) {
      if (typeof _this.props.webphoneToVoicemail !== 'function') {
        return;
      }

      _this.props.webphoneToVoicemail(sessionId, telephonySessionId);

      _this.toVoicemailTimeout = setTimeout(function () {
        _this.props.webphoneReject(sessionId, telephonySessionId);
      }, 3000);
    };

    return _this;
  }

  _createClass(ActiveCallItem, [{
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
      this.onSelectContact(this.getSelectedContact(selected, nextProps), selected);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
      this.setContact();
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.getContactMatches(nextProps) !== this.getContactMatches()) {
        this.setContact(nextProps);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;

      if (this.toVoicemailTimeout) {
        clearTimeout(this.toVoicemailTimeout);
        this.toVoicemailTimeout = null;
      }
    }
  }, {
    key: "getCallInfo",
    value: function getCallInfo() {
      var _this$props = this.props,
          _this$props$call = _this$props.call,
          telephonyStatus = _this$props$call.telephonyStatus,
          startTime = _this$props$call.startTime,
          offset = _this$props$call.offset,
          disableLinks = _this$props.disableLinks,
          currentLocale = _this$props.currentLocale,
          showCallDetail = _this$props.showCallDetail;

      if (!showCallDetail) {
        return null;
      }

      var telephonyStatusInfo = _i18n["default"].getString(telephonyStatus, currentLocale);

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callDetail
      }, disableLinks ? _i18n["default"].getString('unavailable', currentLocale) : /*#__PURE__*/_react["default"].createElement(_DurationCounter["default"], {
        startTime: startTime,
        offset: offset
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].split
      }, "|"), /*#__PURE__*/_react["default"].createElement("span", {
        title: telephonyStatusInfo
      }, telephonyStatusInfo));
    }
  }, {
    key: "getFallbackContactName",
    value: function getFallbackContactName() {
      return (0, _callLogHelpers.isInbound)(this.props.call) ? this.props.call.from.name : this.props.call.to.name;
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
      return (0, _callLogHelpers.isInbound)(this.props.call) ? this.props.call.from.phoneNumber || this.props.call.from.extensionNumber : this.props.call.to.phoneNumber || this.props.call.to.extensionNumber;
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames6, _classnames7;

      var _this$props2 = this.props,
          _this$props2$call = _this$props2.call,
          direction = _this$props2$call.direction,
          webphoneSession = _this$props2$call.webphoneSession,
          telephonySessionId = _this$props2$call.telephonySessionId,
          disableLinks = _this$props2.disableLinks,
          currentLocale = _this$props2.currentLocale,
          areaCode = _this$props2.areaCode,
          countryCode = _this$props2.countryCode,
          enableContactFallback = _this$props2.enableContactFallback,
          isLogging = _this$props2.isLogging,
          brand = _this$props2.brand,
          showContactDisplayPlaceholder = _this$props2.showContactDisplayPlaceholder,
          webphoneHangup = _this$props2.webphoneHangup,
          webphoneResume = _this$props2.webphoneResume,
          sourceIcons = _this$props2.sourceIcons,
          phoneTypeRenderer = _this$props2.phoneTypeRenderer,
          phoneSourceNameRenderer = _this$props2.phoneSourceNameRenderer,
          renderContactName = _this$props2.renderContactName,
          renderExtraButton = _this$props2.renderExtraButton,
          contactDisplayStyle = _this$props2.contactDisplayStyle,
          isOnConferenceCall = _this$props2.isOnConferenceCall,
          webphoneHold = _this$props2.webphoneHold,
          onClick = _this$props2.onClick,
          showMergeCall = _this$props2.showMergeCall,
          showHold = _this$props2.showHold,
          showAvatar = _this$props2.showAvatar,
          disableMerge = _this$props2.disableMerge,
          onMergeCall = _this$props2.onMergeCall,
          showCallDetail = _this$props2.showCallDetail,
          webphoneAnswer = _this$props2.webphoneAnswer,
          ringoutHangup = _this$props2.ringoutHangup,
          ringoutTransfer = _this$props2.ringoutTransfer,
          ringoutReject = _this$props2.ringoutReject,
          showRingoutCallControl = _this$props2.showRingoutCallControl,
          showSwitchCall = _this$props2.showSwitchCall,
          showMultipleMatch = _this$props2.showMultipleMatch,
          isOnHold = _this$props2.isOnHold;
      var _this$state = this.state,
          avatarUrl = _this$state.avatarUrl,
          extraNum = _this$state.extraNum;
      var phoneNumber = this.getPhoneNumber();
      var contactMatches = this.getContactMatches();
      var fallbackContactName = this.getFallbackContactName();
      var ringing = (0, _callLogHelpers.isRinging)(this.props.call);
      var inbound = (0, _callLogHelpers.isInbound)(this.props.call);
      var contactName = typeof renderContactName === 'function' ? renderContactName(this.props.call) : undefined;
      var extraButton = typeof renderExtraButton === 'function' ? /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].extraButton
      }, renderExtraButton(this.props.call)) : undefined;
      var hasCallControl = !!(webphoneSession || showRingoutCallControl || showSwitchCall);
      var cursorPointer = hasCallControl && !!onClick;
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "callItem",
        className: _styles["default"].callItemContainer
      }, /*#__PURE__*/_react["default"].createElement(_MediaObject["default"], {
        containerCls: _styles["default"].wrapper,
        bodyCls: (0, _classnames8["default"])((_classnames6 = {}, _defineProperty(_classnames6, _styles["default"].content, true), _defineProperty(_classnames6, _styles["default"].cursorPointer, cursorPointer), _defineProperty(_classnames6, _styles["default"].cursorUnset, !cursorPointer), _defineProperty(_classnames6, _styles["default"].disabled, hasCallControl && disableLinks), _classnames6)),
        leftCls: (0, _classnames8["default"])((_classnames7 = {}, _defineProperty(_classnames7, _styles["default"].cursorPointer, cursorPointer), _defineProperty(_classnames7, _styles["default"].cursorUnset, !cursorPointer), _defineProperty(_classnames7, _styles["default"].disabled, hasCallControl && disableLinks), _classnames7)),
        mediaLeft: /*#__PURE__*/_react["default"].createElement("div", {
          onClick: hasCallControl && onClick ? onClick : null
        }, /*#__PURE__*/_react["default"].createElement(_CallIcon["default"], {
          direction: direction,
          ringing: ringing,
          active: true,
          missed: false,
          inboundTitle: _i18n["default"].getString('inboundCall', currentLocale),
          outboundTitle: _i18n["default"].getString('outboundCall', currentLocale),
          missedTitle: _i18n["default"].getString('missedCall', currentLocale),
          isOnConferenceCall: isOnConferenceCall,
          showAvatar: showAvatar,
          avatarUrl: avatarUrl,
          extraNum: extraNum
        })),
        mediaBody: /*#__PURE__*/_react["default"].createElement("div", {
          onClick: hasCallControl && onClick ? onClick : null,
          className: _styles["default"].strechVertical
        }, /*#__PURE__*/_react["default"].createElement(_ContactDisplay["default"], {
          isOnConferenceCall: isOnConferenceCall,
          contactName: showMultipleMatch ? undefined : contactName,
          className: (0, _classnames8["default"])(_styles["default"].contactDisplay, contactDisplayStyle),
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
          showType: false,
          sourceIcons: sourceIcons,
          phoneTypeRenderer: phoneTypeRenderer,
          phoneSourceNameRenderer: phoneSourceNameRenderer
        }), showCallDetail ? this.getCallInfo() : null),
        mediaRight: /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].actionIconsBox
        }, webphoneSession ? /*#__PURE__*/_react["default"].createElement(WebphoneButtons, {
          session: webphoneSession,
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
          webphoneAnswer: webphoneAnswer,
          isOnHold: isOnHold
        }) : /*#__PURE__*/_react["default"].createElement(ActiveCallControlButtons, {
          showSwitchCall: !webphoneSession && showSwitchCall,
          webphoneSwitchCall: this.webphoneSwitchCall,
          showRingoutCallControl: showRingoutCallControl,
          telephonySessionId: telephonySessionId,
          disableLinks: disableLinks,
          currentLocale: currentLocale,
          ringing: ringing,
          inbound: inbound,
          ringoutReject: ringoutReject,
          ringoutHangup: ringoutHangup,
          ringoutTransfer: ringoutTransfer
        }), extraButton)
      }));
    }
  }]);

  return ActiveCallItem;
}(_react.Component);

exports["default"] = ActiveCallItem;
ActiveCallItem.propTypes = {
  call: _propTypes["default"].shape({
    direction: _propTypes["default"].string.isRequired,
    telephonyStatus: _propTypes["default"].string,
    startTime: _propTypes["default"].number.isRequired,
    offset: _propTypes["default"].number,
    activityMatches: _propTypes["default"].array.isRequired,
    fromMatches: _propTypes["default"].array.isRequired,
    toMatches: _propTypes["default"].array.isRequired,
    from: _propTypes["default"].shape({
      phoneNumber: _propTypes["default"].string,
      extensionNumber: _propTypes["default"].string,
      name: _propTypes["default"].string
    }).isRequired,
    to: _propTypes["default"].shape({
      phoneNumber: _propTypes["default"].string,
      extensionNumber: _propTypes["default"].string,
      name: _propTypes["default"].string
    }),
    webphoneSession: _propTypes["default"].object,
    telephonySessionId: _propTypes["default"].string
  }).isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  disableLinks: _propTypes["default"].bool,
  isLogging: _propTypes["default"].bool,
  webphoneReject: _propTypes["default"].func,
  webphoneHangup: _propTypes["default"].func,
  webphoneResume: _propTypes["default"].func,
  webphoneToVoicemail: _propTypes["default"].func,
  webphoneSwitchCall: _propTypes["default"].func,
  webphoneHold: _propTypes["default"].func,
  enableContactFallback: _propTypes["default"].bool,
  brand: _propTypes["default"].string,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  renderContactName: _propTypes["default"].func,
  renderExtraButton: _propTypes["default"].func,
  contactDisplayStyle: _propTypes["default"].string,
  isOnConferenceCall: _propTypes["default"].bool,
  onClick: _propTypes["default"].func,
  showAvatar: _propTypes["default"].bool,
  getAvatarUrl: _propTypes["default"].func,
  showMergeCall: _propTypes["default"].bool,
  showHold: _propTypes["default"].bool,
  disableMerge: _propTypes["default"].bool,
  onMergeCall: _propTypes["default"].func,
  showCallDetail: _propTypes["default"].bool,
  updateSessionMatchedContact: _propTypes["default"].func,
  webphoneAnswer: _propTypes["default"].func,
  ringoutHangup: _propTypes["default"].func,
  ringoutTransfer: _propTypes["default"].func,
  showRingoutCallControl: _propTypes["default"].bool,
  ringoutReject: _propTypes["default"].func,
  showMultipleMatch: _propTypes["default"].bool,
  showSwitchCall: _propTypes["default"].bool,
  isOnHold: _propTypes["default"].func
};
ActiveCallItem.defaultProps = {
  isLogging: false,
  disableLinks: false,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneToVoicemail: undefined,
  webphoneHold: undefined,
  webphoneSwitchCall: undefined,
  enableContactFallback: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
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
  webphoneAnswer: function webphoneAnswer(i) {
    return i;
  },
  ringoutHangup: undefined,
  ringoutTransfer: undefined,
  ringoutReject: undefined,
  showRingoutCallControl: false,
  showMultipleMatch: false,
  showSwitchCall: false,
  isOnHold: _webphoneHelper.isOnHold
};
//# sourceMappingURL=index.js.map
