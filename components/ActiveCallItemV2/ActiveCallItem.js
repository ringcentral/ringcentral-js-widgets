"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallItem = exports.ModalContent = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find-index");

var _react = _interopRequireWildcard(require("react"));

var _classnames9 = _interopRequireDefault(require("classnames"));

var _sessionStatus = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/sessionStatus"));

var _callLogHelpers = require("ringcentral-integration/lib/callLogHelpers");

var _webphoneHelper = require("ringcentral-integration/modules/Webphone/webphoneHelper");

var _helpers = require("ringcentral-integration/modules/ActiveCallControlV2/helpers");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _CallIcon = _interopRequireDefault(require("../CallIcon"));

var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _Hold = _interopRequireDefault(require("../../assets/images/Hold.svg"));

var _Switch = _interopRequireDefault(require("../../assets/images/Switch.svg"));

var _Voicemail = _interopRequireDefault(require("../../assets/images/Voicemail.svg"));

var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));

var _MergeIntoConferenceIcon = _interopRequireDefault(require("../../assets/images/MergeIntoConferenceIcon.svg"));

var _Transfer = _interopRequireDefault(require("../../assets/images/Transfer.svg"));

var _MediaObject = _interopRequireDefault(require("../MediaObject"));

var _DurationCounter = _interopRequireDefault(require("../DurationCounter"));

var _img_call_switch = _interopRequireDefault(require("../../assets/images/img_call_switch.svg"));

var _Ignore = _interopRequireDefault(require("../../assets/images/Ignore.svg"));

var _HoldAnswer = _interopRequireDefault(require("../../assets/images/HoldAnswer.svg"));

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

var ModalContent = function ModalContent(_ref) {
  var currentLocale = _ref.currentLocale,
      contactName = _ref.contactName;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].switchDialogContent
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].switchDialogImage
  }, /*#__PURE__*/_react["default"].createElement(_img_call_switch["default"], {
    width: "116",
    height: "69"
  })), /*#__PURE__*/_react["default"].createElement("div", null, (0, _formatMessage["default"])(_i18n["default"].getString('comfirmContext', currentLocale), {
    // displayName: activeCall.name,
    displayName: contactName
  })));
};

exports.ModalContent = ModalContent;

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
      showIgnoreBtn = _ref2.showIgnoreBtn;

  if (!session) {
    return null;
  }

  var hangupFunc = webphoneHangup;
  var endIcon = _End["default"];
  var answerBtn = null;
  var ignoreBtn;

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
      onClick: function onClick(e) {
        e.stopPropagation();
        webphoneAnswer(session.id, telephonySessionId);
      }
    }, /*#__PURE__*/_react["default"].createElement(_HoldAnswer["default"], {
      className: _styles["default"].answerHoldButton
    })));

    if (showIgnoreBtn) {
      var _classnames;

      var ignoreTitle = _i18n["default"].getString('ignore', currentLocale);

      ignoreBtn = /*#__PURE__*/_react["default"].createElement("span", {
        title: ignoreTitle,
        className: _styles["default"].webphoneButton
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        className: (0, _classnames9["default"])((_classnames = {}, _defineProperty(_classnames, _styles["default"].mergeButton, true), _defineProperty(_classnames, _styles["default"].disabled, disableLinks), _classnames)),
        onClick: function onClick(e) {
          e.stopPropagation();
          webphoneIgnore(telephonySessionId);
        },
        iconWidth: 260,
        iconX: 120,
        icon: _Ignore["default"],
        showBorder: true,
        disabled: disableLinks,
        dataSign: ignoreTitle
      }));
    }
  }

  var holdBtn;
  var mergeBtn;

  if (showHold) {
    if (isOnHold(session)) {
      holdBtn = /*#__PURE__*/_react["default"].createElement("span", {
        title: unholdTitle,
        className: _styles["default"].webphoneButton
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        className: (0, _classnames9["default"])(_styles["default"].holdButton, _styles["default"].active),
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
    var _classnames2;

    var mergeTitle = _i18n["default"].getString('mergeToConference', currentLocale);

    mergeBtn = /*#__PURE__*/_react["default"].createElement("span", {
      title: mergeTitle,
      className: _styles["default"].webphoneButton
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      className: (0, _classnames9["default"])((_classnames2 = {}, _defineProperty(_classnames2, _styles["default"].mergeButton, true), _defineProperty(_classnames2, _styles["default"].disabled, disableMerge), _classnames2)),
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
  }, ignoreBtn, mergeBtn, holdBtn, /*#__PURE__*/_react["default"].createElement("span", {
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
      webphoneHold = _ref3$webphoneHold === void 0 ? undefined : _ref3$webphoneHold;
  if (!showRingoutCallControl && !showSwitchCall) return null;
  var switchCallButton;

  if (showSwitchCall) {
    var _classnames3;

    var disabled = disableLinks || ringing;
    switchCallButton = /*#__PURE__*/_react["default"].createElement("span", {
      title: _i18n["default"].getString('switchCall', currentLocale),
      className: (0, _classnames9["default"])(_styles["default"].ringoutButton, _styles["default"].cursorPointer),
      "data-sign": "switchCall"
    }, /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
      className: (0, _classnames9["default"])((_classnames3 = {}, _defineProperty(_classnames3, _styles["default"].switchButton, true), _defineProperty(_classnames3, _styles["default"].disabled, disabled), _classnames3)),
      onClick: function onClick(e) {
        e.stopPropagation();

        if (!disabled) {
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

  var endButton;
  var holdBtn = null;
  var inComingCall = inbound && ringing;

  if (inComingCall) {
    var _classnames4;

    var rejectTitle = _i18n["default"].getString('reject', currentLocale);

    endButton = /*#__PURE__*/_react["default"].createElement("span", {
      title: rejectTitle,
      className: _styles["default"].ringoutButton,
      "data-sign": "hangup"
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      disabled: disableLinks,
      className: (0, _classnames9["default"])((_classnames4 = {}, _defineProperty(_classnames4, _styles["default"].endButton, true), _defineProperty(_classnames4, _styles["default"].disabled, disableLinks), _classnames4)),
      onClick: function onClick(e) {
        e.stopPropagation();
        ringoutReject(telephonySessionId);
      },
      icon: _End["default"],
      showBorder: false
    }));
  } else {
    var _classnames5;

    var hangupTitle = _i18n["default"].getString('hangup', currentLocale);

    endButton = /*#__PURE__*/_react["default"].createElement("span", {
      title: hangupTitle,
      className: _styles["default"].ringoutButton,
      "data-sign": "hangup"
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      disabled: disableLinks,
      className: (0, _classnames9["default"])((_classnames5 = {}, _defineProperty(_classnames5, _styles["default"].endButton, true), _defineProperty(_classnames5, _styles["default"].disabled, disableLinks), _classnames5)),
      onClick: function onClick(e) {
        e.stopPropagation();
        ringoutHangup(telephonySessionId);
      },
      icon: _End["default"],
      showBorder: false
    }));

    var holdTitle = _i18n["default"].getString('hold', currentLocale);

    var unholdTitle = _i18n["default"].getString('unhold', currentLocale);

    if (session) {
      if ((0, _helpers.isHolding)(session)) {
        holdBtn = /*#__PURE__*/_react["default"].createElement("span", {
          title: unholdTitle,
          className: _styles["default"].webphoneButton
        }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
          className: (0, _classnames9["default"])(_styles["default"].holdButton, _styles["default"].active),
          onClick: function onClick(e) {
            e.stopPropagation();
            webphoneResume('', telephonySessionId);
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
            webphoneHold('', telephonySessionId);
          },
          iconWidth: 260,
          iconX: 120,
          icon: _Hold["default"],
          disabled: disableLinks,
          showBorder: true
        }));
      }
    }
  }

  var transferBtn;

  if (ringoutTransfer && !inComingCall) {
    var _classnames6;

    var transferTitle = _i18n["default"].getString('transfer', currentLocale);

    transferBtn = /*#__PURE__*/_react["default"].createElement("span", {
      title: transferTitle,
      className: _styles["default"].ringoutButton,
      "data-sign": "transfer"
    }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
      disabled: disableLinks,
      className: (0, _classnames9["default"])((_classnames6 = {}, _defineProperty(_classnames6, _styles["default"].transferButton, true), _defineProperty(_classnames6, _styles["default"].disabled, disableLinks), _classnames6)),
      onClick: function onClick(e) {
        e.stopPropagation();
        ringoutTransfer(telephonySessionId);
      },
      icon: _Transfer["default"]
    }));
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].ringoutButtons
  }, showHoldOnOtherDevice && holdBtn, showTransferCall && transferBtn, switchCallButton, endButton);
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
    _this._userSelection = void 0;
    _this.toVoicemailTimeout = void 0;
    _this._mounted = void 0;
    _this.webphoneToVoicemail = void 0;
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

    _this.onClickSwitchBtn = function () {
      var contactName = typeof _this.props.renderContactName === 'function' ? _this.props.renderContactName(_this.props.call) : undefined;
      _this.modalId = _this.props.modalConfirm({
        size: 'small',
        title: _i18n["default"].getString('callSwitch', _this.props.currentLocale),
        dialogProps: {
          className: _styles["default"].switchDialog
        },
        content: /*#__PURE__*/_react["default"].createElement(ModalContent, {
          currentLocale: _this.props.currentLocale,
          contactName: contactName
        }),
        okText: _i18n["default"].getString('comfirmOKButton', _this.props.currentLocale),
        cancelText: _i18n["default"].getString('comfirmCancelButton', _this.props.currentLocale),
        onOK: function onOK() {
          return _this.props.webphoneSwitchCall(_this.props.call);
        }
      });
    };

    _this.state = {
      selected: 0,
      isLogging: false,
      avatarUrl: null,
      extraNum: 0
    };
    _this._userSelection = false; // this.contactDisplay = null;

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
        window.clearTimeout(this.toVoicemailTimeout);
        this.toVoicemailTimeout = null;
      }

      if (this.modalId) {
        this.props.modalClose(this.modalId);
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
          showCallDetail = _this$props.showCallDetail,
          useCallDetailV2 = _this$props.useCallDetailV2;

      if (!showCallDetail) {
        return null;
      }

      var telephonyStatusInfo = _i18n["default"].getString(telephonyStatus, currentLocale);

      var callStatusComp = /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].split
      }, "|"), /*#__PURE__*/_react["default"].createElement("span", {
        title: telephonyStatusInfo
      }, telephonyStatusInfo));

      if (useCallDetailV2) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].callDetail
        }, /*#__PURE__*/_react["default"].createElement(_DurationCounter["default"], {
          startTime: startTime,
          offset: offset
        }));
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callDetail
      }, disableLinks ? _i18n["default"].getString('unavailable', currentLocale) : /*#__PURE__*/_react["default"].createElement(_DurationCounter["default"], {
        startTime: startTime,
        offset: offset
      }), callStatusComp);
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
      var _classnames7, _classnames8;

      var _this$props2 = this.props,
          _this$props2$call = _this$props2.call,
          direction = _this$props2$call.direction,
          webphoneSession = _this$props2$call.webphoneSession,
          telephonySessionId = _this$props2$call.telephonySessionId,
          telephonySession = _this$props2$call.telephonySession,
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
          showTransferCall = _this$props2.showTransferCall,
          showHoldOnOtherDevice = _this$props2.showHoldOnOtherDevice,
          showMultipleMatch = _this$props2.showMultipleMatch,
          isOnHold = _this$props2.isOnHold,
          newCallIcon = _this$props2.newCallIcon,
          webphoneIgnore = _this$props2.webphoneIgnore,
          showHoldAnswerBtn = _this$props2.showHoldAnswerBtn,
          showIgnoreBtn = _this$props2.showIgnoreBtn;
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
        bodyCls: (0, _classnames9["default"])((_classnames7 = {}, _defineProperty(_classnames7, _styles["default"].content, true), _defineProperty(_classnames7, _styles["default"].cursorPointer, cursorPointer), _defineProperty(_classnames7, _styles["default"].cursorUnset, !cursorPointer), _defineProperty(_classnames7, _styles["default"].disabled, hasCallControl && disableLinks), _classnames7)),
        leftCls: (0, _classnames9["default"])((_classnames8 = {}, _defineProperty(_classnames8, _styles["default"].cursorPointer, cursorPointer), _defineProperty(_classnames8, _styles["default"].cursorUnset, !cursorPointer), _defineProperty(_classnames8, _styles["default"].disabled, hasCallControl && disableLinks), _classnames8)),
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
          extraNum: extraNum,
          newCallIcon: newCallIcon
        })),
        mediaBody: /*#__PURE__*/_react["default"].createElement("div", {
          onClick: hasCallControl && onClick ? onClick : null,
          className: _styles["default"].strechVertical
        }, /*#__PURE__*/_react["default"].createElement(_ContactDisplay["default"], {
          isOnConferenceCall: isOnConferenceCall,
          contactName: showMultipleMatch ? undefined : contactName,
          className: (0, _classnames9["default"])(_styles["default"].contactDisplay, contactDisplayStyle),
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
          isOnHold: isOnHold,
          webphoneIgnore: webphoneIgnore,
          showIgnoreBtn: showIgnoreBtn,
          showHoldAnswerBtn: showHoldAnswerBtn
        }) : /*#__PURE__*/_react["default"].createElement(ActiveCallControlButtons, {
          session: telephonySession,
          showSwitchCall: !webphoneSession && showSwitchCall,
          onClickSwitchBtn: this.onClickSwitchBtn,
          showRingoutCallControl: showRingoutCallControl,
          telephonySessionId: telephonySessionId,
          disableLinks: disableLinks,
          currentLocale: currentLocale,
          ringing: ringing,
          inbound: inbound,
          ringoutReject: ringoutReject,
          ringoutHangup: ringoutHangup,
          ringoutTransfer: ringoutTransfer,
          showTransferCall: showTransferCall,
          showHoldOnOtherDevice: showHoldOnOtherDevice,
          webphoneResume: webphoneResume,
          webphoneHold: webphoneHold
        }), extraButton)
      }));
    }
  }]);

  return ActiveCallItem;
}(_react.Component);

exports.ActiveCallItem = ActiveCallItem;
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
