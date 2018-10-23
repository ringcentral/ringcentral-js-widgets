'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames7 = require('classnames');

var _classnames8 = _interopRequireDefault(_classnames7);

var _sessionStatus = require('ringcentral-integration/modules/Webphone/sessionStatus');

var _sessionStatus2 = _interopRequireDefault(_sessionStatus);

var _callLogHelpers = require('ringcentral-integration/lib/callLogHelpers');

var _webphoneHelper = require('ringcentral-integration/modules/Webphone/webphoneHelper');

var _CallIcon = require('../CallIcon');

var _CallIcon2 = _interopRequireDefault(_CallIcon);

var _ContactDisplay = require('../ContactDisplay');

var _ContactDisplay2 = _interopRequireDefault(_ContactDisplay);

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _End = require('../../assets/images/End.svg');

var _End2 = _interopRequireDefault(_End);

var _Hold = require('../../assets/images/Hold.svg');

var _Hold2 = _interopRequireDefault(_Hold);

var _Voicemail = require('../../assets/images/Voicemail.svg');

var _Voicemail2 = _interopRequireDefault(_Voicemail);

var _Answer = require('../../assets/images/Answer.svg');

var _Answer2 = _interopRequireDefault(_Answer);

var _MergeIntoConferenceIcon = require('../../assets/images/MergeIntoConferenceIcon.svg');

var _MergeIntoConferenceIcon2 = _interopRequireDefault(_MergeIntoConferenceIcon);

var _Transfer = require('../../assets/images/Transfer.svg');

var _Transfer2 = _interopRequireDefault(_Transfer);

var _MediaObject = require('../MediaObject');

var _MediaObject2 = _interopRequireDefault(_MediaObject);

var _DurationCounter = require('../DurationCounter');

var _DurationCounter2 = _interopRequireDefault(_DurationCounter);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('../ActiveCallItem/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Reuse the exsisting translations

function WebphoneButtons(_ref) {
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
      onMergeCall = _ref.onMergeCall;

  if (!session) {
    return null;
  }
  var hangupFunc = webphoneHangup;
  var endIcon = _End2.default;
  var answerBtn = null;

  var rejectTitle = _i18n2.default.getString('hangup', currentLocale);
  var holdTitle = _i18n2.default.getString('hold', currentLocale);
  var unholdTitle = _i18n2.default.getString('unhold', currentLocale);

  if ((0, _callLogHelpers.isInbound)(session) && session.callStatus === _sessionStatus2.default.connecting) {
    hangupFunc = webphoneReject;
    endIcon = _Voicemail2.default;
    rejectTitle = _i18n2.default.getString('toVoicemail', currentLocale);
    showHold = false;
    answerBtn = _react2.default.createElement(
      'span',
      { title: _i18n2.default.getString('accept', currentLocale), className: _styles2.default.webphoneButton },
      _react2.default.createElement(_CircleButton2.default, {
        className: _styles2.default.answerButton,
        onClick: function onClick(e) {
          e.stopPropagation();
          webphoneAnswer(session.id);
        },
        icon: _Answer2.default,
        showBorder: false
      })
    );
  }

  var holdBtn = void 0;
  var mergeBtn = void 0;

  if (showHold) {
    if ((0, _webphoneHelper.isOnHold)(session)) {
      holdBtn = _react2.default.createElement(
        'span',
        { title: unholdTitle, className: _styles2.default.webphoneButton },
        _react2.default.createElement(_CircleButton2.default, {
          className: (0, _classnames8.default)(_styles2.default.holdButton, _styles2.default.active),
          onClick: function onClick(e) {
            e.stopPropagation();
            webphoneResume(session.id);
          },
          iconWidth: 260,
          iconX: 120,
          icon: _Hold2.default,
          showBorder: true
        })
      );
    } else {
      holdBtn = _react2.default.createElement(
        'span',
        { title: holdTitle, className: _styles2.default.webphoneButton },
        _react2.default.createElement(_CircleButton2.default, {
          className: _styles2.default.holdButton,
          onClick: function onClick(e) {
            e.stopPropagation();
            webphoneHold(session.id);
          },
          iconWidth: 260,
          iconX: 120,
          icon: _Hold2.default,
          showBorder: true
        })
      );
    }
  }

  if (showMergeCall) {
    var _classnames;

    var mergeTitle = _i18n2.default.getString('mergeToConference', currentLocale);

    mergeBtn = _react2.default.createElement(
      'span',
      { title: mergeTitle, className: _styles2.default.webphoneButton },
      _react2.default.createElement(_CircleButton2.default, {
        className: (0, _classnames8.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, _styles2.default.mergeButton, true), (0, _defineProperty3.default)(_classnames, _styles2.default.disabled, disableMerge), _classnames)),
        onClick: function onClick(e) {
          e.stopPropagation();
          onMergeCall(session.id);
        },
        iconWidth: 260,
        iconX: 120,
        icon: _MergeIntoConferenceIcon2.default,
        showBorder: true,
        disabled: disableMerge
      })
    );
  }

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.webphoneButtons },
    mergeBtn,
    holdBtn,
    _react2.default.createElement(
      'span',
      { title: rejectTitle, className: _styles2.default.webphoneButton },
      _react2.default.createElement(_CircleButton2.default, {
        className: _styles2.default.rejectButton,
        onClick: function onClick(e) {
          e.stopPropagation();
          hangupFunc(session.id);
        },
        iconWidth: 260,
        iconX: 120,
        icon: endIcon,
        showBorder: false
      })
    ),
    answerBtn
  );
}

WebphoneButtons.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  session: _propTypes2.default.object,
  webphoneReject: _propTypes2.default.func,
  webphoneHangup: _propTypes2.default.func,
  webphoneResume: _propTypes2.default.func,
  webphoneHold: _propTypes2.default.func,
  showMergeCall: _propTypes2.default.bool,
  showHold: _propTypes2.default.bool,
  disableMerge: _propTypes2.default.bool,
  onMergeCall: _propTypes2.default.func,
  webphoneAnswer: _propTypes2.default.func
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
  }
};

function RingoutButtons(_ref2) {
  var showRingoutCallControl = _ref2.showRingoutCallControl,
      currentLocale = _ref2.currentLocale,
      disableLinks = _ref2.disableLinks,
      sessionId = _ref2.sessionId,
      ringoutHangup = _ref2.ringoutHangup,
      ringoutReject = _ref2.ringoutReject,
      ringoutTransfer = _ref2.ringoutTransfer,
      ringing = _ref2.ringing,
      inbound = _ref2.inbound;

  if (!showRingoutCallControl) return null;

  var endButton = void 0;
  var inComingCall = inbound && ringing;
  if (inComingCall) {
    var _classnames2;

    var rejectTitle = _i18n2.default.getString('reject', currentLocale);
    endButton = _react2.default.createElement(
      'span',
      { title: rejectTitle, className: _styles2.default.ringoutButton },
      _react2.default.createElement(_CircleButton2.default, {
        disabled: disableLinks,
        className: (0, _classnames8.default)((_classnames2 = {}, (0, _defineProperty3.default)(_classnames2, _styles2.default.endButton, true), (0, _defineProperty3.default)(_classnames2, _styles2.default.disabled, disableLinks), _classnames2)),
        onClick: function onClick(e) {
          e.stopPropagation();
          ringoutReject(sessionId);
        },
        icon: _End2.default,
        showBorder: false
      })
    );
  } else {
    var _classnames3;

    var hangupTitle = _i18n2.default.getString('hangup', currentLocale);
    endButton = _react2.default.createElement(
      'span',
      { title: hangupTitle, className: _styles2.default.ringoutButton },
      _react2.default.createElement(_CircleButton2.default, {
        disabled: disableLinks,
        className: (0, _classnames8.default)((_classnames3 = {}, (0, _defineProperty3.default)(_classnames3, _styles2.default.endButton, true), (0, _defineProperty3.default)(_classnames3, _styles2.default.disabled, disableLinks), _classnames3)),
        onClick: function onClick(e) {
          e.stopPropagation();
          ringoutHangup(sessionId);
        },
        icon: _End2.default,
        showBorder: false
      })
    );
  }

  var transferBtn = void 0;
  if (ringoutTransfer && !inComingCall) {
    var _classnames4;

    var transferTitle = _i18n2.default.getString('transfer', currentLocale);

    transferBtn = _react2.default.createElement(
      'span',
      { title: transferTitle, className: _styles2.default.ringoutButton },
      _react2.default.createElement(_CircleButton2.default, {
        disabled: disableLinks,
        className: (0, _classnames8.default)((_classnames4 = {}, (0, _defineProperty3.default)(_classnames4, _styles2.default.transferButton, true), (0, _defineProperty3.default)(_classnames4, _styles2.default.disabled, disableLinks), _classnames4)),
        onClick: function onClick(e) {
          e.stopPropagation();
          ringoutTransfer(sessionId);
        },
        icon: _Transfer2.default
      })
    );
  }

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.ringoutButtons },
    endButton,
    transferBtn
  );
}

RingoutButtons.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  disableLinks: _propTypes2.default.bool,
  ringoutHangup: _propTypes2.default.func,
  ringoutTransfer: _propTypes2.default.func,
  ringing: _propTypes2.default.bool.isRequired,
  inbound: _propTypes2.default.bool.isRequired,
  sessionId: _propTypes2.default.string.isRequired,
  ringoutReject: _propTypes2.default.func,
  showRingoutCallControl: _propTypes2.default.bool.isRequired
};

RingoutButtons.defaultProps = {
  disableLinks: false,
  ringoutHangup: undefined,
  ringoutTransfer: undefined,
  ringoutReject: undefined
};

/**
 * TODO: Gradually replace <ActiveCallItem/> with this component
 */

var ActiveCallItem = function (_Component) {
  (0, _inherits3.default)(ActiveCallItem, _Component);

  function ActiveCallItem(props) {
    (0, _classCallCheck3.default)(this, ActiveCallItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveCallItem.__proto__ || (0, _getPrototypeOf2.default)(ActiveCallItem)).call(this, props));

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
            _this.setState({ avatarUrl: avatarUrl });
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

    _this.state = {
      selected: 0,
      isLogging: false,
      avatarUrl: null,
      extraNum: 0
    };
    _this._userSelection = false;
    _this.contactDisplay = null;

    _this.webphoneToVoicemail = function (sessionId) {
      if (typeof _this.props.webphoneToVoicemail !== 'function') {
        return;
      }
      _this.props.webphoneToVoicemail(sessionId);
      _this.toVoicemailTimeout = setTimeout(function () {
        _this.props.webphoneReject(sessionId);
      }, 3000);
    };
    return _this;
  }

  (0, _createClass3.default)(ActiveCallItem, [{
    key: 'setContact',
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
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
      this.setContact();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.getContactMatches(nextProps) !== this.getContactMatches()) {
        this.setContact(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
      if (this.toVoicemailTimeout) {
        clearTimeout(this.toVoicemailTimeout);
        this.toVoicemailTimeout = null;
      }
    }
  }, {
    key: 'getCallInfo',
    value: function getCallInfo() {
      var _props = this.props,
          _props$call = _props.call,
          telephonyStatus = _props$call.telephonyStatus,
          startTime = _props$call.startTime,
          offset = _props$call.offset,
          disableLinks = _props.disableLinks,
          currentLocale = _props.currentLocale,
          showCallDetail = _props.showCallDetail;


      if (!showCallDetail) {
        return null;
      }

      var telephonyStatusInfo = _i18n2.default.getString(telephonyStatus, currentLocale);
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.callDetail },
        disableLinks ? _i18n2.default.getString('unavailable', currentLocale) : _react2.default.createElement(_DurationCounter2.default, { startTime: startTime, offset: offset }),
        _react2.default.createElement(
          'span',
          { className: _styles2.default.split },
          '|'
        ),
        _react2.default.createElement(
          'span',
          { title: telephonyStatusInfo },
          telephonyStatusInfo
        )
      );
    }
  }, {
    key: 'getFallbackContactName',
    value: function getFallbackContactName() {
      return (0, _callLogHelpers.isInbound)(this.props.call) ? this.props.call.from.name : this.props.call.to.name;
    }
  }, {
    key: 'getContactMatches',
    value: function getContactMatches() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      return (0, _callLogHelpers.isInbound)(nextProps.call) ? nextProps.call.fromMatches : nextProps.call.toMatches;
    }
  }, {
    key: 'getPhoneNumber',
    value: function getPhoneNumber() {
      return (0, _callLogHelpers.isInbound)(this.props.call) ? this.props.call.from.phoneNumber || this.props.call.from.extensionNumber : this.props.call.to.phoneNumber || this.props.call.to.extensionNumber;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames5, _classnames6;

      var _props2 = this.props,
          _props2$call = _props2.call,
          direction = _props2$call.direction,
          webphoneSession = _props2$call.webphoneSession,
          sessionId = _props2$call.sessionId,
          disableLinks = _props2.disableLinks,
          currentLocale = _props2.currentLocale,
          areaCode = _props2.areaCode,
          countryCode = _props2.countryCode,
          enableContactFallback = _props2.enableContactFallback,
          isLogging = _props2.isLogging,
          brand = _props2.brand,
          showContactDisplayPlaceholder = _props2.showContactDisplayPlaceholder,
          webphoneHangup = _props2.webphoneHangup,
          webphoneResume = _props2.webphoneResume,
          sourceIcons = _props2.sourceIcons,
          phoneTypeRenderer = _props2.phoneTypeRenderer,
          phoneSourceNameRenderer = _props2.phoneSourceNameRenderer,
          renderContactName = _props2.renderContactName,
          renderExtraButton = _props2.renderExtraButton,
          contactDisplayStyle = _props2.contactDisplayStyle,
          isOnConferenceCall = _props2.isOnConferenceCall,
          webphoneHold = _props2.webphoneHold,
          _onClick = _props2.onClick,
          showMergeCall = _props2.showMergeCall,
          showHold = _props2.showHold,
          showAvatar = _props2.showAvatar,
          disableMerge = _props2.disableMerge,
          onMergeCall = _props2.onMergeCall,
          showCallDetail = _props2.showCallDetail,
          webphoneAnswer = _props2.webphoneAnswer,
          ringoutHangup = _props2.ringoutHangup,
          ringoutTransfer = _props2.ringoutTransfer,
          ringoutReject = _props2.ringoutReject,
          showRingoutCallControl = _props2.showRingoutCallControl;
      var _state = this.state,
          avatarUrl = _state.avatarUrl,
          extraNum = _state.extraNum;

      var phoneNumber = this.getPhoneNumber();
      var contactMatches = this.getContactMatches();
      var fallbackContactName = this.getFallbackContactName();
      var ringing = (0, _callLogHelpers.isRinging)(this.props.call);
      var inbound = (0, _callLogHelpers.isInbound)(this.props.call);
      var contactName = typeof renderContactName === 'function' ? renderContactName(this.props.call) : undefined;
      var extraButton = typeof renderExtraButton === 'function' ? _react2.default.createElement(
        'div',
        { className: _styles2.default.extraButton },
        renderExtraButton(this.props.call)
      ) : undefined;
      var hasCallControl = !!(webphoneSession || showRingoutCallControl);
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.callItemContainer },
        _react2.default.createElement(_MediaObject2.default, {
          containerCls: _styles2.default.wrapper,
          bodyCls: (0, _classnames8.default)((_classnames5 = {}, (0, _defineProperty3.default)(_classnames5, _styles2.default.content, true), (0, _defineProperty3.default)(_classnames5, _styles2.default.pointer, hasCallControl), (0, _defineProperty3.default)(_classnames5, _styles2.default.disabled, hasCallControl && disableLinks), _classnames5)),
          leftCls: (0, _classnames8.default)((_classnames6 = {}, (0, _defineProperty3.default)(_classnames6, _styles2.default.pointer, hasCallControl), (0, _defineProperty3.default)(_classnames6, _styles2.default.disabled, hasCallControl && disableLinks), _classnames6)),
          mediaLeft: _react2.default.createElement(
            'div',
            { onClick: function onClick() {
                return hasCallControl && _onClick();
              } },
            _react2.default.createElement(_CallIcon2.default, {
              direction: direction,
              ringing: ringing,
              active: true,
              missed: false,
              inboundTitle: _i18n2.default.getString('inboundCall', currentLocale),
              outboundTitle: _i18n2.default.getString('outboundCall', currentLocale),
              missedTitle: _i18n2.default.getString('missedCall', currentLocale),
              isOnConferenceCall: isOnConferenceCall,
              showAvatar: showAvatar,
              avatarUrl: avatarUrl,
              extraNum: extraNum
            })
          ),
          mediaBody: _react2.default.createElement(
            'div',
            { onClick: function onClick() {
                return hasCallControl && _onClick();
              }, className: _styles2.default.strechVertical },
            _react2.default.createElement(_ContactDisplay2.default, {
              isOnConferenceCall: isOnConferenceCall,
              contactName: contactName,
              className: (0, _classnames8.default)(_styles2.default.contactDisplay, contactDisplayStyle),
              contactMatches: contactMatches,
              selected: this.state.selected,
              onSelectContact: this.onSelectContact,
              disabled: true,
              iconClassName: _styles2.default.icon,
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
              phoneSourceNameRenderer: phoneSourceNameRenderer,
              stopPropagation: false
            }),
            showCallDetail ? this.getCallInfo() : null
          ),
          mediaRight: _react2.default.createElement(
            'div',
            { className: _styles2.default.actionIconsBox },
            webphoneSession ? _react2.default.createElement(WebphoneButtons, {
              session: webphoneSession,
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
            }) : _react2.default.createElement(RingoutButtons, {
              showRingoutCallControl: showRingoutCallControl,
              sessionId: sessionId,
              disableLinks: disableLinks,
              currentLocale: currentLocale,
              ringing: ringing,
              inbound: inbound,
              ringoutReject: ringoutReject,
              ringoutHangup: ringoutHangup,
              ringoutTransfer: ringoutTransfer
            }),
            extraButton
          )
        })
      );
    }
  }]);
  return ActiveCallItem;
}(_react.Component);

exports.default = ActiveCallItem;


ActiveCallItem.propTypes = {
  call: _propTypes2.default.shape({
    direction: _propTypes2.default.string.isRequired,
    telephonyStatus: _propTypes2.default.string,
    startTime: _propTypes2.default.number.isRequired,
    activityMatches: _propTypes2.default.array.isRequired,
    fromMatches: _propTypes2.default.array.isRequired,
    toMatches: _propTypes2.default.array.isRequired,
    from: _propTypes2.default.shape({
      phoneNumber: _propTypes2.default.string,
      extensionNumber: _propTypes2.default.string,
      name: _propTypes2.default.string
    }).isRequired,
    to: _propTypes2.default.shape({
      phoneNumber: _propTypes2.default.string,
      extensionNumber: _propTypes2.default.string,
      name: _propTypes2.default.string
    }),
    webphoneSession: _propTypes2.default.object,
    sessionId: _propTypes2.default.string
  }).isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  disableLinks: _propTypes2.default.bool,
  isLogging: _propTypes2.default.bool,
  webphoneReject: _propTypes2.default.func,
  webphoneHangup: _propTypes2.default.func,
  webphoneResume: _propTypes2.default.func,
  webphoneToVoicemail: _propTypes2.default.func,
  webphoneHold: _propTypes2.default.func,
  enableContactFallback: _propTypes2.default.bool,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  phoneTypeRenderer: _propTypes2.default.func,
  phoneSourceNameRenderer: _propTypes2.default.func,
  renderContactName: _propTypes2.default.func,
  renderExtraButton: _propTypes2.default.func,
  contactDisplayStyle: _propTypes2.default.string,
  isOnConferenceCall: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  showAvatar: _propTypes2.default.bool,
  getAvatarUrl: _propTypes2.default.func,
  showMergeCall: _propTypes2.default.bool,
  showHold: _propTypes2.default.bool,
  disableMerge: _propTypes2.default.bool,
  onMergeCall: _propTypes2.default.func,
  showCallDetail: _propTypes2.default.bool,
  updateSessionMatchedContact: _propTypes2.default.func,
  webphoneAnswer: _propTypes2.default.func,
  ringoutHangup: _propTypes2.default.func,
  ringoutTransfer: _propTypes2.default.func,
  showRingoutCallControl: _propTypes2.default.bool,
  ringoutReject: _propTypes2.default.func
};

ActiveCallItem.defaultProps = {
  isLogging: false,
  disableLinks: false,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneToVoicemail: undefined,
  webphoneHold: undefined,
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
  showRingoutCallControl: false
};
//# sourceMappingURL=index.js.map
