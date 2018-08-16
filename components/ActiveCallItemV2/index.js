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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _sessionStatus = require('ringcentral-integration/modules/Webphone/sessionStatus');

var _sessionStatus2 = _interopRequireDefault(_sessionStatus);

var _callLogHelpers = require('ringcentral-integration/lib/callLogHelpers');

var _webphoneHelper = require('ringcentral-integration/modules/Webphone/webphoneHelper');

var _CallAvatar = require('../CallAvatar');

var _CallAvatar2 = _interopRequireDefault(_CallAvatar);

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

var _MergeIntoConferenceIcon = require('../../assets/images/MergeIntoConferenceIcon.svg');

var _MergeIntoConferenceIcon2 = _interopRequireDefault(_MergeIntoConferenceIcon);

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
  var rejectTitle = _i18n2.default.getString('hangup', currentLocale);
  var holdTitle = _i18n2.default.getString('hold', currentLocale);
  var unholdTitle = _i18n2.default.getString('unhold', currentLocale);

  if ((0, _callLogHelpers.isInbound)(session) && session.callStatus === _sessionStatus2.default.connecting) {
    hangupFunc = webphoneReject;
    endIcon = _Voicemail2.default;
    rejectTitle = _i18n2.default.getString('toVoicemail', currentLocale);
  }

  var holdBtn = void 0;
  var mergeBtn = void 0;

  if (showHold) {
    if ((0, _webphoneHelper.isOnHold)(session)) {
      holdBtn = _react2.default.createElement(
        'span',
        { title: unholdTitle, className: _styles2.default.webphoneButton },
        _react2.default.createElement(_CircleButton2.default, {
          className: (0, _classnames3.default)(_styles2.default.holdButton, _styles2.default.active),
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
        className: (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, _styles2.default.mergeButton, true), (0, _defineProperty3.default)(_classnames, _styles2.default.disabled, disableMerge), _classnames)),
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
    )
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
  onMergeCall: _propTypes2.default.func
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
  }
};

/**
 * TODO: Gradually replace <ActiveCallItem/> with this component
 */

var ActiveCallItem = function (_Component) {
  (0, _inherits3.default)(ActiveCallItem, _Component);

  function ActiveCallItem(props) {
    (0, _classCallCheck3.default)(this, ActiveCallItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveCallItem.__proto__ || (0, _getPrototypeOf2.default)(ActiveCallItem)).call(this, props));

    _this.onSelectContact = function (value) {
      var nameMatches = _this.getContactMatches();
      var selectedMatcherIndex = nameMatches.findIndex(function (match) {
        return match.id === value.id;
      });
      if (selectedMatcherIndex < 0) {
        selectedMatcherIndex = 0;
      }
      _this._userSelection = true;
      _this.setState({
        selected: selectedMatcherIndex
      });
      var contact = nameMatches[selectedMatcherIndex];
      if (contact) {
        _this.props.getAvatarUrl(contact).then(function (avatarUrl) {
          _this.setState({ avatarUrl: avatarUrl });
        });
        if (_this.props.call.webphoneSession) {
          _this.props.updateSessionMatchedContact(_this.props.call.webphoneSession.id, contact);
        }
      }
    };

    _this.getSelectedContact = function () {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.selected;

      var contactMatches = _this.getContactMatches();
      return selected > -1 && contactMatches[selected] || contactMatches.length === 1 && contactMatches[0] || null;
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
      var _props = this.props,
          isOnConferenceCall = _props.isOnConferenceCall,
          conferenceCallParties = _props.conferenceCallParties;


      if (isOnConferenceCall) {
        this.setState({
          avatarUrl: conferenceCallParties.map(function (profile) {
            return profile.avatarUrl;
          })[0],
          extraNum: conferenceCallParties.length > 0 ? conferenceCallParties.length - 1 : 0
        });
        return;
      }

      this.onSelectContact(this.getSelectedContact());
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
      this.setContact();
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
      var _props2 = this.props,
          _props2$call = _props2.call,
          telephonyStatus = _props2$call.telephonyStatus,
          startTime = _props2$call.startTime,
          offset = _props2$call.offset,
          disableLinks = _props2.disableLinks,
          currentLocale = _props2.currentLocale,
          showCallDetail = _props2.showCallDetail;


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
      var _props3 = this.props,
          webphoneSession = _props3.call.webphoneSession,
          disableLinks = _props3.disableLinks,
          currentLocale = _props3.currentLocale,
          areaCode = _props3.areaCode,
          countryCode = _props3.countryCode,
          enableContactFallback = _props3.enableContactFallback,
          isLogging = _props3.isLogging,
          brand = _props3.brand,
          showContactDisplayPlaceholder = _props3.showContactDisplayPlaceholder,
          webphoneHangup = _props3.webphoneHangup,
          webphoneResume = _props3.webphoneResume,
          sourceIcons = _props3.sourceIcons,
          renderContactName = _props3.renderContactName,
          renderExtraButton = _props3.renderExtraButton,
          contactDisplayStyle = _props3.contactDisplayStyle,
          isOnConferenceCall = _props3.isOnConferenceCall,
          webphoneHold = _props3.webphoneHold,
          onClick = _props3.onClick,
          showMergeCall = _props3.showMergeCall,
          showHold = _props3.showHold,
          disableMerge = _props3.disableMerge,
          onMergeCall = _props3.onMergeCall,
          showCallDetail = _props3.showCallDetail;
      var _state = this.state,
          avatarUrl = _state.avatarUrl,
          extraNum = _state.extraNum;

      var phoneNumber = this.getPhoneNumber();
      var contactMatches = this.getContactMatches();
      var fallbackContactName = this.getFallbackContactName();
      var contactName = typeof renderContactName === 'function' ? renderContactName(this.props.call) : undefined;
      var extraButton = typeof renderExtraButton === 'function' ? renderExtraButton(this.props.call) : undefined;

      return _react2.default.createElement(
        'div',
        { onClick: onClick, className: (0, _classnames3.default)(_styles2.default.callItemContainer, _styles2.default.pointer) },
        _react2.default.createElement(_MediaObject2.default, {
          containerCls: _styles2.default.wrapper,
          mediaLeft: _react2.default.createElement(
            'div',
            { className: (0, _classnames3.default)(_styles2.default.callIcon, _styles2.default.avatar) },
            _react2.default.createElement(_CallAvatar2.default, {
              isOnConferenceCall: isOnConferenceCall,
              avatarUrl: avatarUrl,
              extraNum: extraNum })
          ),
          bodyCls: _styles2.default.content,
          mediaBody: _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_ContactDisplay2.default, {
              isOnConferenceCall: isOnConferenceCall,
              contactName: contactName,
              className: isOnConferenceCall ? (0, _classnames3.default)(_styles2.default.conferenceContactDisplay) : (0, _classnames3.default)(_styles2.default.contactDisplay, contactDisplayStyle),
              contactMatches: contactMatches,
              selected: this.state.selected,
              onSelectContact: this.onSelectContact,
              disabled: disableLinks,
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
              stopPropagation: true
            }),
            showCallDetail ? this.getCallInfo() : null
          ),
          mediaRight: _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(WebphoneButtons, {
              session: webphoneSession,
              webphoneReject: this.webphoneToVoicemail,
              webphoneHangup: webphoneHangup,
              webphoneResume: webphoneResume,
              webphoneHold: webphoneHold,
              currentLocale: currentLocale,
              showMergeCall: showMergeCall,
              showHold: showHold,
              disableMerge: disableMerge,
              onMergeCall: onMergeCall
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
    webphoneSession: _propTypes2.default.object
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
  renderContactName: _propTypes2.default.func,
  renderExtraButton: _propTypes2.default.func,
  contactDisplayStyle: _propTypes2.default.string,
  isOnConferenceCall: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  getAvatarUrl: _propTypes2.default.func,
  conferenceCallParties: _propTypes2.default.arrayOf(_propTypes2.default.object),
  showMergeCall: _propTypes2.default.bool,
  showHold: _propTypes2.default.bool,
  disableMerge: _propTypes2.default.bool,
  onMergeCall: _propTypes2.default.func,
  showCallDetail: _propTypes2.default.bool,
  updateSessionMatchedContact: _propTypes2.default.func
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
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  isOnConferenceCall: false,
  onClick: undefined,
  getAvatarUrl: function getAvatarUrl(i) {
    return i;
  },
  conferenceCallParties: [],
  showMergeCall: false,
  showHold: true,
  disableMerge: false,
  onMergeCall: function onMergeCall(i) {
    return i;
  },
  showCallDetail: false,
  updateSessionMatchedContact: function updateSessionMatchedContact(i) {
    return i;
  }
};
//# sourceMappingURL=index.js.map
