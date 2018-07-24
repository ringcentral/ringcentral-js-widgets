'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CallCtrlPage = exports.mapToFunctions = exports.mapToProps = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _calleeTypes = require('ringcentral-integration/enums/calleeTypes');

var _calleeTypes2 = _interopRequireDefault(_calleeTypes);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _callingModes = require('ringcentral-integration/modules/CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _callCtrlLayouts = require('../../enums/callCtrlLayouts');

var _callCtrlLayouts2 = _interopRequireDefault(_callCtrlLayouts);

var _CallCtrlPanel = require('../../components/CallCtrlPanel');

var _CallCtrlPanel2 = _interopRequireDefault(_CallCtrlPanel);

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
    return _this;
  }

  (0, _createClass3.default)(CallCtrlPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
      this._updateAvatarAndMatchIndex(this.props);
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
          lastCallInfo: this.props.lastCallInfo
        },
        this.props.children
      );
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
  onIncomingCallCaptured: _propTypes2.default.func
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
  showSpinner: false,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  conferenceCallParties: undefined,
  lastCallInfo: { calleeType: _calleeTypes2.default.unknow },
  onIncomingCallCaptured: function onIncomingCallCaptured(i) {
    return i;
  }
};

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      webphone = _ref$phone.webphone,
      locale = _ref$phone.locale,
      contactMatcher = _ref$phone.contactMatcher,
      regionSettings = _ref$phone.regionSettings,
      brand = _ref$phone.brand,
      forwardingNumber = _ref$phone.forwardingNumber,
      contactSearch = _ref$phone.contactSearch,
      conferenceCall = _ref$phone.conferenceCall,
      callingSettings = _ref$phone.callingSettings,
      _ref$layout = _ref.layout,
      layout = _ref$layout === undefined ? _callCtrlLayouts2.default.normalCtrl : _ref$layout;

  var currentSession = webphone.activeSession || {};
  var contactMapping = contactMatcher && contactMatcher.dataMapping;
  var fromMatches = contactMapping && contactMapping[currentSession.from] || [];
  var toMatches = contactMapping && contactMapping[currentSession.to] || [];
  var nameMatches = currentSession.direction === _callDirections2.default.outbound ? toMatches : fromMatches;

  var isWebRTC = callingSettings.callingMode === _callingModes2.default.webphone;
  var mergeDisabled = !(currentSession.data && (0, _keys2.default)(currentSession.data).length) || !isWebRTC;
  var addDisabled = !isWebRTC || currentSession.direction === _callDirections2.default.inbound;

  var isOnConference = false;
  var hasConferenceCall = false;
  var isMerging = false;
  var conferenceCallParties = void 0;

  if (conferenceCall) {
    isOnConference = conferenceCall.isConferenceSession(currentSession.id);
    var conferenceData = (0, _values2.default)(conferenceCall.conferences)[0];

    isMerging = conferenceCall.isMerging && !!((0, _values2.default)(conferenceCall.mergingPair).find(function (id) {
      return id === currentSession.id;
    }) || isOnConference);

    if (conferenceData && isWebRTC) {
      var newVal = conferenceCall.isOverload(conferenceData.conference.id)
      // in case webphone.activeSession has not been updated yet
      || !(currentSession.data && (0, _keys2.default)(currentSession.data).length);
      // update
      mergeDisabled = newVal || !(currentSession.data && (0, _keys2.default)(currentSession.data).length);
      addDisabled = newVal;
    }

    hasConferenceCall = !!conferenceData;
    conferenceCallParties = conferenceCall.partyProfiles;
  }

  layout = isOnConference ? _callCtrlLayouts2.default.conferenceCtrl : layout;
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
    conferenceCallParties: conferenceCallParties
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      webphone = _ref2$phone.webphone,
      regionSettings = _ref2$phone.regionSettings,
      contactSearch = _ref2$phone.contactSearch,
      conferenceCall = _ref2$phone.conferenceCall,
      routerInteraction = _ref2$phone.routerInteraction,
      callMonitor = _ref2$phone.callMonitor,
      getAvatarUrl = _ref2.getAvatarUrl,
      onBackButtonClick = _ref2.onBackButtonClick,
      phoneTypeRenderer = _ref2.phoneTypeRenderer,
      recipientsContactInfoRenderer = _ref2.recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer = _ref2.recipientsContactPhoneRenderer;

  return {
    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber2.default)({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    },
    onHangup: function onHangup(sessionId) {
      return webphone.hangup(sessionId);
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
      var sessionData = (0, _ramda.find)(function (x) {
        return x.id === sessionId;
      }, webphone.sessions);
      if (sessionData) {
        conferenceCall.setMergeParty({ fromSessionId: sessionId });
        var outBoundOnholdCalls = callMonitor.activeOnHoldCalls.filter(function (call) {
          return call.direction === _callDirections2.default.outbound;
        });
        if (outBoundOnholdCalls.length) {
          // goto 'calls on hold' page
          routerInteraction.push('/conferenceCall/callsOnhold/' + sessionData.fromNumber + '/' + sessionData.id);
        } else {
          // goto dialer directly
          routerInteraction.push('/conferenceCall/dialer/' + sessionData.fromNumber);
        }
      }
    },
    onMerge: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(sessionId) {
        var session, isOnhold, sessionToMergeWith, webphoneSessions, conferenceData, conferenceSession;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                session = webphone._sessions.get(sessionId);
                isOnhold = session.isOnHold().local;

                conferenceCall.setMergeParty({ toSessionId: sessionId });
                sessionToMergeWith = webphone._sessions.get(conferenceCall.mergingPair.fromSessionId);
                webphoneSessions = sessionToMergeWith ? [sessionToMergeWith, session] : [session];
                _context.next = 7;
                return conferenceCall.mergeToConference(webphoneSessions);

              case 7:
                conferenceData = (0, _values2.default)(conferenceCall.conferences)[0];
                conferenceSession = webphone._sessions.get(conferenceData.sessionId);

                if (!(conferenceData && !isOnhold && conferenceSession.isOnHold().local)) {
                  _context.next = 12;
                  break;
                }

                /**
                 * because session termination operation in conferenceCall._mergeToConference,
                 * need to wait for webphone.getActiveSessionIdReducer to update
                 */
                webphone.resume(conferenceData.sessionId);
                return _context.abrupt('return');

              case 12:
                if (conferenceData) {
                  _context.next = 16;
                  break;
                }

                _context.next = 15;
                return webphone.resume(session.id);

              case 15:
                routerInteraction.push('/conferenceCall/mergeCtrl');

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onMerge(_x) {
        return _ref3.apply(this, arguments);
      }

      return onMerge;
    }(),
    onIncomingCallCaptured: function onIncomingCallCaptured() {
      routerInteraction.push('/calls/active');
    }
  };
}

var CallCtrlContainer = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(CallCtrlPage));

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
