'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sleep = require('ringcentral-integration/lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _calleeTypes = require('ringcentral-integration/enums/calleeTypes');

var _calleeTypes2 = _interopRequireDefault(_calleeTypes);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _sessionStatus = require('ringcentral-integration/modules/Webphone/sessionStatus');

var _sessionStatus2 = _interopRequireDefault(_sessionStatus);

var _callCtrlLayouts = require('../../enums/callCtrlLayouts');

var _callCtrlLayouts2 = _interopRequireDefault(_callCtrlLayouts);

var _CallCtrlPanel = require('../../components/CallCtrlPanel');

var _CallCtrlPanel2 = _interopRequireDefault(_CallCtrlPanel);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallCtrlContainer = function (_Component) {
  (0, _inherits3.default)(CallCtrlContainer, _Component);

  function CallCtrlContainer(props) {
    (0, _classCallCheck3.default)(this, CallCtrlContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallCtrlContainer.__proto__ || (0, _getPrototypeOf2.default)(CallCtrlContainer)).call(this, props));

    var layout = props.getInitialLayout(_this.props);

    var _this$disableMergeAnd = _this.disableMergeAndAdd(_this.props, layout),
        mergeDisabled = _this$disableMergeAnd.mergeDisabled,
        addDisabled = _this$disableMergeAnd.addDisabled;

    _this.state = {
      selectedMatcherIndex: 0,
      avatarUrl: null,
      layout: layout,
      mergeDisabled: mergeDisabled,
      addDisabled: addDisabled
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
      return _this.props.onHangup(_this.props.session.id, _this.state.layout);
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
    _this.gotoParticipantsCtrl = function () {
      return _this.props.gotoParticipantsCtrl(_this.props.session.id);
    };
    return _this;
  }

  (0, _createClass3.default)(CallCtrlContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
      this._updateAvatarAndMatchIndex(this.props);
      this._updateCurrentConferenceCall(this.props);
      this._updateMergingPairToSessionId();

      if (CallCtrlContainer.isLastCallEnded(this.props)) {
        /**
         * if the last has already been terminated after rendering, need to trigger the callback at the point
         */
        this.onLastMergingCallEnded();
      }
    }
  }, {
    key: 'disableMergeAndAdd',
    value: function disableMergeAndAdd(nextProps, layout) {
      var lastCallInfo = nextProps.lastCallInfo,
          isWebRTC = nextProps.isWebRTC,
          isConferenceCallOverload = nextProps.isConferenceCallOverload,
          session = nextProps.session,
          hasConferenceCall = nextProps.hasConferenceCall;


      var isInboundCall = session.direction === _callDirections2.default.inbound;
      var isMergeAndAddDisabled = !isWebRTC || isInboundCall || !session.partyData;

      var mergeDisabled = isMergeAndAddDisabled;
      var addDisabled = isMergeAndAddDisabled;
      if (layout === _callCtrlLayouts2.default.mergeCtrl && (!lastCallInfo || lastCallInfo.status === _sessionStatus2.default.finished)) {
        mergeDisabled = true;
      }

      if (hasConferenceCall && isWebRTC && isConferenceCallOverload) {
        mergeDisabled = true;
        addDisabled = true;
      }

      return { mergeDisabled: mergeDisabled, addDisabled: addDisabled };
    }
  }, {
    key: 'onLastMergingCallEnded',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._mounted) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return (0, _sleep2.default)(2000);

              case 3:

                if (this._mounted) {
                  this.setState({
                    layout: _callCtrlLayouts2.default.normalCtrl
                  });
                }

                if (this.props.closeMergingPair) {
                  this.props.closeMergingPair();
                }

              case 5:
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
    key: 'getLayout',
    value: function getLayout(lastProps, nextProps) {
      if (nextProps.showSpinner) {
        return _callCtrlLayouts2.default.conferenceCtrl;
      }
      return this.props.getInitialLayout(nextProps);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextState) {
      this._updateMergingPairToSessionId(nextProps, nextState);

      var layout = this.state.layout;
      if (nextProps.session.id !== this.props.session.id) {
        layout = this.getLayout(this.props, nextProps);
        this.setState({
          layout: layout
        });

        if (layout === _callCtrlLayouts2.default.normalCtrl) {
          this._updateAvatarAndMatchIndex(nextProps);
        }
      } else if (layout === _callCtrlLayouts2.default.mergeCtrl && CallCtrlContainer.isLastCallEnded(this.props) === false && CallCtrlContainer.isLastCallEnded(nextProps) === true) {
        this.onLastMergingCallEnded();
      } else if (layout === _callCtrlLayouts2.default.conferenceCtrl && this.props.conferenceCallParties !== nextProps.conferenceCallParties) {
        this._updateCurrentConferenceCall(nextProps);
      }
      this._updateMergeAddButtonDisabled(nextProps, layout);
    }
  }, {
    key: '_updateMergeAddButtonDisabled',
    value: function _updateMergeAddButtonDisabled(nextProps, layout) {
      var _disableMergeAndAdd = this.disableMergeAndAdd(nextProps, layout),
          mergeDisabled = _disableMergeAndAdd.mergeDisabled,
          addDisabled = _disableMergeAndAdd.addDisabled;

      this.setState({
        mergeDisabled: mergeDisabled,
        addDisabled: addDisabled
      });
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
      if (this.state.layout === _callCtrlLayouts2.default.conferenceCtrl && props.loadConference) {
        props.loadConference(props.conferenceCallId);
      }
    }
  }, {
    key: '_updateMergingPairToSessionId',
    value: function _updateMergingPairToSessionId() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var nextState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;

      if (nextState.layout === _callCtrlLayouts2.default.mergeCtrl && nextProps.lastCallInfo) {
        nextProps.setMergeParty({ toSessionId: nextProps.session.id });
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
          phoneSourceNameRenderer: this.props.phoneSourceNameRenderer,
          recipientsContactInfoRenderer: this.props.recipientsContactInfoRenderer,
          recipientsContactPhoneRenderer: this.props.recipientsContactPhoneRenderer,
          layout: this.state.layout,
          showSpinner: this.props.showSpinner,
          direction: session.direction,
          addDisabled: this.state.addDisabled,
          mergeDisabled: this.state.mergeDisabled,
          conferenceCallEquipped: this.props.conferenceCallEquipped,
          hasConferenceCall: this.props.hasConferenceCall,
          conferenceCallParties: this.props.conferenceCallParties,
          lastCallInfo: this.props.lastCallInfo,
          getAvatarUrl: this.props.getAvatarUrl,
          gotoParticipantsCtrl: this.gotoParticipantsCtrl,
          afterHideMergeConfirm: this.props.afterHideMergeConfirm,
          afterConfirmMerge: this.props.afterConfirmMerge,
          afterOnMerge: this.props.afterOnMerge
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
  return CallCtrlContainer;
}(_react.Component);

CallCtrlContainer.propTypes = {
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
  phoneSourceNameRenderer: _propTypes2.default.func,
  recipientsContactInfoRenderer: _propTypes2.default.func,
  recipientsContactPhoneRenderer: _propTypes2.default.func,
  layout: _propTypes2.default.string,
  showSpinner: _propTypes2.default.bool,
  conferenceCallParties: _propTypes2.default.array,
  conferenceCallEquipped: _propTypes2.default.bool,
  hasConferenceCall: _propTypes2.default.bool,
  lastCallInfo: _propTypes2.default.object,
  conferenceCallId: _propTypes2.default.string,
  gotoParticipantsCtrl: _propTypes2.default.func,
  loadConference: _propTypes2.default.func,
  getInitialLayout: _propTypes2.default.func,
  closeMergingPair: _propTypes2.default.func,
  isWebRTC: _propTypes2.default.bool,
  isConferenceCallOverload: _propTypes2.default.bool,
  afterHideMergeConfirm: _propTypes2.default.func,
  afterConfirmMerge: _propTypes2.default.func,
  afterOnMerge: _propTypes2.default.func
};

CallCtrlContainer.defaultProps = {
  children: undefined,
  showBackButton: false,
  backButtonLabel: null,
  onBackButtonClick: null,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
  onAdd: undefined,
  onMerge: undefined,
  onBeforeMerge: undefined,
  showSpinner: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  conferenceCallParties: undefined,
  lastCallInfo: { calleeType: _calleeTypes2.default.unknow },
  conferenceCallId: null,
  gotoParticipantsCtrl: function gotoParticipantsCtrl(i) {
    return i;
  },
  loadConference: function loadConference(i) {
    return i;
  },
  getInitialLayout: function getInitialLayout() {
    return _callCtrlLayouts2.default.normalCtrl;
  },
  layout: _callCtrlLayouts2.default.normalCtrl,
  closeMergingPair: null,
  isWebRTC: false,
  isConferenceCallOverload: false,
  afterHideMergeConfirm: function afterHideMergeConfirm() {
    return null;
  },
  afterConfirmMerge: function afterConfirmMerge() {
    return null;
  },
  afterOnMerge: function afterOnMerge() {
    return null;
  }
};

exports.default = CallCtrlContainer;
//# sourceMappingURL=CallCtrlContainer.js.map
