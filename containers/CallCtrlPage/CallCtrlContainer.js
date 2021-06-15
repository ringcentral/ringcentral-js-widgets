"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _sleep = _interopRequireDefault(require("ringcentral-integration/lib/sleep"));

var _calleeTypes = _interopRequireDefault(require("ringcentral-integration/enums/calleeTypes"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _sessionStatus = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/sessionStatus"));

var _callCtrlLayouts = _interopRequireDefault(require("../../enums/callCtrlLayouts"));

var _CallCtrlPanel = _interopRequireDefault(require("../../components/CallCtrlPanel"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CallCtrlContainer = /*#__PURE__*/function (_Component) {
  _inherits(CallCtrlContainer, _Component);

  var _super = _createSuper(CallCtrlContainer);

  function CallCtrlContainer(props) {
    var _this;

    _classCallCheck(this, CallCtrlContainer);

    _this = _super.call(this, props);
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

    _this.onCompleteTransfer = function () {
      return _this.props.onCompleteTransfer(_this.props.session.id);
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

      if (layout === _callCtrlLayouts["default"].mergeCtrl && (!lastCallInfo || lastCallInfo.status === _sessionStatus["default"].finished)) {
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
                return (0, _sleep["default"])(2000);

              case 3:
                if (this._mounted) {
                  this.setState({
                    layout: _callCtrlLayouts["default"].normalCtrl
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
        return _callCtrlLayouts["default"].conferenceCtrl;
      }

      return this.props.getInitialLayout(nextProps);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps, nextState) {
      this._updateMergingPairToSessionId(nextProps, nextState);

      var layout = this.state.layout;

      if (nextProps.session.id !== this.props.session.id) {
        layout = this.getLayout(this.props, nextProps);
        this.setState({
          layout: layout
        });

        if (layout === _callCtrlLayouts["default"].normalCtrl) {
          this._updateAvatarAndMatchIndex(nextProps);
        }
      } else if (layout === _callCtrlLayouts["default"].mergeCtrl && CallCtrlContainer.isLastCallEnded(this.props) === false && CallCtrlContainer.isLastCallEnded(nextProps) === true) {
        this.onLastMergingCallEnded();
      } else if (layout === _callCtrlLayouts["default"].conferenceCtrl && this.props.conferenceCallParties !== nextProps.conferenceCallParties) {
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
    }
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
      if (this.state.layout === _callCtrlLayouts["default"].conferenceCtrl && props.loadConference) {
        props.loadConference(props.conferenceCallId);
      }
    }
  }, {
    key: "_updateMergingPairToSessionId",
    value: function _updateMergingPairToSessionId() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var nextState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;

      if (nextState.layout === _callCtrlLayouts["default"].mergeCtrl && nextProps.lastCallInfo) {
        nextProps.setMergeParty({
          toSessionId: nextProps.session.id
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          session = _this$props.session,
          showCallQueueName = _this$props.showCallQueueName;

      if (!session.id) {
        return null;
      }

      var phoneNumber = session.direction === _callDirections["default"].outbound ? session.to : session.from;
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
        phoneNumber: phoneNumber,
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
        afterOnMerge: this.props.afterOnMerge
      }, this.props.children);
    }
  }], [{
    key: "isLastCallEnded",
    value: function isLastCallEnded(_ref) {
      var lastCallInfo = _ref.lastCallInfo;
      return !!(lastCallInfo && lastCallInfo.status === _sessionStatus["default"].finished);
    }
  }]);

  return CallCtrlContainer;
}(_react.Component);

CallCtrlContainer.propTypes = {
  session: _propTypes["default"].shape({
    id: _propTypes["default"].string,
    direction: _propTypes["default"].string,
    startTime: _propTypes["default"].number,
    isOnMute: _propTypes["default"].bool,
    isOnHold: _propTypes["default"].bool,
    isOnFlip: _propTypes["default"].bool,
    recordStatus: _propTypes["default"].string,
    to: _propTypes["default"].string,
    from: _propTypes["default"].string,
    contactMatch: _propTypes["default"].object,
    warmTransferSessionId: _propTypes["default"].string
  }).isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  onMute: _propTypes["default"].func.isRequired,
  onUnmute: _propTypes["default"].func.isRequired,
  onHold: _propTypes["default"].func.isRequired,
  onUnhold: _propTypes["default"].func.isRequired,
  onRecord: _propTypes["default"].func.isRequired,
  onStopRecord: _propTypes["default"].func.isRequired,
  onHangup: _propTypes["default"].func.isRequired,
  sendDTMF: _propTypes["default"].func.isRequired,
  formatPhone: _propTypes["default"].func.isRequired,
  onAdd: _propTypes["default"].func,
  onMerge: _propTypes["default"].func,
  onBeforeMerge: _propTypes["default"].func,
  onFlip: _propTypes["default"].func.isRequired,
  onPark: _propTypes["default"].func.isRequired,
  onTransfer: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].node,
  nameMatches: _propTypes["default"].array.isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  getAvatarUrl: _propTypes["default"].func.isRequired,
  updateSessionMatchedContact: _propTypes["default"].func.isRequired,
  showBackButton: _propTypes["default"].bool,
  backButtonLabel: _propTypes["default"].string,
  onBackButtonClick: _propTypes["default"].func,
  brand: _propTypes["default"].string.isRequired,
  showContactDisplayPlaceholder: _propTypes["default"].bool.isRequired,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  layout: _propTypes["default"].string,
  showSpinner: _propTypes["default"].bool,
  conferenceCallParties: _propTypes["default"].array,
  conferenceCallEquipped: _propTypes["default"].bool,
  hasConferenceCall: _propTypes["default"].bool,
  lastCallInfo: _propTypes["default"].object,
  conferenceCallId: _propTypes["default"].string,
  gotoParticipantsCtrl: _propTypes["default"].func,
  loadConference: _propTypes["default"].func,
  getInitialLayout: _propTypes["default"].func,
  closeMergingPair: _propTypes["default"].func,
  isWebRTC: _propTypes["default"].bool,
  disableLinks: _propTypes["default"].bool,
  isConferenceCallOverload: _propTypes["default"].bool,
  afterHideMergeConfirm: _propTypes["default"].func,
  afterConfirmMerge: _propTypes["default"].func,
  afterOnMerge: _propTypes["default"].func,
  disableFlip: _propTypes["default"].bool,
  showCallQueueName: _propTypes["default"].bool,
  onCompleteTransfer: _propTypes["default"].func
};
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
  conferenceCallId: null,
  gotoParticipantsCtrl: function gotoParticipantsCtrl(i) {
    return i;
  },
  loadConference: function loadConference(i) {
    return i;
  },
  getInitialLayout: function getInitialLayout() {
    return _callCtrlLayouts["default"].normalCtrl;
  },
  layout: _callCtrlLayouts["default"].normalCtrl,
  closeMergingPair: null,
  isWebRTC: false,
  disableLinks: false,
  isConferenceCallOverload: false,
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
  }
};
var _default = CallCtrlContainer;
exports["default"] = _default;
//# sourceMappingURL=CallCtrlContainer.js.map
