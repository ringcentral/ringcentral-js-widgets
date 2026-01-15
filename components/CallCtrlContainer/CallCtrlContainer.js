"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallCtrlContainer = void 0;
require("regenerator-runtime/runtime");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _calleeTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/calleeTypes"));
var _sessionStatus = require("@ringcentral-integration/commons/modules/Webphone/sessionStatus");
var _utils = require("@ringcentral-integration/commons/utils");
var _react = _interopRequireWildcard(require("react"));
var _callCtrlLayouts = require("../../enums/callCtrlLayouts");
var _CallCtrlPanel = _interopRequireDefault(require("../CallCtrlPanel"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var CallCtrlContainer = /*#__PURE__*/function (_Component) {
  _inherits(CallCtrlContainer, _Component);
  var _super = _createSuper(CallCtrlContainer);
  function CallCtrlContainer(props) {
    var _this;
    _classCallCheck(this, CallCtrlContainer);
    _this = _super.call(this, props);
    _this._mounted = void 0;
    _this.gotoParticipantsCtrl = void 0;
    _this.onAdd = void 0;
    _this.onBeforeMerge = void 0;
    _this.onCompleteTransfer = void 0;
    _this.onHangup = void 0;
    _this.onHold = void 0;
    _this.onKeyPadChange = void 0;
    _this.onMerge = void 0;
    _this.onMute = void 0;
    _this.onPark = void 0;
    _this.onRecord = void 0;
    _this.onSelectMatcherName = void 0;
    _this.onStopRecord = void 0;
    _this.onUnhold = void 0;
    _this.onUnmute = void 0;
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
    _this.onLastMergingCallEnded = _this.onLastMergingCallEnded.bind(_assertThisInitialized(_this));
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
          _this.setState({
            avatarUrl: avatarUrl
          });
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
    _this.onPark = function () {
      return _this.props.onPark(_this.props.session.id);
    };
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    _this.onAdd = function () {
      return _this.props.onAdd(_this.props.session.id);
    };
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    _this.onMerge = function () {
      return _this.props.onMerge(_this.props.session.id);
    };
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    _this.onBeforeMerge = function () {
      return _this.props.onBeforeMerge(_this.props.session.id);
    };
    _this.gotoParticipantsCtrl = function () {
      return (
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        _this.props.gotoParticipantsCtrl(_this.props.session.id)
      );
    };
    _this.onCompleteTransfer = function () {
      return (
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        _this.props.onCompleteTransfer(_this.props.session.id)
      );
    };
    return _this;
  }
  _createClass(CallCtrlContainer, [{
    key: "componentDidMount",
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
    key: "disableMergeAndAdd",
    value: function disableMergeAndAdd(nextProps, layout) {
      var lastCallInfo = nextProps.lastCallInfo,
        isWebRTC = nextProps.isWebRTC,
        disableLinks = nextProps.disableLinks,
        isConferenceCallOverload = nextProps.isConferenceCallOverload,
        session = nextProps.session,
        hasConferenceCall = nextProps.hasConferenceCall; // const isInboundCall = session.direction === callDirections.inbound;
      // const isMergeAndAddDisabled = !isWebRTC || isInboundCall || !session.partyData;
      var isMergeAndAddDisabled = !isWebRTC || !session.partyData || disableLinks;
      var mergeDisabled = isMergeAndAddDisabled;
      var addDisabled = isMergeAndAddDisabled;
      if (layout === _callCtrlLayouts.callCtrlLayouts.mergeCtrl && (!lastCallInfo || lastCallInfo.status === _sessionStatus.sessionStatus.finished)) {
        mergeDisabled = true;
      }
      if (hasConferenceCall && isWebRTC && isConferenceCallOverload) {
        mergeDisabled = true;
        addDisabled = true;
      }
      return {
        mergeDisabled: mergeDisabled,
        addDisabled: addDisabled
      };
    }
  }, {
    key: "onLastMergingCallEnded",
    value: function () {
      var _onLastMergingCallEnded = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._mounted) {
                  _context.next = 5;
                  break;
                }
                _context.next = 3;
                return (0, _utils.sleep)(2000);
              case 3:
                if (this._mounted) {
                  this.setState({
                    layout: _callCtrlLayouts.callCtrlLayouts.normalCtrl
                  });
                }
                if (this.props.closeMergingPair) {
                  this.props.closeMergingPair();
                }
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function onLastMergingCallEnded() {
        return _onLastMergingCallEnded.apply(this, arguments);
      }
      return onLastMergingCallEnded;
    }()
  }, {
    key: "getLayout",
    value: function getLayout(lastProps, nextProps) {
      if (nextProps.showSpinner) {
        return _callCtrlLayouts.callCtrlLayouts.conferenceCtrl;
      }
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      return this.props.getInitialLayout(nextProps);
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps, nextState) {
      this._updateMergingPairToSessionId(nextProps, nextState);
      var layout = this.state.layout;
      var sessionIdChanged = nextProps.session.id !== this.props.session.id;
      if (sessionIdChanged ||
      // FIX: RCINT-38564, when previous call end, layout should be updated
      layout === _callCtrlLayouts.callCtrlLayouts.completeTransferCtrl && !nextProps.session.warmTransferSessionId) {
        layout = this.getLayout(this.props, nextProps);
        this.setState({
          layout: layout
        });
      }
      var beNormalCtrl = layout === _callCtrlLayouts.callCtrlLayouts.normalCtrl;
      var nameMatchesChanged = nextProps.nameMatches !== this.props.nameMatches;
      if (beNormalCtrl && (nameMatchesChanged || sessionIdChanged)) {
        this._updateAvatarAndMatchIndex(nextProps);
      } else if (layout === _callCtrlLayouts.callCtrlLayouts.mergeCtrl && CallCtrlContainer.isLastCallEnded(this.props) === false && CallCtrlContainer.isLastCallEnded(nextProps) === true) {
        this.onLastMergingCallEnded();
      } else if (layout === _callCtrlLayouts.callCtrlLayouts.conferenceCtrl && this.props.conferenceCallParties !== nextProps.conferenceCallParties) {
        this._updateCurrentConferenceCall(nextProps);
      }
      this._updateMergeAddButtonDisabled(nextProps, layout);
    }
  }, {
    key: "_updateMergeAddButtonDisabled",
    value: function _updateMergeAddButtonDisabled(nextProps, layout) {
      var _this$disableMergeAnd2 = this.disableMergeAndAdd(nextProps, layout),
        mergeDisabled = _this$disableMergeAnd2.mergeDisabled,
        addDisabled = _this$disableMergeAnd2.addDisabled;
      this.setState({
        mergeDisabled: mergeDisabled,
        addDisabled: addDisabled
      });
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "_updateAvatarAndMatchIndex",
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
          _this2.setState({
            avatarUrl: avatarUrl
          });
        });
      }
    }
  }, {
    key: "_updateCurrentConferenceCall",
    value: function _updateCurrentConferenceCall(props) {
      if (this.state.layout === _callCtrlLayouts.callCtrlLayouts.conferenceCtrl && props.loadConference) {
        props.loadConference(props.conferenceCallId);
      }
    }
  }, {
    key: "_updateMergingPairToSessionId",
    value: function _updateMergingPairToSessionId() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var nextState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;
      if (nextState.layout === _callCtrlLayouts.callCtrlLayouts.mergeCtrl && nextProps.lastCallInfo) {
        // @ts-expect-error TS(2339): Property 'setMergeParty' does not exist on type 'R... Remove this comment to see the full error message
        nextProps.setMergeParty({
          toSessionId: nextProps.session.id
        });
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        session = _this$props.session,
        showCallQueueName = _this$props.showCallQueueName;
      if (!session.id) {
        return null;
      }
      var fallbackUserName;
      if (session.direction === _callDirections["default"].inbound && session.from === 'anonymous') {
        fallbackUserName = _i18n["default"].getString('anonymous', this.props.currentLocale);
      }
      if (!fallbackUserName) {
        fallbackUserName = _i18n["default"].getString('unknown', this.props.currentLocale);
      }
      var backButtonLabel = this.props.backButtonLabel ? this.props.backButtonLabel : _i18n["default"].getString('activeCalls', this.props.currentLocale);
      return /*#__PURE__*/_react["default"].createElement(_CallCtrlPanel["default"], {
        currentLocale: this.props.currentLocale,
        formatPhone: this.props.formatPhone,
        phoneNumber: this.props.phoneNumber,
        sessionId: session.id,
        callStatus: session.callStatus,
        startTime: session.startTime,
        isOnMute: session.isOnMute,
        isOnHold: session.isOnHold,
        isOnTransfer: session.isOnTransfer,
        isOnWaitingTransfer: !!session.warmTransferSessionId,
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
        onFlip: this.props.onFlip,
        onTransfer: this.props.onTransfer,
        onCompleteTransfer: this.onCompleteTransfer,
        onPark: this.onPark,
        disableFlip: this.props.disableFlip,
        showPark: this.props.showPark,
        nameMatches: this.props.nameMatches,
        fallBackName: fallbackUserName,
        showCallQueueName: showCallQueueName,
        callQueueName: showCallQueueName ? session.callQueueName : null,
        areaCode: this.props.areaCode,
        countryCode: this.props.countryCode,
        selectedMatcherIndex: this.state.selectedMatcherIndex,
        onSelectMatcherName: this.onSelectMatcherName,
        avatarUrl: this.state.avatarUrl,
        brand: this.props.brand,
        showContactDisplayPlaceholder: this.props.showContactDisplayPlaceholder,
        sourceIcons: this.props.sourceIcons,
        phoneTypeRenderer: this.props.phoneTypeRenderer,
        phoneSourceNameRenderer: this.props.phoneSourceNameRenderer,
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
        afterOnMerge: this.props.afterOnMerge,
        controlBusy: this.props.controlBusy,
        callerIdName: this.props.callerIdName,
        showCallerIdName: this.props.showCallerIdName
      }, this.props.children);
    }
  }], [{
    key: "isLastCallEnded",
    value: function isLastCallEnded(_ref) {
      var lastCallInfo = _ref.lastCallInfo;
      return !!(lastCallInfo && lastCallInfo.status === _sessionStatus.sessionStatus.finished);
    }
  }]);
  return CallCtrlContainer;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
exports.CallCtrlContainer = CallCtrlContainer;
CallCtrlContainer.defaultProps = {
  children: undefined,
  showBackButton: false,
  backButtonLabel: null,
  onBackButtonClick: null,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  onAdd: undefined,
  onMerge: undefined,
  onBeforeMerge: undefined,
  showSpinner: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  conferenceCallParties: undefined,
  lastCallInfo: {
    calleeType: _calleeTypes["default"].unknown
  },
  gotoParticipantsCtrl: function gotoParticipantsCtrl(i) {
    return i;
  },
  getInitialLayout: function getInitialLayout() {
    return _callCtrlLayouts.callCtrlLayouts.normalCtrl;
  },
  closeMergingPair: null,
  afterHideMergeConfirm: function afterHideMergeConfirm() {
    return null;
  },
  afterConfirmMerge: function afterConfirmMerge() {
    return null;
  },
  afterOnMerge: function afterOnMerge() {
    return null;
  },
  disableFlip: false,
  showCallQueueName: false,
  onCompleteTransfer: function onCompleteTransfer() {
    return null;
  },
  phoneNumber: null,
  showPark: false,
  controlBusy: false,
  callerIdName: undefined,
  showCallerIdName: false
};
//# sourceMappingURL=CallCtrlContainer.js.map
