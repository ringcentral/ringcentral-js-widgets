'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CallCtrlPage = exports.mapToFunctions = exports.mapToProps = undefined;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _ramda = require('ramda');

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _sleep = require('ringcentral-integration/lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _calleeTypes = require('ringcentral-integration/enums/calleeTypes');

var _calleeTypes2 = _interopRequireDefault(_calleeTypes);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _callingModes = require('ringcentral-integration/modules/CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

var _sessionStatus = require('ringcentral-integration/modules/Webphone/sessionStatus');

var _sessionStatus2 = _interopRequireDefault(_sessionStatus);

var _callCtrlLayouts = require('../../enums/callCtrlLayouts');

var _callCtrlLayouts2 = _interopRequireDefault(_callCtrlLayouts);

var _CallCtrlPanel = require('../../components/CallCtrlPanel');

var _CallCtrlPanel2 = _interopRequireDefault(_CallCtrlPanel);

var _phoneContext = require('../../lib/phoneContext');

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallCtrlPage = function (_Component) {
  (0, _inherits3.default)(CallCtrlPage, _Component);

  function CallCtrlPage(props) {
    (0, _classCallCheck3.default)(this, CallCtrlPage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallCtrlPage.__proto__ || (0, _getPrototypeOf2.default)(CallCtrlPage)).call(this, props));

    _this.state = {
      selectedMatcherIndex: 0,
      avatarUrl: null
    };

    _this.onLastMergingCallEnded = _this.onLastMergingCallEnded.bind(_this);

    _this.onSelectMatcherName = function (option) {
      var nameMatches = _this.props.nameMatches || [];
      var selectedMatcherIndex = nameMatches.findIndex(function (match) {
        return match.id === option.id;
      });
      if (selectedMatcherIndex < 0) {
        selectedMatcherIndex = 0;
      }
      _this.setState({
        selectedMatcherIndex: selectedMatcherIndex,
        avatarUrl: null
      });
      var contact = nameMatches[selectedMatcherIndex];
      if (contact) {
        _this.props.updateSessionMatchedContact(_this.props.session.id, contact);
        _this.props.getAvatarUrl(contact).then(function (avatarUrl) {
          _this.setState({ avatarUrl: avatarUrl });
        });
      }
    };

    _this.onMute = function () {
      return _this.props.onMute(_this.props.session.id);
    };
    _this.onUnmute = function () {
      return _this.props.onUnmute(_this.props.session.id);
    };
    _this.onHold = function () {
      return _this.props.onHold(_this.props.session.id);
    };
    _this.onUnhold = function () {
      return _this.props.onUnhold(_this.props.session.id);
    };
    _this.onRecord = function () {
      return _this.props.onRecord(_this.props.session.id);
    };
    _this.onStopRecord = function () {
      return _this.props.onStopRecord(_this.props.session.id);
    };
    _this.onHangup = function () {
      return _this.props.onHangup(_this.props.session.id);
    };
    _this.onKeyPadChange = function (value) {
      return _this.props.sendDTMF(value, _this.props.session.id);
    };
    _this.onFlip = function (value) {
      return _this.props.onFlip(value, _this.props.session.id);
    };
    _this.onTransfer = function (value) {
      return _this.props.onTransfer(value, _this.props.session.id);
    };
    _this.onPark = function () {
      return _this.props.onPark(_this.props.session.id);
    };
    _this.onAdd = function () {
      return _this.props.onAdd(_this.props.session.id);
    };
    _this.onMerge = function () {
      return _this.props.onMerge(_this.props.session.id);
    };
    _this.onBeforeMerge = function () {
      return _this.props.onBeforeMerge(_this.props.session.id);
    };
    return _this;
  }

  (0, _createClass3.default)(CallCtrlPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
      this._updateAvatarAndMatchIndex(this.props);
      this._updateCurrentConferenceCall(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.layout === _callCtrlLayouts2.default.mergeCtrl && nextProps.session.direction === _callDirections2.default.inbound) {
        nextProps.onIncomingCallCaptured();
      }
      if (this.props.session.id !== nextProps.session.id) {
        this._updateAvatarAndMatchIndex(nextProps);
      }
      if (this.props.conferenceCallId !== nextProps.conferenceCallId) {
        this._updateCurrentConferenceCall(nextProps);
      }

      if (this.props.layout === _callCtrlLayouts2.default.mergeCtrl && CallCtrlPage.isLastCallEnded(this.props) === false && CallCtrlPage.isLastCallEnded(nextProps) === true && this.mounted) {
        this.onLastMergingCallEnded();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: '_updateAvatarAndMatchIndex',
    value: function _updateAvatarAndMatchIndex(props) {
      var _this2 = this;

      var contact = props.session.contactMatch;
      var selectedMatcherIndex = 0;
      if (!contact) {
        contact = props.nameMatches && props.nameMatches[0];
      } else {
        selectedMatcherIndex = props.nameMatches.findIndex(function (match) {
          return match.id === contact.id;
        });
      }
      this.setState({
        selectedMatcherIndex: selectedMatcherIndex,
        avatarUrl: null
      });
      if (contact) {
        props.getAvatarUrl(contact).then(function (avatarUrl) {
          if (!_this2._mounted) {
            return;
          }
          _this2.setState({ avatarUrl: avatarUrl });
        });
      }
    }
  }, {
    key: '_updateCurrentConferenceCall',
    value: function _updateCurrentConferenceCall(props) {
      if (props.layout === _callCtrlLayouts2.default.conferenceCtrl && props.loadConference) {
        props.loadConference(props.conferenceCallId);
      }
    }
  }, {
    key: 'onLastMergingCallEnded',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.props.onLastMergingCallEnded && this.mounted)) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return (0, _sleep2.default)(2000);

              case 3:
                this.props.onLastMergingCallEnded();

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLastMergingCallEnded() {
        return _ref.apply(this, arguments);
      }

      return onLastMergingCallEnded;
    }()
  }, {
    key: 'render',
    value: function render() {
      var session = this.props.session;

      if (!session.id) {
        return null;
      }

      var phoneNumber = session.direction === _callDirections2.default.outbound ? session.to : session.from;

      var fallbackUserName = void 0;
      if (session.direction === _callDirections2.default.inbound && session.from === 'anonymous') {
        fallbackUserName = _i18n2.default.getString('anonymous', this.props.currentLocale);
      }
      if (!fallbackUserName) {
        fallbackUserName = _i18n2.default.getString('unknown', this.props.currentLocale);
      }

      var backButtonLabel = this.props.backButtonLabel ? this.props.backButtonLabel : _i18n2.default.getString('activeCalls', this.props.currentLocale);

      return _react2.default.createElement(
        _CallCtrlPanel2.default,
        {
          currentLocale: this.props.currentLocale,
          formatPhone: this.props.formatPhone,
          phoneNumber: phoneNumber,
          sessionId: session.id,
          callStatus: session.callStatus,
          startTime: session.startTime,
          isOnMute: session.isOnMute,
          isOnHold: session.isOnHold,
          isOnFlip: session.isOnFlip,
          isOnTransfer: session.isOnTransfer,
          recordStatus: session.recordStatus,
          showBackButton: this.props.showBackButton,
          backButtonLabel: backButtonLabel,
          onBackButtonClick: this.props.onBackButtonClick,
          onMute: this.onMute,
          onUnmute: this.onUnmute,
          onHold: this.onHold,
          onUnhold: this.onUnhold,
          onRecord: this.onRecord,
          onStopRecord: this.onStopRecord,
          onKeyPadChange: this.onKeyPadChange,
          onHangup: this.onHangup,
          onAdd: this.onAdd,
          onMerge: this.onMerge,
          onBeforeMerge: this.onBeforeMerge,
          onFlip: this.onFlip,
          onTransfer: this.onTransfer,
          onPark: this.onPark,
          nameMatches: this.props.nameMatches,
          fallBackName: fallbackUserName,
          areaCode: this.props.areaCode,
          countryCode: this.props.countryCode,
          selectedMatcherIndex: this.state.selectedMatcherIndex,
          onSelectMatcherName: this.onSelectMatcherName,
          avatarUrl: this.state.avatarUrl,
          brand: this.props.brand,
          showContactDisplayPlaceholder: this.props.showContactDisplayPlaceholder,
          flipNumbers: this.props.flipNumbers,
          sourceIcons: this.props.sourceIcons,
          searchContactList: this.props.searchContactList,
          searchContact: this.props.searchContact,
          phoneTypeRenderer: this.props.phoneTypeRenderer,
          recipientsContactInfoRenderer: this.props.recipientsContactInfoRenderer,
          recipientsContactPhoneRenderer: this.props.recipientsContactPhoneRenderer,
          layout: this.props.layout,
          showSpinner: this.props.showSpinner,
          direction: session.direction,
          addDisabled: this.props.addDisabled,
          mergeDisabled: this.props.mergeDisabled,
          conferenceCallEquipped: this.props.conferenceCallEquipped,
          hasConferenceCall: this.props.hasConferenceCall,
          conferenceCallParties: this.props.conferenceCallParties,
          lastCallInfo: this.props.lastCallInfo,
          getAvatarUrl: this.props.getAvatarUrl,
          gotoParticipantsCtrl: this.props.gotoParticipantsCtrl,
          onLastMergingCallEnded: this.props.onLastMergingCallEnded
        },
        this.props.children
      );
    }
  }], [{
    key: 'isLastCallEnded',
    value: function isLastCallEnded(_ref2) {
      var lastCallInfo = _ref2.lastCallInfo;

      return !!(lastCallInfo && lastCallInfo.status === _sessionStatus2.default.finished);
    }
  }]);
  return CallCtrlPage;
}(_react.Component);

CallCtrlPage.propTypes = {
  session: _propTypes2.default.shape({
    id: _propTypes2.default.string,
    direction: _propTypes2.default.string,
    startTime: _propTypes2.default.number,
    isOnMute: _propTypes2.default.bool,
    isOnHold: _propTypes2.default.bool,
    isOnFlip: _propTypes2.default.bool,
    isOnTransfer: _propTypes2.default.bool,
    recordStatus: _propTypes2.default.string,
    to: _propTypes2.default.string,
    from: _propTypes2.default.string,
    contactMatch: _propTypes2.default.object
  }).isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  onMute: _propTypes2.default.func.isRequired,
  onUnmute: _propTypes2.default.func.isRequired,
  onHold: _propTypes2.default.func.isRequired,
  onUnhold: _propTypes2.default.func.isRequired,
  onRecord: _propTypes2.default.func.isRequired,
  onStopRecord: _propTypes2.default.func.isRequired,
  onHangup: _propTypes2.default.func.isRequired,
  sendDTMF: _propTypes2.default.func.isRequired,
  formatPhone: _propTypes2.default.func.isRequired,
  onAdd: _propTypes2.default.func,
  onMerge: _propTypes2.default.func,
  onBeforeMerge: _propTypes2.default.func,
  onFlip: _propTypes2.default.func.isRequired,
  onPark: _propTypes2.default.func.isRequired,
  onTransfer: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node,
  nameMatches: _propTypes2.default.array.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  getAvatarUrl: _propTypes2.default.func.isRequired,
  updateSessionMatchedContact: _propTypes2.default.func.isRequired,
  showBackButton: _propTypes2.default.bool,
  backButtonLabel: _propTypes2.default.string,
  onBackButtonClick: _propTypes2.default.func,
  brand: _propTypes2.default.string.isRequired,
  showContactDisplayPlaceholder: _propTypes2.default.bool.isRequired,
  flipNumbers: _propTypes2.default.array.isRequired,
  sourceIcons: _propTypes2.default.object,
  searchContactList: _propTypes2.default.array.isRequired,
  searchContact: _propTypes2.default.func.isRequired,
  phoneTypeRenderer: _propTypes2.default.func,
  recipientsContactInfoRenderer: _propTypes2.default.func,
  recipientsContactPhoneRenderer: _propTypes2.default.func,
  layout: _propTypes2.default.string.isRequired,
  showSpinner: _propTypes2.default.bool,
  addDisabled: _propTypes2.default.bool,
  mergeDisabled: _propTypes2.default.bool,
  conferenceCallParties: _propTypes2.default.array,
  conferenceCallEquipped: _propTypes2.default.bool,
  hasConferenceCall: _propTypes2.default.bool,
  lastCallInfo: _propTypes2.default.object,
  onIncomingCallCaptured: _propTypes2.default.func,
  conferenceCallId: _propTypes2.default.string,
  gotoParticipantsCtrl: _propTypes2.default.func,
  loadConference: _propTypes2.default.func,
  onLastMergingCallEnded: _propTypes2.default.func
};

CallCtrlPage.defaultProps = {
  children: undefined,
  showBackButton: false,
  backButtonLabel: null,
  onBackButtonClick: null,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
  onAdd: undefined,
  onMerge: undefined,
  onBeforeMerge: undefined,
  showSpinner: false,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  conferenceCallParties: undefined,
  lastCallInfo: { calleeType: _calleeTypes2.default.unknow },
  onIncomingCallCaptured: function onIncomingCallCaptured(i) {
    return i;
  },
  conferenceCallId: null,
  gotoParticipantsCtrl: function gotoParticipantsCtrl(i) {
    return i;
  },
  loadConference: function loadConference(i) {
    return i;
  },
  onLastMergingCallEnded: undefined
};

function mapToProps(_, _ref3) {
  var _ref3$phone = _ref3.phone,
      webphone = _ref3$phone.webphone,
      locale = _ref3$phone.locale,
      contactMatcher = _ref3$phone.contactMatcher,
      regionSettings = _ref3$phone.regionSettings,
      brand = _ref3$phone.brand,
      forwardingNumber = _ref3$phone.forwardingNumber,
      contactSearch = _ref3$phone.contactSearch,
      conferenceCall = _ref3$phone.conferenceCall,
      callingSettings = _ref3$phone.callingSettings,
      callMonitor = _ref3$phone.callMonitor,
      _ref3$layout = _ref3.layout,
      layout = _ref3$layout === undefined ? _callCtrlLayouts2.default.normalCtrl : _ref3$layout,
      params = _ref3.params,
      children = _ref3.children;

  var sessionId = params && params.sessionId;
  var currentSession = void 0;

  if (sessionId) {
    currentSession = webphone.sessions.find(function (session) {
      return session.id === sessionId;
    }) || {};
  } else {
    currentSession = webphone.activeSession || {};
  }

  var contactMapping = contactMatcher && contactMatcher.dataMapping;
  var fromMatches = contactMapping && contactMapping[currentSession.from] || [];
  var toMatches = contactMapping && contactMapping[currentSession.to] || [];
  var nameMatches = currentSession.direction === _callDirections2.default.outbound ? toMatches : fromMatches;

  var isWebRTC = callingSettings.callingMode === _callingModes2.default.webphone;
  var isInoundCall = currentSession.direction === _callDirections2.default.inbound;
  var mergeDisabled = !isWebRTC || isInoundCall || !currentSession.partyData;
  var addDisabled = !isWebRTC || isInoundCall || !currentSession.partyData;

  var isOnConference = false;
  var hasConferenceCall = false;
  var isMerging = false;
  var conferenceCallParties = void 0;
  var conferenceCallId = null;
  var lastCallInfo = callMonitor.lastCallInfo;
  if (conferenceCall) {
    isOnConference = conferenceCall.isConferenceSession(currentSession.id);
    var conferenceData = (0, _values2.default)(conferenceCall.conferences)[0];

    isMerging = conferenceCall.isMerging && !!((0, _values2.default)(conferenceCall.mergingPair).find(function (id) {
      return id === currentSession.id;
    }) || isOnConference);

    if (conferenceData && isWebRTC) {
      conferenceCallId = conferenceData.conference.id;
      var overload = conferenceCall.isOverload(conferenceCallId);
      if (overload) {
        mergeDisabled = true;
        addDisabled = true;
      }
    }

    hasConferenceCall = !!conferenceData;
    conferenceCallParties = conferenceCall.partyProfiles;

    layout = isOnConference ? _callCtrlLayouts2.default.conferenceCtrl : layout;

    lastCallInfo = isOnConference ? null : lastCallInfo;

    var fromSessionId = conferenceCall.mergingPair.fromSessionId;

    if (!isInoundCall && fromSessionId && fromSessionId !== currentSession.id && lastCallInfo && lastCallInfo.status !== _sessionStatus2.default.finished) {
      // enter merge ctrl page.
      layout = _callCtrlLayouts2.default.mergeCtrl;

      // for mergeCtrl page, we don't show any children (container) component.
      children = null;
    }

    if (layout === _callCtrlLayouts2.default.mergeCtrl && (!lastCallInfo || lastCallInfo.status === _sessionStatus2.default.finished)) {
      mergeDisabled = true;
    }
  }

  return {
    brand: brand.fullName,
    nameMatches: nameMatches,
    currentLocale: locale.currentLocale,
    session: currentSession,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    flipNumbers: forwardingNumber.flipNumbers,
    showBackButton: true, // callMonitor.calls.length > 0,
    searchContactList: contactSearch.sortedResult,
    layout: layout,
    showSpinner: isMerging,
    addDisabled: addDisabled,
    mergeDisabled: mergeDisabled,
    conferenceCallEquipped: !!conferenceCall,
    hasConferenceCall: hasConferenceCall,
    conferenceCallParties: conferenceCallParties,
    conferenceCallId: conferenceCallId,
    lastCallInfo: lastCallInfo,
    children: children
  };
}

function mapToFunctions(_, _ref4) {
  var _ref4$phone = _ref4.phone,
      webphone = _ref4$phone.webphone,
      regionSettings = _ref4$phone.regionSettings,
      contactSearch = _ref4$phone.contactSearch,
      conferenceCall = _ref4$phone.conferenceCall,
      routerInteraction = _ref4$phone.routerInteraction,
      callMonitor = _ref4$phone.callMonitor,
      getAvatarUrl = _ref4.getAvatarUrl,
      onBackButtonClick = _ref4.onBackButtonClick,
      phoneTypeRenderer = _ref4.phoneTypeRenderer,
      recipientsContactInfoRenderer = _ref4.recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer = _ref4.recipientsContactPhoneRenderer;

  return {
    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber2.default)({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    },
    onHangup: function onHangup(sessionId) {
      if (conferenceCall) {
        // close the MergingPair if any.
        conferenceCall.closeMergingPair();
      }
      webphone.hangup(sessionId);
    },

    onMute: function onMute(sessionId) {
      return webphone.mute(sessionId);
    },
    onUnmute: function onUnmute(sessionId) {
      return webphone.unmute(sessionId);
    },
    onHold: function onHold(sessionId) {
      return webphone.hold(sessionId);
    },
    onUnhold: function onUnhold(sessionId) {
      return webphone.unhold(sessionId);
    },
    onRecord: function onRecord(sessionId) {
      return webphone.startRecord(sessionId);
    },
    onStopRecord: function onStopRecord(sessionId) {
      return webphone.stopRecord(sessionId);
    },
    sendDTMF: function sendDTMF(value, sessionId) {
      return webphone.sendDTMF(value, sessionId);
    },
    updateSessionMatchedContact: function updateSessionMatchedContact(sessionId, contact) {
      return webphone.updateSessionMatchedContact(sessionId, contact);
    },
    getAvatarUrl: getAvatarUrl,
    onBackButtonClick: onBackButtonClick,
    onFlip: function onFlip(flipNumber, sessionId) {
      return webphone.flip(flipNumber, sessionId);
    },
    onTransfer: function onTransfer(transferNumber, sessionId) {
      return webphone.transfer(transferNumber, sessionId);
    },
    onPark: function onPark(sessionId) {
      return webphone.park(sessionId);
    },
    searchContact: function searchContact(searchString) {
      return contactSearch.debouncedSearch({ searchString: searchString });
    },
    phoneTypeRenderer: phoneTypeRenderer,
    recipientsContactInfoRenderer: recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer: recipientsContactPhoneRenderer,
    onAdd: function onAdd(sessionId) {
      var session = (0, _ramda.find)(function (x) {
        return x.id === sessionId;
      }, webphone.sessions);
      if (!session || webphone.isCallRecording({ session: session })) {
        return;
      }
      if (conferenceCall) {
        conferenceCall.setMergeParty({ fromSessionId: sessionId });
      }
      var outBoundOnholdCalls = (0, _ramda.filter)(function (call) {
        return call.direction === _callDirections2.default.outbound;
      }, callMonitor.activeOnHoldCalls);
      if (outBoundOnholdCalls.length) {
        // goto 'calls on hold' page
        routerInteraction.push('/conferenceCall/callsOnhold/' + session.fromNumber + '/' + session.id);
      } else {
        // goto dialer directly
        routerInteraction.push('/conferenceCall/dialer/' + session.fromNumber);
      }
    },
    onBeforeMerge: function onBeforeMerge(sessionId) {
      var session = (0, _ramda.find)(function (x) {
        return x.id === sessionId;
      }, webphone.sessions);
      if (!session || webphone.isCallRecording({ session: session })) {
        return false;
      }
      if (conferenceCall) {
        var conferenceData = (0, _values2.default)(conferenceCall.conferences)[0];
        if (conferenceData) {
          var conferenceSession = (0, _ramda.find)(function (x) {
            return x.id === conferenceData.sessionId;
          }, webphone.sessions);
          if (conferenceSession && webphone.isCallRecording({ session: conferenceSession })) {
            return false;
          }
        }
      }
      return true;
    },
    onMerge: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(sessionId) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return conferenceCall.mergeSession({ sessionId: sessionId });

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onMerge(_x) {
        return _ref5.apply(this, arguments);
      }

      return onMerge;
    }(),
    onIncomingCallCaptured: function onIncomingCallCaptured() {
      routerInteraction.push('/calls/active');
    },
    gotoParticipantsCtrl: function gotoParticipantsCtrl() {
      routerInteraction.push('/conferenceCall/participants');
    },
    loadConference: function loadConference(confId) {
      if (conferenceCall) {
        conferenceCall.loadConference(confId);
      }
    }
  };
}

var CallCtrlContainer = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(CallCtrlPage));

CallCtrlContainer.propTypes = {
  getAvatarUrl: _propTypes2.default.func,
  onBackButtonClick: _propTypes2.default.func.isRequired,
  onAdd: _propTypes2.default.func.isRequired,
  backButtonLabel: _propTypes2.default.string,
  children: _propTypes2.default.node,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object
};

CallCtrlContainer.defaultProps = {
  getAvatarUrl: function getAvatarUrl() {
    return null;
  },
  showContactDisplayPlaceholder: false,
  children: undefined,
  sourceIcons: undefined
};

exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
exports.CallCtrlPage = CallCtrlPage;
exports.default = CallCtrlContainer;
//# sourceMappingURL=index.js.map
